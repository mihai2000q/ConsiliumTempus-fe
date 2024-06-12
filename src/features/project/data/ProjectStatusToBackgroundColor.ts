import ProjectStatusType from "../types/ProjectStatusType.ts";

export const projectStatusToBackgroundColor: Map<ProjectStatusType, string> = new Map<ProjectStatusType, string>()
projectStatusToBackgroundColor.set('OnTrack', '#1D3733')
projectStatusToBackgroundColor.set('AtRisk', '#3D3120')
projectStatusToBackgroundColor.set('OffTrack', '#581E28')
projectStatusToBackgroundColor.set('OnHold', '#172237')
projectStatusToBackgroundColor.set('Completed', '#58987c')