import { api } from '../../../state/api.ts'
import Urls from '../../../utils/enums/Urls.ts'
import AuthResponse from '../../../types/responses/Auth.response.ts'
import LoginRequest from '../types/Login.request.ts'

export const loginApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: body => ({
        url: `${Urls.Auth}/login`,
        method: 'POST',
        body: body
      })
    })
  })
})

export const {
  useLoginMutation
} = loginApiSlice
