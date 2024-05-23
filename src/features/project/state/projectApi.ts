import { api } from "../../../state/api.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import Project from "../types/Project.model.ts";
import Urls from "../../../utils/Urls.ts";
import { GetProjectRequest, UpdateProjectRequest } from "../types/Project.request.ts";
import HttpMessageResponse from "../../../types/HttpMessage.response.ts";
import { GetProjectSprintsRequest } from "../types/ProjectSprint.request.ts";
import { ProjectSprintResponse } from "../types/ProjectSprint.response.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProject: builder.query<Project, GetProjectRequest>({
      query: arg => `${Urls.Projects}/${arg.id}`
    }),
    getProjectSprints: builder.query<ProjectSprintResponse, GetProjectSprintsRequest>({
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
      invalidatesTags: [TagTypes.Projects, TagTypes.SidebarProjects]
    })
  })
})

export const {
  useGetProjectQuery,
  useGetProjectSprintsQuery,
  useUpdateProjectMutation,
} = projectApiSlice