import { api } from "../../../../../state/api.ts";

export const sidebarApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaces: builder.query({
      query: () => ('workspaces')
    }),
    getProjects: builder.query({
      query: (arg) => ({
        url: 'projects',
        params: arg
      })
    }),
    addProject: builder.mutation({
      query: body => ({
        url: 'projects',
        method: 'POST',
        body: body
      }),
    })
  })
})

export const {
  useGetWorkspacesQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
} = sidebarApiSlice