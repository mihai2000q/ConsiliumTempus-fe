import { api } from "../../../../../state/api.ts";
import Urls from "../../../../../utils/enums/Urls.ts";
import TagTypes from "../../../../../utils/enums/TagTypes.ts";
import ProjectOverview from "../types/ProjectOverview.model.ts";
import { GetProjectOverviewRequest, UpdateProjectOverviewRequest } from "../types/ProjectOverview.request.ts";
import HttpMessageResponse from "../../../../../types/responses/HttpMessage.response.ts";

export const projectOverviewApiSlice = api.injectEndpoints({
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
} = projectOverviewApiSlice