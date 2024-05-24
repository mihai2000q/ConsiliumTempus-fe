import { api } from "../../../../../state/api.ts";
import TagTypes from "../../../../../utils/TagTypes.ts";
import WorkspaceResponse from "../types/Workspace.response.ts";
import ProjectResponse from "../types/Project.response.ts";
import Urls from "../../../../../utils/Urls.ts";
import { CreateWorkspaceRequest, GetWorkspacesRequest } from "../types/Workspace.request.ts";
import { CreateProjectRequest, GetProjectsRequest } from "../types/Project.request.ts";
import HttpMessageResponse from "../../../../../types/HttpMessage.response.ts";

export const sidebarApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaces: builder.query<WorkspaceResponse, GetWorkspacesRequest>({
      query: arg => ({
        url: Urls.Workspaces,
        params: arg
      }),
      providesTags: [TagTypes.SidebarWorkspaces]
    }),
    getProjects: builder.query<ProjectResponse, GetProjectsRequest>({
      query: arg => ({
        url: Urls.Projects,
        params: arg
      }),
      providesTags: [TagTypes.SidebarProjects]
    }),
    addProject: builder.mutation<HttpMessageResponse, CreateProjectRequest>({
      query: body => ({
        url: Urls.Projects,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects, TagTypes.SidebarProjects]
    }),
    addWorkspace: builder.mutation<HttpMessageResponse, CreateWorkspaceRequest>({
      query: body => ({
        url: Urls.Workspaces,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.Workspaces, TagTypes.SidebarWorkspaces]
    })
  })
})

export const {
  useGetWorkspacesQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
  useAddWorkspaceMutation,
} = sidebarApiSlice