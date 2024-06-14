import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";

export default interface ProjectStatus {
  id: string,
  title: string,
  status: ProjectStatusType,
  description: string,
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