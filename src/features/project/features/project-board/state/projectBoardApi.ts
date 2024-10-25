import { api } from '../../../../../state/api.ts'
import Urls from '../../../../../utils/enums/Urls.ts'
import TagTypes from '../../../../../utils/enums/TagTypes.ts'
import {
  AddStageToProjectSprintRequest,
  GetStagesFromProjectSprintRequest,
  MoveStageFromProjectSprintRequest,
  RemoveStageFromProjectSprintRequest,
  UpdateStageFromProjectSprintRequest
} from '../types/ProjectStage.request.ts'
import { ProjectTaskResponse } from '../types/ProjectTask.response.ts'
import {
  AddProjectTaskRequest,
  DeleteProjectTaskRequest,
  GetProjectTasksQueryParameters,
  MoveProjectTaskRequest,
  UpdateIsCompletedProjectTaskRequest,
  UpdateProjectTaskRequest
} from '../types/ProjectTask.request.ts'
import HttpMessageResponse from '../../../../../types/responses/HttpMessage.response.ts'
import createQueryParams from '../../../../../utils/createQueryParams.ts'
import { GetProjectStagesResponse } from '../types/ProjectStage.response.ts'

export const projectBoardApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getStagesFromProjectSprint: builder.query<GetProjectStagesResponse, GetStagesFromProjectSprintRequest>({
      query: arg => `${Urls.ProjectSprints}/${arg.id}/stages`,
      providesTags: [TagTypes.ProjectStages]
    }),
    addStageToProjectSprint: builder.mutation<HttpMessageResponse, AddStageToProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}/add-stage`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectStages]
    }),
    updateStageFromProjectSprint: builder.mutation<HttpMessageResponse, UpdateStageFromProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}/update-stage`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectStages]
    }),
    moveStageFromProjectSprint: builder.mutation<HttpMessageResponse, MoveStageFromProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}/move-stage`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectStages]
    }),
    removeStageFromProjectSprint: builder.mutation<HttpMessageResponse, RemoveStageFromProjectSprintRequest>({
      query: arg => ({
        url: `${Urls.ProjectSprints}/${arg.id}/remove-stage/${arg.stageId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.ProjectStages]
    }),

    getProjectTasks: builder.query<ProjectTaskResponse, GetProjectTasksQueryParameters>({
      query: arg => Urls.ProjectTasks + createQueryParams(arg),
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
    updateIsCompletedProjectTask: builder.mutation<HttpMessageResponse, UpdateIsCompletedProjectTaskRequest>({
      query: body => ({
        url: `${Urls.ProjectTasks}/is-completed`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectTasks]
    }),
    moveProjectTask: builder.mutation<HttpMessageResponse, MoveProjectTaskRequest>({
      query: body => ({
        url: `${Urls.ProjectTasks}/move`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectTasks]
    }),
    deleteProjectTask: builder.mutation<HttpMessageResponse, DeleteProjectTaskRequest>({
      query: arg => ({
        url: `${Urls.ProjectTasks}/${arg.id}/from/${arg.stageId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.ProjectTasks]
    })
  })
})

export const {
  useGetStagesFromProjectSprintQuery,
  useAddStageToProjectSprintMutation,
  useUpdateStageFromProjectSprintMutation,
  useMoveStageFromProjectSprintMutation,
  useRemoveStageFromProjectSprintMutation,
  useGetProjectTasksQuery,
  useLazyGetProjectTasksQuery,
  useAddProjectTaskMutation,
  useUpdateProjectTaskMutation,
  useUpdateIsCompletedProjectTaskMutation,
  useMoveProjectTaskMutation,
  useDeleteProjectTaskMutation
} = projectBoardApiSlice
