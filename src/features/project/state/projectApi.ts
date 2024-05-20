import { api } from "../../../state/api.ts";
import TagTypes from "../../../utils/TagTypes.ts";
import Project from "../types/Project.model.ts";
import Urls from "../../../utils/Urls.ts";
import { GetProjectQueryParameters, UpdateProjectRequest } from "../types/Project.request.ts";
import HttpMessageResponse from "../../../types/HttpMessage.response.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProject: builder.query<Project, GetProjectQueryParameters>({
      query: (arg) => ({
        url: `${Urls.Projects}/${arg.id}`
      })
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
  useUpdateProjectMutation,
} = projectApiSlice