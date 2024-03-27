import { api } from "../../../state/api.ts";

export const loginApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.query({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body: body
      })
    })
  })
})

export const {
  useLazyLoginQuery
} = loginApiSlice