import { api } from "../../../state/api.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import Urls from "../../../utils/Urls.ts";
import {
  AddStatusToProjectRequest, DeleteProjectRequest,
  GetProjectRequest, GetStatusesFromProjectRequest,
  RemoveStatusFromProjectRequest,
  UpdateProjectRequest,
  UpdateStatusFromProjectRequest
} from "../types/Project.request.ts";
import HttpMessageResponse from "../../../types/HttpMessage.response.ts";
import { GetProjectSprintsRequest } from "../types/ProjectSprint.request.ts";
import { ProjectSprintResponse } from "../types/ProjectSprint.response.ts";
import { GetProjectStatusesResponse } from "../types/ProjectStatus.response.ts";
import ProjectResponse from "../types/Project.response.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProject: builder.query<ProjectResponse, GetProjectRequest>({
      query: arg => `${Urls.Projects}/${arg.id}`,
      providesTags: [TagTypes.Projects]
    }),
    getProjectSprints: builder.query<ProjectSprintResponse, GetProjectSprintsRequest>({
      query: arg => ({
        url: Urls.ProjectSprints,
        params: arg
      }),
      providesTags: [TagTypes.ProjectSprints]
    }),
    getStatusesFromProject: builder.query<GetProjectStatusesResponse, GetStatusesFromProjectRequest>({
      query: arg => `${Urls.Projects}/${arg.id}/statuses`,
      providesTags: [TagTypes.ProjectStatuses]
    }),
    addStatusToProject: builder.mutation<HttpMessageResponse, AddStatusToProjectRequest>({
      query: body => ({
        url: `${Urls.Projects}/add-status`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects, TagTypes.ProjectStatuses]
    }),
    updateProject: builder.mutation<HttpMessageResponse, UpdateProjectRequest>({
      query: body => ({
        url: Urls.Projects,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects]
    }),
    updateStatusFromProject: builder.mutation<HttpMessageResponse, UpdateStatusFromProjectRequest>({
      query: body => ({
        url: `${Urls.Projects}/update-status`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects, TagTypes.ProjectStatuses]
    }),
    deleteProject: builder.mutation<HttpMessageResponse, DeleteProjectRequest>({
      query: arg => ({
        url: `${Urls.Projects}/${arg.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.Projects]
    }),
    removeStatusFromProject: builder.mutation<HttpMessageResponse, RemoveStatusFromProjectRequest>({
      query: arg => ({
        url: `${Urls.Projects}/${arg.id}/remove-status/${arg.statusId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.Projects, TagTypes.ProjectStatuses]
    })
  })
})

export const {
  useGetProjectQuery,
  useGetProjectSprintsQuery,
  useGetStatusesFromProjectQuery,
  useAddStatusToProjectMutation,
  useUpdateStatusFromProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useRemoveStatusFromProjectMutation
} = projectApiSlice