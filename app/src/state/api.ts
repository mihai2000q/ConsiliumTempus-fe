import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const baseQueryWithRefreshToken = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: NonNullable<unknown>
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    console.log('sending the refresh token...')
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
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

export const api = createApi({
  baseQuery: baseQuery,
  reducerPath: 'api',
  endpoints: () => ({})
})