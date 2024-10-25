import dayjs from 'dayjs'
import ProjectStatus from '../types/ProjectStatus.model.ts'
import { ProjectStatusResponse } from '../types/ProjectStatus.response.ts'
import ProjectStatusType from '../../../../../utils/project/ProjectStatusType.ts'

export default class ProjectStatusAdapter {
  static adapt(statuses: ProjectStatusResponse[] | undefined): ProjectStatus[] | undefined {
    if (!statuses) return undefined

    return statuses.map(ProjectStatusAdapter.adaptStatus)
  }

  private static adaptStatus(status: ProjectStatusResponse): ProjectStatus {
    return {
      ...status,
      status: Object.values(ProjectStatusType).find(s => s === status.status) ?? ProjectStatusType.OnTrack,
      createdDateTime: dayjs(status.createdDateTime),
      updatedDateTime: dayjs(status.updatedDateTime)
    }
  }
}
