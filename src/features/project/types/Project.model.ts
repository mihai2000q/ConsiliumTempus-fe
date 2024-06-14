import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";
import ProjectLifecycle from "../../../utils/project/ProjectLifecycle.ts";

export default interface Project {
  name: string,
  isFavorite: boolean,
  lifecycle: ProjectLifecycle,
  owner: User,
  isPrivate: boolean,
  latestStatus: ProjectStatus | null
}

export interface ProjectStatus {
  id: string,
  title: string,
  status: ProjectStatusType,
  createdDateTime: Date,
  updatedDateTime: Date,
  createdBy: User,
  updatedBy: User
}

interface User {
  id: string,
  name: string,
  email: string,
}
