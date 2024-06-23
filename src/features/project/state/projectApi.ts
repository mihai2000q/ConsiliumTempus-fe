import { api } from "../../../state/api.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import Urls from "../../../utils/Urls.ts";
import { DeleteProjectRequest, GetProjectRequest, UpdateProjectRequest, } from "../types/Project.request.ts";
import HttpMessageResponse from "../../../types/HttpMessage.response.ts";
import { GetProjectSprintsRequest } from "../types/ProjectSprint.request.ts";
import ProjectResponse from "../types/Project.response.ts";
import { GetProjectSprintsResponse } from "../types/ProjectSprint.response.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProject: builder.query<ProjectResponse, GetProjectRequest>({
      query: arg => `${Urls.Projects}/${arg.id}`,
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

    getProjectSprints: builder.query<GetProjectSprintsResponse, GetProjectSprintsRequest>({
      query: arg => ({
        url: Urls.ProjectSprints,
        params: arg
      }),
      providesTags: [TagTypes.ProjectSprints]
    }),
  })
})

export const {
  useGetProjectQuery,
  useGetProjectSprintsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice