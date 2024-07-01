import { api } from "../../../state/api.ts";
import ProjectTask from "../types/ProjectTask.model.ts";
import { GetProjectTaskRequest, UpdateProjectTaskRequest } from "../types/ProjectTask.request.ts";
import Urls from "../../../utils/enums/Urls.ts";
import TagTypes from "../../../utils/enums/TagTypes.ts";
import HttpMessageResponse from "../../../types/responses/HttpMessage.response.ts";

export const projectTaskApi = api.injectEndpoints({
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
    })
  })
})

export const {
  useGetProjectTaskQuery,
  useUpdateProjectTaskMutation
} = projectTaskApi