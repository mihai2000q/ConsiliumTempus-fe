import { api } from "../../../../state/api.ts";
import Urls from "../../../../utils/Urls.ts";
import TagTypes from "../../../../utils/TagTypes.ts";
import HttpMessageResponse from "../../../../types/HttpMessage.response.ts";
import { AddProjectSprintRequest } from "../types/ProjectSprint.request.ts";

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
  })
})

export const {
  useAddProjectSprintMutation
} = sharedProjectApiSlice