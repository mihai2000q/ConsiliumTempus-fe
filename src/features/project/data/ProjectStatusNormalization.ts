import ProjectStatusType from "../types/ProjectStatusType.ts";

export const projectStatusNormalization: Map<ProjectStatusType, string> = new Map<ProjectStatusType, string>()
projectStatusNormalization.set('OnTrack', 'On Track')
projectStatusNormalization.set('AtRisk', 'At Risk')
projectStatusNormalization.set('OffTrack', 'Off Track')
projectStatusNormalization.set('OnHold', 'On Hold')
projectStatusNormalization.set('Completed', 'Completed')
