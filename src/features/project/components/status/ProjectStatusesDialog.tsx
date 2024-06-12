import {
  alpha,
  Box,
  BoxProps,
  Button,
  Dialog,
  Divider,
  IconButton, Link,
  Skeleton,
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
    statusIdSelected,
    projectId,
    projectName
  } = useSelector((state: RootState) => state.project.projectStatusesDialog)

  const dispatch = useDispatch<AppDispatch>()

  const { data } = useGetStatusesFromProjectQuery(
    { id: projectId! },
    { skip: projectId === undefined }
  )

  const [projectStatusSelected, setProjectStatusSelected] = useState<ProjectStatus | undefined>(undefined)
  useEffect(() => {
    if (statusIdSelected) {
      const st = data?.statuses?.filter(s => s.id === statusIdSelected)[0]
      if (st)
        setProjectStatusSelected(st)
      else
        setProjectStatusSelected(data?.statuses && data?.statuses[0])
    } else {
      setProjectStatusSelected(data?.statuses && data?.statuses[0])
    }
  }, [data, statusIdSelected]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = () => dispatch(closeProjectStatusesDialog())

  function handleStatusTabClick(status: ProjectStatus) {
    setProjectStatusSelected(status)
  }

  if (data === undefined ||
    projectStatusSelected === undefined ||
    projectId === undefined ||
    projectName === undefined) {
    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}>
        <Stack direction={'row'}>
          <Stack width={200}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Stack>
        </Stack>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={'lg'}>
      <Stack height={720} sx={{ overflowY: 'hidden' }}>
        <Stack direction={'row'} paddingX={3} alignItems={'center'} py={2} spacing={2}>
          <Stack flexGrow={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
              <Typography variant={'h5'} fontSize={20} fontWeight={500}>Statuses of</Typography>
              <Typography variant={'h5'} fontSize={20} fontWeight={600}>{projectName}</Typography>
            </Stack>
            <Typography variant={'subtitle2'} fontWeight={400} color={'text.secondary'}>
              {data.totalCount} status update{data.totalCount > 1 ? 's' : ''}
            </Typography>
          </Stack>
          <Button variant={'outlined'}>Add New Status</Button>
          <IconButton variant={'circular'} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />

        <Stack direction={'row'} flexGrow={1} sx={{ overflowY: 'hidden' }}>
          <Stack width={280} sx={{ overflowY: 'auto' }}>
            {data.statuses.map((status) => (
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
                      <Typography>{new Date(status.createdDateTime).toLocaleDateString()}</Typography>
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
                  <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                    <MoreHoriz />
                  </IconButton>
                  <ProjectStatusActionsMenu
                    anchorEl={menuAnchorEl}
                    setAnchorEl={setMenuAnchorEl}
                    projectId={projectId}
                    projectName={projectName}
                    projectStatus={projectStatusSelected} />
                </Stack>
              </Stack>

              <Stack spacing={1}>
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography variant={'body2'} mr={9} color={'text.secondary'}>Status</Typography>
                  <ProjectStatusLabel status={projectStatusSelected.status} />
                </Stack>
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography variant={'body2'} mr={7} color={'text.secondary'}>Publisher</Typography>
                  <Typography>{projectStatusSelected.createdBy.name}</Typography>
                  {projectStatusSelected.createdDateTime !== projectStatusSelected.updatedDateTime && (
                    <>
                      <Typography variant={'subtitle2'} color={'text.secondary'} ml={1} mr={1}>updated by</Typography>
                      <Link>
                        {projectStatusSelected.updatedBy.name}
                      </Link>
                    </>
                  )}
                </Stack>
              </Stack>

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