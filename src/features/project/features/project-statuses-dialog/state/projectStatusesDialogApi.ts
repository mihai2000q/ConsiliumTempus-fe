import { api } from "../../../../../state/api.ts";
import Urls from "../../../../../utils/Urls.ts";
import TagTypes from "../../../../../utils/TagTypes.ts";
import HttpMessageResponse from "../../../../../types/HttpMessage.response.ts";
import { GetProjectStatusesResponse } from "../types/ProjectStatus.response.ts";
import {
  GetStatusesFromProjectRequest,
  RemoveStatusFromProjectRequest,
  UpdateStatusFromProjectRequest
} from "../types/ProjectStatus.request.ts";

export const projectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getStatusesFromProject: builder.query<GetProjectStatusesResponse, GetStatusesFromProjectRequest>({
      query: arg => `${Urls.Projects}/${arg.id}/statuses`,
      providesTags: [TagTypes.ProjectStatuses]
    }),
    updateStatusFromProject: builder.mutation<HttpMessageResponse, UpdateStatusFromProjectRequest>({
      query: body => ({
        url: `${Urls.Projects}/update-status`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects, TagTypes.ProjectStatuses]
    }),
    removeStatusFromProject: builder.mutation<HttpMessageResponse, RemoveStatusFromProjectRequest>({
      query: arg => ({
        url: `${Urls.Projects}/${arg.id}/remove-status/${arg.statusId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.Projects, TagTypes.ProjectStatuses]
    }),
  })
})

export const {
  useGetStatusesFromProjectQuery,
  useUpdateStatusFromProjectMutation,
  useRemoveStatusFromProjectMutation
} = projectApiSlice