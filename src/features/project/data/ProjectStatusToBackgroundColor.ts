import ProjectStatusType from '../../../utils/project/ProjectStatusType.ts'

export const projectStatusToBackgroundColor: Map<ProjectStatusType, string> = new Map<ProjectStatusType, string>()
projectStatusToBackgroundColor.set(ProjectStatusType.OnTrack, '#1D3733')
projectStatusToBackgroundColor.set(ProjectStatusType.AtRisk, '#3D3120')
projectStatusToBackgroundColor.set(ProjectStatusType.OffTrack, '#581E28')
projectStatusToBackgroundColor.set(ProjectStatusType.OnHold, '#172237')
projectStatusToBackgroundColor.set(ProjectStatusType.Completed, '#58987c')
