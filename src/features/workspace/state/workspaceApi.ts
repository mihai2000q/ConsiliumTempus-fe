import { api } from "../../../state/api.ts";
import TagTypes from "../../../utils/enums/TagTypes.ts";
import Urls from "../../../utils/enums/Urls.ts";
import {
  DeleteWorkspaceRequest,
  GetWorkspaceRequest,
  UpdateFavoritesWorkspaceRequest,
  UpdateWorkspaceRequest,
} from "../types/Workspace.request.ts";
import HttpMessageResponse from "../../../types/responses/HttpMessage.response.ts";
import Workspace from "../types/Workspace.model.ts";

export const workspaceApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspace: builder.query<Workspace, GetWorkspaceRequest>({
      query: arg => `${Urls.Workspaces}/${arg.id}`,
      providesTags: [TagTypes.Workspaces]
    }),
    updateWorkspace: builder.mutation<HttpMessageResponse, UpdateWorkspaceRequest>({
      query: body => ({
        url: Urls.Workspaces,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Workspaces]
    }),
    updateFavoritesWorkspace: builder.mutation<HttpMessageResponse, UpdateFavoritesWorkspaceRequest>({
      query: body => ({
        url: `${Urls.Workspaces}/favorites`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: [TagTypes.Workspaces]
    }),
    deleteWorkspace: builder.mutation<HttpMessageResponse, DeleteWorkspaceRequest>({
      query: arg => ({
        url: `${Urls.Workspaces}/${arg.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [TagTypes.Workspaces]
    }),
  })
})

export const {
  useGetWorkspaceQuery,
  useUpdateWorkspaceMutation,
  useUpdateFavoritesWorkspaceMutation,
  useDeleteWorkspaceMutation,
} = workspaceApiSlice