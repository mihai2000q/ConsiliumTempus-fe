import { ProjectStatus } from "../types/Project.model.ts";
import { useTheme } from "@mui/material";
import ProjectStatusType from "../../project/types/ProjectStatusType.ts";
import useIsDarkMode from "../../../hooks/useIsDarkMode.ts";

export default function useProjectStatusHeader(
  createdDateTime: string,
  latestStatus: ProjectStatus | null
): [string, string] {
  const theme = useTheme()
  const isDarkMode = useIsDarkMode()

  if (latestStatus === null)
    return [
      `Project started on ${new Date(createdDateTime).toLocaleDateString()}`,
      isDarkMode ? theme.palette.primary[900] : theme.palette.primary[100]
    ]

  return [
    `Project has been ${statusTypeToStatus.get(latestStatus.status)} since 
    ${new Date(latestStatus.updatedDateTime).toLocaleDateString()}`,
    statusTypeToColor.get(latestStatus.status)!
  ]
}

const statusTypeToStatus = new Map<ProjectStatusType, string>()
statusTypeToStatus.set('OnTrack', 'on track')
statusTypeToStatus.set('AtRisk', 'at risk')
statusTypeToStatus.set('OffTrack', 'off track')
statusTypeToStatus.set('OnHold', 'on hold')
statusTypeToStatus.set('Completed', 'completed')

const statusTypeToColor = new Map<ProjectStatusType, string>
statusTypeToColor.set('OnTrack', '#5DA283')
statusTypeToColor.set('AtRisk', '#F1BD6C')
statusTypeToColor.set('OffTrack', '#D1395A')
statusTypeToColor.set('OnHold', '#2e71fa')
statusTypeToColor.set('Completed', '#57ff71')