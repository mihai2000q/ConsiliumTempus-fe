import { api } from '../../../../../state/api.ts'
import Urls from '../../../../../utils/enums/Urls.ts'
import TagTypes from '../../../../../utils/enums/TagTypes.ts'
import HttpMessageResponse from '../../../../../types/responses/HttpMessage.response.ts'
import WorkspaceOverview from '../types/WorkspaceOverview.model.ts'
import { GetWorkspaceOverviewRequest, UpdateWorkspaceOverviewRequest } from '../types/WorkspaceOverview.request.ts'

export const projectOverviewApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaceOverview: builder.query<WorkspaceOverview, GetWorkspaceOverviewRequest>({
      query: arg => `${Urls.Workspaces}/overview/${arg.id}`,
      providesTags: [TagTypes.WorkspaceOverview]
    }),
    updateWorkspaceOverview: builder.mutation<HttpMessageResponse, UpdateWorkspaceOverviewRequest>({
      query: body => ({
        url: `${Urls.Workspaces}/overview`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.WorkspaceOverview, TagTypes.Workspaces]
    })
  })
})

export const {
  useGetWorkspaceOverviewQuery,
  useUpdateWorkspaceOverviewMutation
} = projectOverviewApiSlice
