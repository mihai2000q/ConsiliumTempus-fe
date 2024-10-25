import { api } from '../../../state/api.ts'
import TagTypes from '../../../utils/enums/TagTypes.ts'
import Urls from '../../../utils/enums/Urls.ts'
import { GetProjectsQueryParameters } from '../types/Project.request.ts'
import createQueryParams from '../../../utils/createQueryParams.ts'
import GetProjectsResponse from '../types/Project.response.ts'

export const projectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<GetProjectsResponse, GetProjectsQueryParameters>({
      query: arg => Urls.Projects + createQueryParams(arg),
      providesTags: [TagTypes.Projects]
    })
  })
})

export const {
  useGetProjectsQuery
} = projectsApiSlice
