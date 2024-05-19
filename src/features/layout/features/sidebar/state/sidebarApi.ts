import { api } from "../../../../../state/api.ts";
import TagTypes from "../../../../../utils/TagTypes.ts";
import WorkspaceResponse from "../types/Workspace.response.ts";
import ProjectResponse from "../types/Project.response.ts";
import Urls from "../../../../../utils/Urls.ts";
import { GetWorkspacesQueryParameters } from "../types/Workspace.request.ts";
import { AddProjectRequest, GetProjectsQueryParameters } from "../types/Project.request.ts";
import HttpMessageResponse from "../../../../../types/HttpMessage.response.ts";
import HttpErrorResponse from "../../../../../types/HttpError.response.ts";

export const sidebarApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaces: builder.query<WorkspaceResponse, GetWorkspacesQueryParameters>({
      query: (arg) => ({
        url: Urls.workspaces,
        params: arg
      }),
      providesTags: [TagTypes.Workspaces]
    }),
    getProjects: builder.query<ProjectResponse, GetProjectsQueryParameters>({
      query: (arg) => ({
        url: Urls.projects,
        params: arg
      }),
      providesTags: [TagTypes.Projects]
    }),
    addProject: builder.mutation<HttpMessageResponse | HttpErrorResponse, AddProjectRequest>({
      query: body => ({
        url: Urls.projects,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects]
    })
  })
})

export const {
  useGetWorkspacesQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
} = sidebarApiSlice