import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "./auth/authSlice.ts";
import { Refresh } from "../types/Refresh.ts";
import { RootState } from "./store.ts";

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
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401 && !isAuthRequest(args)) {
    const authState = (api.getState() as RootState).auth
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'PUT',
        body: {
          token: authState.token,
          refreshToken: authState.refreshToken,
        },
      },
      api,
      extraOptions
    )
    const data = refreshResult?.data as Refresh | undefined
    if (data) {
      api.dispatch(setToken(data.token))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

function isAuthRequest(args: string | FetchArgs) {
  return typeof args === "string" && args.includes('auth') ||
    typeof args === 'object' && args.url.includes('auth')
}

export const api = createApi({
  baseQuery: baseQueryWithRefreshToken,
  reducerPath: 'api',
  tagTypes: [
    'User'
  ],
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => `users/current`,
      providesTags: ['User']
    }),
  })
})

export const {
  useGetCurrentUserQuery
} = api