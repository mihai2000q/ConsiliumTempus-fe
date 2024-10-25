import ProjectStatusType from '../../../utils/project/ProjectStatusType.ts'
import ProjectLifecycle from '../../../utils/project/ProjectLifecycle.ts'
import { Dayjs } from 'dayjs'

export default interface Project {
  name: string,
  isFavorite: boolean,
  lifecycle: ProjectLifecycle,
  owner: User,
  isPrivate: boolean,
  latestStatus: ProjectStatus | null,
  workspace: Workspace
}

export interface ProjectStatus {
  id: string,
  title: string,
  status: ProjectStatusType,
  createdDateTime: Dayjs,
  updatedDateTime: Dayjs,
  createdBy: User,
  updatedBy: User
}

interface User {
  id: string,
  name: string,
  email: string,
}

interface Workspace {
  id: string,
  name: string
}
