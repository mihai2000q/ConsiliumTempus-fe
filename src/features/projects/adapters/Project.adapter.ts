import { ProjectResponse } from "../types/Project.response.ts";
import Project from "../types/Project.model.ts";
import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";
import ProjectLifecycle from "../../../utils/project/ProjectLifecycle.ts";

export default class ProjectAdapter {
  static adapt(projects: ProjectResponse[] | undefined): Project[] | undefined {
    if (!projects) return undefined

    return projects.map(project => {
      return {
        ...project,
        lifecycle: Object.values(ProjectLifecycle).find(l => l === project.lifecycle) ?? ProjectLifecycle.Active,
        owner: { ...project.owner },
        latestStatus: project.latestStatus === null
          ? null
          : {
            ...project.latestStatus,
            status: Object.values(ProjectStatusType).find(s => s === project.latestStatus!.status) ?? ProjectStatusType.OnTrack,
            updatedDateTime: new Date(project.latestStatus.updatedDateTime)
          },
        createdDateTime: new Date(project.createdDateTime)
      }
    })
  }
}