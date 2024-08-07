import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "./auth/authSlice.ts";
import RefreshResponse from "../types/responses/Refresh.response.ts";
import { RootState } from "./store.ts";
import TagTypes from "../utils/enums/TagTypes.ts";
import Urls from "../utils/enums/Urls.ts";
import { Mutex } from 'async-mutex'
import Paths from "../utils/enums/Paths.ts";
import { setErrorPath } from "./global/globalSlice.ts";

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401 && !isAuthRequest(args)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const authState = (api.getState() as RootState).auth
        const refreshResult = await baseQuery(
          {
            url: `${Urls.Auth}/refresh`,
            method: 'PUT',
            body: {
              token: authState.token,
              refreshToken: authState.refreshToken,
            },
          },
          api,
          extraOptions
        )
        const data = refreshResult?.data as RefreshResponse | undefined
        if (data) {
          api.dispatch(setToken(data.token))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

const errorCodeToPathname = new Map<number | string, string>([
  [403, Paths.Unauthorized],
  [404, Paths.NotFound]
])

const queryWithRedirection: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithRefreshToken(args, api, extraOptions)
  const errorStatus = result?.error?.status ?? 0
  if (errorCodeToPathname.has(errorStatus)) {
    api.dispatch(setErrorPath(errorCodeToPathname.get(errorStatus)))
  }
  return result
}

function isAuthRequest(args: string | FetchArgs) {
  return typeof args === "string" && args.includes(Urls.Auth) ||
    typeof args === 'object' && args.url.includes(Urls.Auth)
}

export const api = createApi({
  baseQuery: queryWithRedirection,
  reducerPath: 'api',
  tagTypes: [...Object.values(TagTypes)],
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => `${Urls.Users}/current`
    }),
  })
})

export const {
  useGetCurrentUserQuery
} = api