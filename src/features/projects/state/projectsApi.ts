import { api } from "../../../state/api.ts";
import ProjectResponse from "../types/Project.response.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import Urls from "../../../utils/Urls.ts";
import { GetProjectsQueryParameters } from "../types/Project.request.ts";

export const projectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<ProjectResponse, GetProjectsQueryParameters>({
      query: arg => ({
        url: Urls.projects,
        arg: arg,
      }),
      providesTags: [TagTypes.Projects]
    })
  })
})

export const {
  useGetProjectsQuery,
} = projectsApiSlice