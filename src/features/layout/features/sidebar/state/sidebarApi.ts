import { api } from '../../../../../state/api.ts'
import TagTypes from '../../../../../utils/enums/TagTypes.ts'
import Workspace from '../types/Workspace.model.ts'
import CollectionResponse from '../../../../../types/responses/Collection.response.ts'
import Project from '../types/Project.model.ts'
import Urls from '../../../../../utils/enums/Urls.ts'
import { CreateWorkspaceRequest, GetWorkspacesRequest } from '../types/Workspace.request.ts'
import { CreateProjectRequest, GetProjectsRequest } from '../types/Project.request.ts'
import HttpMessageResponse from '../../../../../types/responses/HttpMessage.response.ts'
import createQueryParams from '../../../../../utils/createQueryParams.ts'

export const sidebarApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<CollectionResponse<'projects', Project>, GetProjectsRequest>({
      query: arg => Urls.Projects + createQueryParams(arg),
      providesTags: [TagTypes.Projects]
    }),
    addProject: builder.mutation<HttpMessageResponse, CreateProjectRequest>({
      query: body => ({
        url: Urls.Projects,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects]
    }),

    getWorkspaces: builder.query<CollectionResponse<'workspaces', Workspace>, GetWorkspacesRequest>({
      query: arg => Urls.Workspaces + createQueryParams(arg),
      providesTags: [TagTypes.Workspaces]
    }),
    addWorkspace: builder.mutation<HttpMessageResponse, CreateWorkspaceRequest>({
      query: body => ({
        url: Urls.Workspaces,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.Workspaces]
    })
  })
})

export const {
  useGetWorkspacesQuery,
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useAddProjectMutation,
  useAddWorkspaceMutation
} = sidebarApiSlice
