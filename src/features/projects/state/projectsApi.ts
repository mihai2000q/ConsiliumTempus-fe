import { api } from "../../../state/api.ts";

export const projectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query({
      query: () => ('projects')
    })
  })
})

export const {
  useGetProjectsQuery,
} = projectsApiSlice