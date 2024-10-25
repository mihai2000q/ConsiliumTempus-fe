import ProjectStatusType from '../utils/project/ProjectStatusType.ts'
import { Dayjs } from 'dayjs'

type SearchQueryParamValue = ProjectStatusType | Dayjs | string | boolean | number | null

export default SearchQueryParamValue
