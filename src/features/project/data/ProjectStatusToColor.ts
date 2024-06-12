import { ProjectStatusType } from "../types/Project.model.ts";

export const projectStatusToColor: Map<ProjectStatusType, string> = new Map<ProjectStatusType, string>()
projectStatusToColor.set('OnTrack', '#5DA283')
projectStatusToColor.set('AtRisk', '#F1BD6C')
projectStatusToColor.set('OffTrack', '#D1395A')
projectStatusToColor.set('OnHold', '#4573D2')
projectStatusToColor.set('Completed', '#cbdad4')