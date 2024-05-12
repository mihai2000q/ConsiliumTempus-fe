import { api } from "../../../state/api.ts";
import Urls from "../../../utils/Urls.ts";

export const loginApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: `${Urls.auth}/login`,
        method: 'POST',
        body: body
      })
    })
  })
})

export const {
  useLoginMutation
} = loginApiSlice