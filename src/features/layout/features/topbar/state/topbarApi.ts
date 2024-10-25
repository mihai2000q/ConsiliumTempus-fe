import { api } from "../../../../../state/api.ts";
import User from "../types/User.model.ts";
import Urls from "../../../../../utils/enums/Urls.ts";

export const topbarApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => `${Urls.Users}/current`
    })
  })
})

export const { useGetCurrentUserQuery } = topbarApiSlice