import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";
import ProjectLifecycle from "../../../utils/project/ProjectLifecycle.ts";

export default interface Project {
  id: string,
  name: string,
  description: string,
  isFavorite: boolean,
  lifecycle: ProjectLifecycle,
  owner: Owner,
  isPrivate: boolean,
  latestStatus: ProjectStatus | null,
  createdDateTime: Date
}

interface Owner {
  id: string,
  name: string,
  email: string
}

export interface ProjectStatus {
  id: string,
  status: ProjectStatusType,
  updatedDateTime: Date
}