import {
  alpha,
  Box,
  BoxProps,
  Button,
  Dialog,
  Divider, Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store.ts";
import { closeProjectStatusesDialog } from "../../../../state/project/projectSlice.ts";
import { useGetStatusesFromProjectQuery } from "../../state/projectApi.ts";
import ProjectStatus from "../../types/ProjectStatus.model.ts";
import { useEffect, useState } from "react";
import { Close, MoreHoriz } from "@mui/icons-material";
import ProjectStatusLabel from "./ProjectStatusLabel.tsx";
import { projectStatusToColor } from "../../data/ProjectStatusToColor.ts";
import ProjectStatusActionsMenu from "./ProjectStatusActionsMenu.tsx";
import UserLabel from "../../../../components/label/UserLabel.tsx";
import ProjectStatusMenu from "./ProjectStatusMenu.tsx";
import ProjectStatusesDialogLoader from "./ProjectStatusesDialogLoader.tsx";
import ProjectStatusAdapter from "../../adapters/ProjectStatus.adapter.ts";
import useAdapterState from "../../../../hooks/useAdapterState.ts";
import FormGridItem from "../../../../components/form/FormGridItem.tsx";

interface ProjectStatusButtonProps extends BoxProps {
  isSelected: boolean
}

const ProjectStatusButton = styled(Box, {
  shouldForwardProp: (props) => props !== 'isSelected'
})<ProjectStatusButtonProps>(({ theme, isSelected }) => ({
  padding: '20px 24px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'start',
  borderRadius: 0,
  fontWeight: 600,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  '&: hover': {
    backgroundColor: alpha(theme.palette.background[100], 0.08),
    color: theme.palette.background[200],
  },
  ...(isSelected && {
    backgroundColor: alpha(theme.palette.background[100], 0.08),
    color: theme.palette.background[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.background[100], 0.13),
      color: theme.palette.background[50],
    }
  })
}))

function ProjectStatusesDialog() {
  const {
    isOpen,
    statusIdSelected
  } = useSelector((state: RootState) => state.project.projectStatusesDialog)
  const projectId = useSelector((state: RootState) => state.project.projectId)
  const projectName = useSelector((state: RootState) => state.project.projectName)

  const dispatch = useDispatch<AppDispatch>()

  const { data } = useGetStatusesFromProjectQuery(
    { id: projectId },
    { skip: projectId === '' }
  )
  const statuses = useAdapterState(data?.statuses, ProjectStatusAdapter.adapt)

  const [projectStatusSelected, setProjectStatusSelected] = useState<ProjectStatus | undefined>(undefined)
  useEffect(() => {
    if (statusIdSelected) {
      const st = statuses?.filter(s => s.id === statusIdSelected)[0]
      if (st)
        setProjectStatusSelected(st)
      else
        setProjectStatusSelected(statuses && statuses[0])
    } else {
      setProjectStatusSelected(statuses && statuses[0])
    }
  }, [data, statusIdSelected]);

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = () => dispatch(closeProjectStatusesDialog())

  function handleStatusTabClick(status: ProjectStatus) {
    setProjectStatusSelected(status)
  }

  if (!data || !projectStatusSelected) {
    return <ProjectStatusesDialogLoader isOpen={isOpen} onClose={handleClose} />
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={'lg'}>
      <Stack height={720} sx={{ overflowY: 'hidden' }}>
        <Stack direction={'row'} alignItems={'center'} px={3} py={2} spacing={2}>
          <Stack flexGrow={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
              <Typography variant={'h5'} fontSize={20} fontWeight={500}>Statuses of</Typography>
              <Typography variant={'h5'} fontSize={20} fontWeight={600}>{projectName}</Typography>
            </Stack>
            <Typography variant={'subtitle2'} fontWeight={400} color={'text.secondary'}>
              {data.totalCount} status update{data.totalCount > 1 ? 's' : ''}
            </Typography>
          </Stack>

          <Button variant={'alt-outlined'} onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            Add New Status
          </Button>
          <ProjectStatusMenu
            anchorEl={menuAnchorEl}
            setAnchorEl={setMenuAnchorEl}
            latestStatus={null} />

          <IconButton variant={'circular'} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />

        <Stack direction={'row'} flexGrow={1} sx={{ overflowY: 'hidden' }}>
          <Stack minWidth={280} sx={{ overflowY: 'auto' }}>
            {statuses?.map((status) => (
              <div key={status.id}>
                <ProjectStatusButton
                  isSelected={status.id === projectStatusSelected.id}
                  onClick={() => handleStatusTabClick(status)}>
                  <Stack alignItems="start" spacing={0.5}>
                    <Stack
                      direction={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      spacing={1}
                      width={240}>
                      <Typography variant={'body1'} fontWeight={400} fontSize={16} noWrap>{status.title}</Typography>
                      <Typography>{status.createdDateTime.format('DD/MM/YYYY')}</Typography>
                    </Stack>
                    <ProjectStatusLabel status={status.status} />
                  </Stack>
                </ProjectStatusButton>
                <Divider />
              </div>
            ))}
          </Stack>
          <Divider orientation={"vertical"} />

          <Stack flexGrow={1}>
            <Divider color={projectStatusToColor.get(projectStatusSelected.status) ?? 'white'} sx={{ height: 8 }} />
            <Stack flexGrow={1} py={3} px={2} spacing={2}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant={'h5'}>{projectStatusSelected.title}</Typography>

                <Stack direction={'row'}>
                  <IconButton onClick={(e) => setActionsMenuAnchorEl(e.currentTarget)}>
                    <MoreHoriz />
                  </IconButton>
                  <ProjectStatusActionsMenu
                    anchorEl={actionsMenuAnchorEl}
                    setAnchorEl={setActionsMenuAnchorEl}
                    projectStatus={projectStatusSelected} />
                </Stack>
              </Stack>

              <Grid container rowSpacing={1} width={500}>
                <FormGridItem label={'Status'} labelSize={2}>
                  <ProjectStatusLabel status={projectStatusSelected.status} />
                </FormGridItem>

                <FormGridItem label={'Publisher'} labelSize={2}>
                  <UserLabel user={{ ...projectStatusSelected.createdBy }} />
                  <Typography variant={'caption'} color={'text.secondary'} mx={0.75}>on</Typography>
                  <Typography variant={'body2'}>
                    {projectStatusSelected.createdDateTime.format('DD MMMM YYYY')}
                  </Typography>
                </FormGridItem>

                {!projectStatusSelected.createdDateTime.isSame(projectStatusSelected.updatedDateTime) && (
                  <FormGridItem label={'Updated By'} labelSize={2}>
                    <UserLabel user={{ ...projectStatusSelected.updatedBy }} />
                    <Typography variant={'caption'} color={'text.secondary'} mx={0.75}>on</Typography>
                    <Typography variant={'body2'}>
                      {projectStatusSelected.updatedDateTime.format('DD MMMM YYYY')}
                    </Typography>
                  </FormGridItem>
                )}
              </Grid>

              <Stack>
                <Typography variant={'h6'} mb={0.5}>Description</Typography>
                <Typography>
                  {projectStatusSelected.description}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default ProjectStatusesDialog;