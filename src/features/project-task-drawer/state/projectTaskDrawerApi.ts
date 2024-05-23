import { api } from "../../../state/api.ts";
import ProjectTask from "../types/ProjectTask.model.ts";
import {
  DeleteProjectTaskRequest,
  GetProjectTaskRequest,
  UpdateProjectTaskRequest
} from "../types/ProjectTask.request.ts";
import Urls from "../../../utils/Urls.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import HttpMessageResponse from "../../../types/HttpMessage.response.ts";

export const projectTaskDrawerApi = api.injectEndpoints({
  endpoints: builder => ({
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
  useLazyGetProjectTaskQuery,
  useUpdateProjectTaskMutation,
  useDeleteProjectTaskMutation
} = projectTaskDrawerApi