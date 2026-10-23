import { api } from '../../../state/api.ts'
import TagTypes from '../../../utils/enums/TagTypes.ts'
import Urls from '../../../utils/enums/Urls.ts'
import { GetProjectsQueryParameters } from '../types/Project.request.ts'
import createQueryParams from '../../../utils/createQueryParams.ts'
import Project from '../types/Project.model.ts'
import CollectionResponse from '../../../types/responses/Collection.response.ts'

export const projectsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getProjects: builder.query<CollectionResponse<'projects', Project>, GetProjectsQueryParameters>({
      query: arg => Urls.Projects + createQueryParams(arg),
      providesTags: [TagTypes.Projects]
    })
  })
})

export const {
  useGetProjectsQuery
} = projectsApiSlice
