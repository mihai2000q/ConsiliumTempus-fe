import { ProjectStatus } from '../types/Project.model.ts'
import { useTheme } from '@mui/material'
import useIsDarkMode from '../../../hooks/useIsDarkMode.ts'
import ProjectStatusType from '../../../utils/project/ProjectStatusType.ts'
import normalize from '../../../utils/normalize.ts'
import { Dayjs } from 'dayjs'

export default function useProjectStatusHeader(
  createdDateTime: Dayjs,
  latestStatus: ProjectStatus | null
): [string, string] {
  const theme = useTheme()
  const isDarkMode = useIsDarkMode()

  if (latestStatus === null)
    return [
      `Project started on ${createdDateTime.format('DD MMMM YYYY')}`,
      isDarkMode ? theme.palette.primary[900] : theme.palette.primary[100]
    ]

  return [
    `Project has been ${normalize(latestStatus.status, true)} since
    ${latestStatus.updatedDateTime.format('DD MMMM YYYY')}`,
    statusTypeToColor.get(latestStatus.status)!
  ]
}

const statusTypeToColor = new Map<ProjectStatusType, string>
statusTypeToColor.set(ProjectStatusType.OnTrack, '#5DA283')
statusTypeToColor.set(ProjectStatusType.AtRisk, '#F1BD6C')
statusTypeToColor.set(ProjectStatusType.OffTrack, '#D1395A')
statusTypeToColor.set(ProjectStatusType.OnHold, '#2e71fa')
statusTypeToColor.set(ProjectStatusType.Completed, '#57ff71')
