import { api } from '../../../state/api.ts'
import TagTypes from '../../../utils/enums/TagTypes.ts'
import Urls from '../../../utils/enums/Urls.ts'
import createQueryParams from '../../../utils/createQueryParams.ts'
import GetWorkspacesResponse from '../types/Workspace.response.ts'
import { GetWorkspacesQueryParameters } from '../types/Workspace.request.ts'

export const projectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaces: builder.query<GetWorkspacesResponse, GetWorkspacesQueryParameters>({
      query: arg => Urls.Workspaces + createQueryParams(arg),
      providesTags: [TagTypes.Workspaces]
    })
  })
})

export const {
  useGetWorkspacesQuery
} = projectsApiSlice
