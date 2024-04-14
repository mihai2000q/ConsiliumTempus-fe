import { api } from "../../../../state/api.ts";

export const sidebarSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaces: builder.query({
      query: () => ('workspaces')
    }),
    getProjects: builder.query({
      query: () => ('projects/user')
    })
  })
})

export const {
  useGetWorkspacesQuery,
  useGetProjectsQuery,
} = sidebarSlice