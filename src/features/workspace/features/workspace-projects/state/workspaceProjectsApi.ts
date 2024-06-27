import { api } from "../../../../../state/api.ts";
import GetProjectsResponse from "../type/Project.response.ts";
import { DeleteProjectRequest, GetProjectsQueryParameters, UpdateProjectRequest } from "../type/Project.request.ts";
import createQueryParams from "../../../../../utils/createQueryParams.ts";
import Urls from "../../../../../utils/enums/Urls.ts";
import TagTypes from "../../../../../utils/enums/TagTypes.ts";
import HttpMessageResponse from "../../../../../types/HttpMessage.response.ts";

export const workspaceProjectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<GetProjectsResponse, GetProjectsQueryParameters>({
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
    deleteProject: builder.mutation<HttpMessageResponse, DeleteProjectRequest>({
      query: arg => ({
        url: `${Urls.Projects}/${arg.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.Projects]
    }),
  })
})

export const {
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = workspaceProjectsApiSlice