import { api } from "../../../state/api.ts";
import ProjectResponse, { GetProjectsQueryParameters } from "../types/Project.response.ts";
import TagTypes from "../../../utils/TagTypes.ts";

export const projectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<ProjectResponse, GetProjectsQueryParameters>({
      query: (arg) => ({
        url: 'projects',
        arg: arg,
      }),
      providesTags: [TagTypes.Project]
    })
  })
})

export const {
  useGetProjectsQuery,
} = projectsApiSlice