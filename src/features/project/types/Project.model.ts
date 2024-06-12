import ProjectStatusType from "./ProjectStatusType.ts";

export default interface Project {
  name: string,
  isFavorite: boolean,
  lifecycle: ProjectLifecycle,
  owner: Owner,
  isPrivate: boolean,
  latestStatus: ProjectStatus | null
}

export type ProjectLifecycle = 'archived' | 'active' | 'upcoming'

interface Owner {
  id: string,
  name: string,
  email: string
}

export interface ProjectStatus {
  id: string,
  title: string,
  status: ProjectStatusType,
  createdDateTime: string,
  updatedDateTime: string,
  createdBy: User,
  updatedBy: User
}

interface User {
  id: string,
  name: string,
  email: string,
}
