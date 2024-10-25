import ProjectStatusType from '../../../../utils/project/ProjectStatusType.ts'

export interface AddStatusToProjectRequest {
  id: string,
  title: string,
  status: ProjectStatusType,
  description: string
}
