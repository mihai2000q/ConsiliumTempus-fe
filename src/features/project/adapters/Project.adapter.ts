import Project from "../types/Project.model.ts";
import ProjectResponse from "../types/Project.response.ts";
import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";
import ProjectLifecycle from "../../../utils/project/ProjectLifecycle.ts";
import dayjs from "dayjs";

export default class ProjectAdapter {
  static adapt(project: ProjectResponse | undefined) : Project | undefined {
    if (!project) return undefined

    return {
      ...project,
      lifecycle: Object.values(ProjectLifecycle).find(l => l === project.lifecycle) ?? ProjectLifecycle.Active,
      owner: { ...project.owner },
      latestStatus: project.latestStatus === null
        ? null
        : {
          ...project.latestStatus,
          status: Object.values(ProjectStatusType).find(s => s === project.latestStatus!.status) ?? ProjectStatusType.OnTrack,
          updatedDateTime: dayjs(project.latestStatus.updatedDateTime),
          createdDateTime: dayjs(project.latestStatus.createdDateTime),
          createdBy: { ...project.latestStatus.createdBy },
          updatedBy: { ...project.latestStatus.updatedBy },
        },
    }
  }
}