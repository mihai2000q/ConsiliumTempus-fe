import { useState } from 'react'
import { Grid, IconButton, Stack, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import ProjectSprintActionsMenu from './ProjectSprintActionsMenu.tsx'
import FormGridItem from '../../../../../components/form/FormGridItem.tsx'
import UserLabel from '../../../../../components/label/UserLabel.tsx'
import ProjectSprintLoader from './ProjectSprintLoader.tsx'
import useAdapterState from '../../../../../hooks/useAdapterState.ts'
import ProjectSprintAdapter from '../adapters/ProjectSprint.adapter.ts'
import { useGetProjectSprintQuery } from '../state/projectSprintsDialogApi.ts'

interface ProjectSprintProps {
  sprintId: string
}

function ProjectSprint({ sprintId }: ProjectSprintProps) {
  const { data } = useGetProjectSprintQuery(
    { id: sprintId },
    { skip: sprintId === '' }
  )
  const sprint = useAdapterState(data, ProjectSprintAdapter.adapt)

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] = useState<HTMLElement | null>(null)

  if (sprintId === '' || !sprint) {
    return <ProjectSprintLoader />
  }

  return (
    <Stack flexGrow={1} py={3} px={2} spacing={1}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant={'h5'}>{sprint.name}</Typography>

        <Stack direction={'row'}>
          <IconButton onClick={(e) => setActionsMenuAnchorEl(e.currentTarget)}>
            <MoreHoriz />
          </IconButton>
          <ProjectSprintActionsMenu
            anchorEl={actionsMenuAnchorEl}
            onClose={() => setActionsMenuAnchorEl(null)}
            sprintId={sprintId}
            projectSprint={sprint} />
        </Stack>
      </Stack>

      <Grid container rowSpacing={1.5} width={500}>
        <FormGridItem label={'Start Date'} labelSize={2}>
          <Typography>{sprint.startDate?.format('DD MMMM YYYY') ?? '?'}</Typography>
        </FormGridItem>

        <FormGridItem label={'End Date'} labelSize={2}>
          <Typography>{sprint.endDate?.format('DD MMMM YYYY') ?? '?'}</Typography>
        </FormGridItem>

        <FormGridItem label={'Publisher'} labelSize={2}>
          <UserLabel user={{ ...sprint.createdBy }} />
          <Typography variant={'caption'} color={'text.secondary'} mx={0.75}>on</Typography>
          <Typography variant={'body2'}>
            {sprint.createdDateTime.format('DD MMMM YYYY')}
          </Typography>
        </FormGridItem>

        {!sprint.createdDateTime.isSame(sprint.updatedDateTime) && (
          <FormGridItem label={'Updated By'} labelSize={2}>
            <UserLabel user={{ ...sprint.updatedBy }} />
            <Typography variant={'caption'} color={'text.secondary'} mx={0.75}>on</Typography>
            <Typography variant={'body2'}>
              {sprint.updatedDateTime.format('DD MMMM YYYY')}
            </Typography>
          </FormGridItem>
        )}
      </Grid>
    </Stack>
  )
}

export default ProjectSprint
