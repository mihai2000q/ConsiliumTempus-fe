import { api } from "../../../state/api.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import Project from "../types/Project.model.ts";
import Urls from "../../../utils/Urls.ts";
import { GetProjectQueryParameters, UpdateProjectRequest } from "../types/Project.request.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProject: builder.query<Project, GetProjectQueryParameters>({
      query: (arg) => ({
        url: `${Urls.projects}/${arg.id}`
      }),
      providesTags: [TagTypes.Projects]
    }),
    updateProject: builder.mutation({
      query: (body: UpdateProjectRequest) => ({
        url: Urls.projects,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects]
    })
  })
})

export const {
  useGetProjectQuery,
  useUpdateProjectMutation,
} = projectApiSlice