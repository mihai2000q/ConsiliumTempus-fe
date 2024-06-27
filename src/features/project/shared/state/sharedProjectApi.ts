import { api } from "../../../../state/api.ts";
import Urls from "../../../../utils/enums/Urls.ts";
import TagTypes from "../../../../utils/enums/TagTypes.ts";
import HttpMessageResponse from "../../../../types/responses/HttpMessage.response.ts";
import { AddProjectSprintRequest } from "../types/ProjectSprint.request.ts";
import { AddStatusToProjectRequest } from "../types/ProjectStatus.request.ts";

export const sharedProjectApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    addProjectSprint: builder.mutation<HttpMessageResponse, AddProjectSprintRequest>({
      query: body => ({
        url: `${Urls.ProjectSprints}`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.ProjectSprints, TagTypes.Projects, TagTypes.ProjectStatuses] // TODO: Invalidate projects only if the status changed
    }),

    addStatusToProject: builder.mutation<HttpMessageResponse, AddStatusToProjectRequest>({
      query: body => ({
        url: `${Urls.Projects}/add-status`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [TagTypes.Projects, TagTypes.ProjectStatuses]
    }),
  })
})

export const {
  useAddProjectSprintMutation,
  useAddStatusToProjectMutation
} = sharedProjectApiSlice