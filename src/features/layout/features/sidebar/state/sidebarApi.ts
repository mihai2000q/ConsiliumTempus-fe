import { api } from "../../../../../state/api.ts";
import WorkspaceResponse, { GetWorkspacesQueryParameters } from "../types/Workspace.response.ts";
import ProjectResponse, { GetProjectsQueryParameters } from "../types/Project.response.ts";

export const sidebarApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaces: builder.query<WorkspaceResponse, GetWorkspacesQueryParameters>({
      query: () => ('workspaces')
    }),
    getProjects: builder.query<ProjectResponse, GetProjectsQueryParameters>({
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