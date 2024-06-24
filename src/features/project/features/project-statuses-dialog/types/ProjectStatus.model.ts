import ProjectStatusType from "../../../../../utils/project/ProjectStatusType.ts";
import { Dayjs } from "dayjs";

export default interface ProjectStatus {
  id: string,
  title: string,
  status: ProjectStatusType,
  description: string,
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