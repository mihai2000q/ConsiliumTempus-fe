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
import {
  AddProjectSprintRequest, DeleteProjectSprintRequest,
  GetProjectSprintsRequest,
  UpdateProjectSprintRequest
} from "../types/ProjectSprint.request.ts";
import { GetProjectStatusesResponse } from "../types/ProjectStatus.response.ts";
import ProjectResponse from "../types/Project.response.ts";
import { GetProjectSprintsResponse } from "../types/ProjectSprint.response.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProject: builder.query<ProjectResponse, GetProjectRequest>({
      query: arg => `${Urls.Projects}/${arg.id}`,
      providesTags: [TagTypes.Projects]
    }),
    getProjectSprints: builder.query<GetProjectSprintsResponse, GetProjectSprintsRequest>({
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
    addProjectSprint: builder.mutation<HttpMessageResponse, AddProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectSprints, TagTypes.Projects, TagTypes.ProjectStatuses] // TODO: Invalidate projects only if the status changed
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
    updateProjectSprint: builder.mutation<HttpMessageResponse, UpdateProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectSprints]
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
  useGetProjectQuery,
  useGetProjectSprintsQuery,
  useGetStatusesFromProjectQuery,
  useAddStatusToProjectMutation,
  useAddProjectSprintMutation,
  useUpdateStatusFromProjectMutation,
  useUpdateProjectMutation,
  useUpdateProjectSprintMutation,
  useDeleteProjectMutation,
  useRemoveStatusFromProjectMutation,
  useDeleteProjectSprintMutation
} = projectApiSlice