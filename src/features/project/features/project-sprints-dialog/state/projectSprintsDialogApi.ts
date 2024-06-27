import { api } from "../../../../../state/api.ts";
import Urls from "../../../../../utils/enums/Urls.ts";
import TagTypes from "../../../../../utils/enums/TagTypes.ts";
import HttpMessageResponse from "../../../../../types/responses/HttpMessage.response.ts";
import {
  DeleteProjectSprintRequest,
  GetProjectSprintRequest,
  GetProjectSprintsRequest,
  UpdateProjectSprintRequest
} from "../types/ProjectSprint.request.ts";
import { GetProjectSprintsResponse } from "../types/ProjectSprints.response.ts";
import ProjectSprintResponse from "../types/ProjectSprint.response.ts";

export const projectSprintsDialogApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjectSprint: builder.query<ProjectSprintResponse, GetProjectSprintRequest>({
      query: arg => `${Urls.ProjectSprints}/${arg.id}`,
      providesTags: [TagTypes.ProjectSprints]
    }),
    getProjectSprints: builder.query<GetProjectSprintsResponse, GetProjectSprintsRequest>({
      query: arg => ({
        url: Urls.ProjectSprints,
        params: arg
      }),
      providesTags: [TagTypes.ProjectSprints]
    }),
    updateProjectSprint: builder.mutation<HttpMessageResponse, UpdateProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectSprints]
    }),
    deleteProjectSprint: builder.mutation<HttpMessageResponse, DeleteProjectSprintRequest>({
      query: arg => ({
        url: `${Urls.ProjectSprints}/${arg.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.ProjectSprints]
    }),
  })
})

export const {
  useGetProjectSprintQuery,
  useGetProjectSprintsQuery,
  useUpdateProjectSprintMutation,
  useDeleteProjectSprintMutation
} = projectSprintsDialogApiSlice