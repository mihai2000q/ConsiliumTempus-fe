import { api } from "../../../state/api.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import Project from "../types/Project.model.ts";
import Urls from "../../../utils/Urls.ts";
import { GetProjectQueryParameters, UpdateProjectRequest } from "../types/Project.request.ts";
import HttpMessageResponse from "../../../types/HttpMessage.response.ts";
import { ProjectSprintResponse } from "../features/project-board/types/ProjectSprint.response.ts";
import { GetProjectSprintsQueryParameters } from "../features/project-board/types/ProjectSprint.request.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProject: builder.query<Project, GetProjectQueryParameters>({
      query: (arg) => ({
        url: `${Urls.Projects}/${arg.id}`
      })
    }),
    getProjectSprints: builder.query<ProjectSprintResponse, GetProjectSprintsQueryParameters>({
      query: arg => ({
        url: Urls.ProjectSprints,
        params: arg
      }),
      providesTags: [TagTypes.ProjectSprints]
    }),
    updateProject: builder.mutation<HttpMessageResponse, UpdateProjectRequest>({
      query: body => ({
        url: Urls.Projects,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects]
    })
  })
})

export const {
  useGetProjectQuery,
  useGetProjectSprintsQuery,
  useUpdateProjectMutation,
} = projectApiSlice