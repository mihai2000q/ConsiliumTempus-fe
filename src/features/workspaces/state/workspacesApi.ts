import { api } from '../../../state/api.ts'
import TagTypes from '../../../utils/enums/TagTypes.ts'
import Urls from '../../../utils/enums/Urls.ts'
import createQueryParams from '../../../utils/createQueryParams.ts'
import Workspace from '../types/Workspace.model.ts'
import CollectionResponse from '../../../types/responses/Collection.response.ts'
import { GetWorkspacesQueryParameters } from '../types/Workspace.request.ts'

export const projectsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaces: builder.query<
      CollectionResponse<'workspaces', Workspace>,
      GetWorkspacesQueryParameters
    >({
      query: (arg) => Urls.Workspaces + createQueryParams(arg),
      providesTags: [TagTypes.Workspaces]
    })
  })
})

export const { useGetWorkspacesQuery } = projectsApiSlice
