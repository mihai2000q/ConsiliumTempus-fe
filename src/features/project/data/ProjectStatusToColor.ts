import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";

export const projectStatusToColor: Map<ProjectStatusType, string> = new Map<ProjectStatusType, string>()
projectStatusToColor.set(ProjectStatusType.OnTrack, '#5DA283')
projectStatusToColor.set(ProjectStatusType.AtRisk, '#F1BD6C')
projectStatusToColor.set(ProjectStatusType.OffTrack, '#D1395A')
projectStatusToColor.set(ProjectStatusType.OnHold, '#4573D2')
projectStatusToColor.set(ProjectStatusType.Completed, '#cbdad4')