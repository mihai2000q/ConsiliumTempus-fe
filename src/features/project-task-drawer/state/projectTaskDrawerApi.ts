import { api } from "../../../state/api.ts";
import ProjectTask from "../types/ProjectTask.model.ts";
import {
  DeleteProjectTaskRequest,
  GetProjectTaskRequest,
  UpdateProjectTaskRequest
} from "../types/ProjectTask.request.ts";
import Urls from "../../../utils/enums/Urls.ts";
import TagTypes from "../../../utils/enums/TagTypes.ts";
import HttpMessageResponse from "../../../types/HttpMessage.response.ts";
import { GetCollaboratorsResponse } from "../types/Collaborator.response.ts";
import { GetCollaboratorsRequest } from "../types/Collaborator.request.ts";

export const projectTaskDrawerApi = api.injectEndpoints({
  endpoints: builder => ({
    getCollaborators: builder.query<GetCollaboratorsResponse, GetCollaboratorsRequest>({
      query: arg => ({
        url: `${Urls.Workspaces}/${arg.workspaceId}/collaborators`,
        method: 'GET',
        params: arg
      }),
      providesTags: [TagTypes.Collaborators]
    }),

    getProjectTask: builder.query<ProjectTask, GetProjectTaskRequest>({
      query: arg => `${Urls.ProjectTasks}/${arg.id}`,
      providesTags: [TagTypes.ProjectTasks]
    }),
    updateProjectTask: builder.mutation<HttpMessageResponse, UpdateProjectTaskRequest>({
      query: body => ({
        url: `${Urls.ProjectTasks}/overview`,
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
  useGetCollaboratorsQuery,
  useGetProjectTaskQuery,
  useUpdateProjectTaskMutation,
  useDeleteProjectTaskMutation
} = projectTaskDrawerApi