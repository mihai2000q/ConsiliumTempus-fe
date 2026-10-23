import { api } from '../../../../../state/api.ts'
import Project from '../type/Project.model.ts'
import CollectionResponse from '../../../../../types/responses/Collection.response.ts'
import {
  DeleteProjectRequest,
  GetProjectsQueryParameters,
  UpdateFavoritesProjectRequest,
  UpdateProjectRequest
} from '../type/Project.request.ts'
import createQueryParams from '../../../../../utils/createQueryParams.ts'
import Urls from '../../../../../utils/enums/Urls.ts'
import TagTypes from '../../../../../utils/enums/TagTypes.ts'
import HttpMessageResponse from '../../../../../types/responses/HttpMessage.response.ts'

export const workspaceProjectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<CollectionResponse<'projects', Project>, GetProjectsQueryParameters>({
      query: arg => Urls.Projects + createQueryParams(arg),
      providesTags: [TagTypes.Projects]
    }),
    updateProject: builder.mutation<HttpMessageResponse, UpdateProjectRequest>({
      query: body => ({
        url: Urls.Projects,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects]
    }),
    updateFavoritesProject: builder.mutation<HttpMessageResponse, UpdateFavoritesProjectRequest>({
      query: body => ({
        url: `${Urls.Projects}/favorites`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects]
    }),
    deleteProject: builder.mutation<HttpMessageResponse, DeleteProjectRequest>({
      query: arg => ({
        url: `${Urls.Projects}/${arg.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.Projects]
    })
  })
})

export const {
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useUpdateProjectMutation,
  useUpdateFavoritesProjectMutation,
  useDeleteProjectMutation
} = workspaceProjectsApiSlice
