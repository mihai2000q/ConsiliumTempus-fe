import ProjectStatusType from "../../project/types/ProjectStatusType.ts";

export default interface Project {
  id: string,
  name: string,
  description: string,
  isFavorite: boolean,
  lifecycle: ProjectLifecycle,
  owner: Owner,
  isPrivate: boolean,
  latestStatus: ProjectStatus | null,
  createdDateTime: string
}

export type ProjectLifecycle = 'Archived' | 'Active' | 'Upcoming'

interface Owner {
  id: string,
  name: string,
  email: string
}

export interface ProjectStatus {
  id: string,
  status: ProjectStatusType,
  updatedDateTime: string
}