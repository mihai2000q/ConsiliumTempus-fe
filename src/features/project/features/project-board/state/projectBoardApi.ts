import { api } from "../../../../../state/api.ts";
import Urls from "../../../../../utils/Urls.ts";
import TagTypes from "../../../../../utils/TagTypes.ts";
import {
  AddStageToProjectSprintRequest,
  GetProjectSprintRequest,
  RemoveStageFromProjectSprintRequest,
  UpdateStageFromProjectSprintRequest
} from "../types/ProjectSprint.request.ts";
import ProjectSprint from "../types/ProjectSprint.model.ts";
import { ProjectTaskResponse } from "../types/ProjectTask.response.ts";
import {
  AddProjectTaskRequest,
  DeleteProjectTaskRequest,
  GetProjectTasksQueryParameters,
  UpdateProjectTaskRequest
} from "../types/ProjectTask.request.ts";
import HttpMessageResponse from "../../../../../types/HttpMessage.response.ts";

export const projectBoardApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjectSprint: builder.query<ProjectSprint, GetProjectSprintRequest>({
      query: arg => `${Urls.ProjectSprints}/${arg.id}`,
      providesTags: [TagTypes.ProjectSprint]
    }),

    addStageToProjectSprint: builder.mutation<HttpMessageResponse, AddStageToProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}/add-stage`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectSprint]
    }),
    updateStageFromProjectSprint: builder.mutation<HttpMessageResponse, UpdateStageFromProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}/update-stage`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectSprint]
    }),
    removeStageFromProjectSprint: builder.mutation<HttpMessageResponse, RemoveStageFromProjectSprintRequest>({
      query: arg => ({
        url: `${Urls.ProjectSprints}/${arg.id}/remove-stage/${arg.stageId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.ProjectSprint]
    }),

    getProjectTasks: builder.query<ProjectTaskResponse, GetProjectTasksQueryParameters>({
      query: arg => ({
        url: Urls.ProjectTasks,
        params: arg
      }),
      providesTags: [TagTypes.ProjectTasks]
    }),
    addProjectTask: builder.mutation<HttpMessageResponse, AddProjectTaskRequest>({
      query: body => ({
        url: Urls.ProjectTasks,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectTasks]
    }),
    updateProjectTask: builder.mutation<HttpMessageResponse, UpdateProjectTaskRequest>({
      query: body => ({
        url: Urls.ProjectTasks,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectTasks]
    }),
    deleteProjectTask: builder.mutation<HttpMessageResponse, DeleteProjectTaskRequest>({
      query: arg => ({
        url: `${Urls.ProjectTasks}/${arg.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.ProjectTasks]
    })
  })
})

export const {
  useGetProjectSprintQuery,
  useAddStageToProjectSprintMutation,
  useUpdateStageFromProjectSprintMutation,
  useRemoveStageFromProjectSprintMutation,
  useGetProjectTasksQuery,
  useAddProjectTaskMutation,
  useUpdateProjectTaskMutation,
  useDeleteProjectTaskMutation,
} = projectBoardApiSlice