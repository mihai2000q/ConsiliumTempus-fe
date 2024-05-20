import { api } from "../../../../../state/api.ts";
import Urls from "../../../../../utils/Urls.ts";
import TagTypes from "../../../../../utils/TagTypes.ts";
import { ProjectSprintResponse } from "../types/ProjectSprint.response.ts";
import { GetProjectSprintQueryParameters, GetProjectSprintsQueryParameters } from "../types/ProjectSprint.request.ts";
import ProjectSprint from "../types/ProjectSprint.model.ts";
import { ProjectTaskResponse } from "../types/ProjectTask.response.ts";
import { GetProjectTasksQueryParameters } from "../types/ProjectTask.request.ts";

export const projectSprintApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjectSprints: builder.query<ProjectSprintResponse, GetProjectSprintsQueryParameters>({
      query: arg => ({
        url: Urls.ProjectSprints,
        params: arg
      }),
      providesTags: [TagTypes.ProjectSprints]
    }),
    getProjectSprint: builder.query<ProjectSprint, GetProjectSprintQueryParameters>({
      query: arg => ({
        url: `${Urls.ProjectSprints}/${arg.id}`
      }),
      providesTags: [TagTypes.ProjectSprints]
    }),
    getProjectTasks: builder.query<ProjectTaskResponse, GetProjectTasksQueryParameters>({
      query: arg => ({
        url: Urls.ProjectTasks,
        params: arg
      }),
      providesTags: [TagTypes.ProjectTasks]
    })
  })
})

export const {
  useGetProjectSprintsQuery,
  useGetProjectSprintQuery,
  useGetProjectTasksQuery,
} = projectSprintApiSlice