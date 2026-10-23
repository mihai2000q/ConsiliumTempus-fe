import Grid from '@mui/material/Grid'
import { Button, Dialog, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../state/store.ts'
import { closeProjectStatusesDialog } from '../../../../state/project/projectSlice.ts'
import ProjectStatus from './types/ProjectStatus.model.ts'
import { useEffect, useState } from 'react'
import { Close, MoreHoriz } from '@mui/icons-material'
import ProjectStatusLabel from '../../shared/components/ProjectStatusLabel.tsx'
import { projectStatusToColor } from '../../data/ProjectStatusToColor.ts'
import ProjectStatusActionsMenu from './components/ProjectStatusActionsMenu.tsx'
import UserLabel from '../../../../components/label/UserLabel.tsx'
import ProjectStatusMenu from '../../shared/components/ProjectStatusMenu.tsx'
import ProjectStatusesDialogLoader from './components/ProjectStatusesDialogLoader.tsx'
import FormGridItem from '../../../../components/form/FormGridItem.tsx'
import VerticalLargeRadioButton from '../../../../components/button/radio/VerticalLargeRadioButton.tsx'
import { useGetStatusesFromProjectQuery } from './state/projectStatusesDialogApi.ts'
import dayjs from 'dayjs'

function ProjectStatusesDialog() {
  const { open, statusIdSelected } = useSelector(
    (state: RootState) => state.project.projectStatusesDialog
  )
  const projectId = useSelector((state: RootState) => state.project.projectId)
  const projectName = useSelector((state: RootState) => state.project.projectName)

  const dispatch = useDispatch<AppDispatch>()

  const { data } = useGetStatusesFromProjectQuery({ id: projectId }, { skip: projectId === '' })
  const statuses = data?.statuses

  const [projectStatusSelected, setProjectStatusSelected] = useState<ProjectStatus | undefined>(
    undefined
  )
  useEffect(() => {
    if (statusIdSelected) {
      const st = statuses?.filter((s) => s.id === statusIdSelected)[0]
      if (st) setProjectStatusSelected(st)
      else setProjectStatusSelected(statuses && statuses[0])
    } else {
      setProjectStatusSelected(statuses && statuses[0])
    }
  }, [statuses, statusIdSelected])

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = () => dispatch(closeProjectStatusesDialog())

  function handleStatusClick(status: ProjectStatus) {
    setProjectStatusSelected(status)
  }

  if (!data || !projectStatusSelected) {
    return <ProjectStatusesDialogLoader open={open} onClose={handleClose} />
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'lg'}>
      <Stack
        sx={{
          height: 720,
          overflowY: 'hidden'
        }}
      >
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            alignItems: 'center',
            px: 3,
            py: 2
          }}
        >
          <Stack
            sx={{
              flexGrow: 1
            }}
          >
            <Stack
              direction={'row'}
              spacing={0.5}
              sx={{
                alignItems: 'center'
              }}
            >
              <Typography
                variant={'h5'}
                sx={{
                  fontSize: 20,
                  fontWeight: 500
                }}
              >
                Statuses of
              </Typography>
              <Typography
                variant={'h5'}
                sx={{
                  fontSize: 20,
                  fontWeight: 600
                }}
              >
                {projectName}
              </Typography>
            </Stack>
            <Typography
              variant={'subtitle2'}
              sx={{
                fontWeight: 400,
                color: 'text.secondary'
              }}
            >
              {data.totalCount} status update{data.totalCount > 1 ? 's' : ''}
            </Typography>
          </Stack>

          <Button variant={'alt-outlined'} onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            Add New Status
          </Button>
          <ProjectStatusMenu
            anchorEl={menuAnchorEl}
            onClose={() => setMenuAnchorEl(null)}
            latestStatus={null}
          />

          <IconButton variant={'circular'} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />

        <Stack
          direction={'row'}
          sx={{
            flexGrow: 1,
            overflowY: 'hidden'
          }}
        >
          <Stack
            sx={{
              minWidth: 280,
              overflowY: 'auto'
            }}
          >
            {statuses?.map((status) => (
              <div key={status.id}>
                <VerticalLargeRadioButton
                  isSelected={status.id === projectStatusSelected.id}
                  onClick={() => handleStatusClick(status)}
                >
                  <Stack
                    spacing={0.5}
                    sx={{
                      alignItems: 'start'
                    }}
                  >
                    <Stack
                      direction={'row'}
                      spacing={1}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: 240
                      }}
                    >
                      <Typography
                        variant={'body1'}
                        noWrap
                        sx={{
                          fontWeight: 400,
                          fontSize: 16
                        }}
                      >
                        {status.title}
                      </Typography>
                      <Typography>{dayjs(status.createdDateTime).format('DD/MM/YYYY')}</Typography>
                    </Stack>
                    <ProjectStatusLabel status={status.status} />
                  </Stack>
                </VerticalLargeRadioButton>
                <Divider />
              </div>
            ))}
          </Stack>
          <Divider orientation={'vertical'} />

          <Stack
            sx={{
              flexGrow: 1
            }}
          >
            <Divider
              color={projectStatusToColor.get(projectStatusSelected.status) ?? 'white'}
              sx={{ height: 8 }}
            />
            <Stack
              spacing={2}
              sx={{
                flexGrow: 1,
                py: 3,
                px: 2
              }}
            >
              <Stack
                direction={'row'}
                sx={{
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant={'h5'}>{projectStatusSelected.title}</Typography>

                <Stack direction={'row'}>
                  <IconButton onClick={(e) => setActionsMenuAnchorEl(e.currentTarget)}>
                    <MoreHoriz />
                  </IconButton>
                  <ProjectStatusActionsMenu
                    anchorEl={actionsMenuAnchorEl}
                    onClose={() => setActionsMenuAnchorEl(null)}
                    projectStatus={projectStatusSelected}
                  />
                </Stack>
              </Stack>

              <Grid
                container
                rowSpacing={1}
                sx={{
                  width: 500
                }}
              >
                <FormGridItem label={'Status'} labelSize={2}>
                  <ProjectStatusLabel status={projectStatusSelected.status} />
                </FormGridItem>

                <FormGridItem label={'Publisher'} labelSize={2}>
                  <UserLabel user={{ ...projectStatusSelected.createdBy }} />
                  <Typography
                    variant={'caption'}
                    sx={{
                      color: 'text.secondary',
                      mx: 0.75
                    }}
                  >
                    on
                  </Typography>
                  <Typography variant={'body2'}>
                    {dayjs(projectStatusSelected.createdDateTime).format('DD MMMM YYYY')}
                  </Typography>
                </FormGridItem>

                {!dayjs(projectStatusSelected.createdDateTime).isSame(
                  projectStatusSelected.updatedDateTime
                ) && (
                  <FormGridItem label={'Updated By'} labelSize={2}>
                    <UserLabel user={{ ...projectStatusSelected.updatedBy }} />
                    <Typography
                      variant={'caption'}
                      sx={{
                        color: 'text.secondary',
                        mx: 0.75
                      }}
                    >
                      on
                    </Typography>
                    <Typography variant={'body2'}>
                      {dayjs(projectStatusSelected.updatedDateTime).format('DD MMMM YYYY')}
                    </Typography>
                  </FormGridItem>
                )}
              </Grid>

              <Stack>
                <Typography
                  variant={'h6'}
                  sx={{
                    mb: 0.5
                  }}
                >
                  Description
                </Typography>
                <Typography>{projectStatusSelected.description}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default ProjectStatusesDialog
