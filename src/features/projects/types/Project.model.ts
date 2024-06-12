export default interface Project {
  id: string,
  name: string,
  description: string,
  isFavorite: boolean,
  lifecycle: ProjectLifecycle,
  owner: Owner
  isPrivate: boolean,
  latestStatus: ProjectStatus | null
}

export type ProjectLifecycle = 'archived' | 'active' | 'upcoming'

interface Owner {
  id: string,
  name: string,
  email: string
}

interface ProjectStatus {
  id: string,
  status: string,
  updatedDateTime: string
}