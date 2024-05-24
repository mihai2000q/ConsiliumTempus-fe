import { api } from "../../../../../state/api.ts";
import Urls from "../../../../../utils/Urls.ts";
import TagTypes from "../../../../../utils/TagTypes.ts";
import ProjectOverview from "../types/ProjectOverview.model.ts";
import { GetProjectOverviewRequest, UpdateProjectOverviewRequest } from "../types/ProjectOverview.request.ts";
import HttpMessageResponse from "../../../../../types/HttpMessage.response.ts";

export const projectSprintApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjectOverview: builder.query<ProjectOverview, GetProjectOverviewRequest>({
      query: arg => `${Urls.Projects}/overview/${arg.id}`,
      providesTags: [TagTypes.ProjectOverview]
    }),
    updateProjectOverview: builder.mutation<HttpMessageResponse, UpdateProjectOverviewRequest>({
      query: body => ({
        url: `${Urls.Projects}/overview`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectOverview, TagTypes.Projects]
    }),
  })
})

export const {
  useGetProjectOverviewQuery,
  useUpdateProjectOverviewMutation
} = projectSprintApiSlice