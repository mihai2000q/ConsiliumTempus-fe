import { ProjectStatus } from "../../types/Project.model.ts";
import { Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ProjectStatusLabel from "./ProjectStatusLabel.tsx";
import { projectStatusToColor } from "../../data/ProjectStatusToColor.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../state/store.ts";
import { openProjectStatusesDialog } from "../../../../state/project/projectSlice.ts";
import ProjectStatusType from "../../../../utils/project/ProjectStatusType.ts";
import AddProjectStatusDialog from "./AddProjectStatusDialog.tsx";

interface ProjectStatusMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
  latestStatus: ProjectStatus | null
}

function ProjectStatusMenu({
  anchorEl,
  setAnchorEl,
  latestStatus
}: ProjectStatusMenuProps) {
  const dispatch = useDispatch<AppDispatch>()

  const [addStatusDialogOpen, setAddStatusDialogOpen] = useState(false)
  const handleCloseAddStatusDialog = () => setAddStatusDialogOpen(false)

  const [status, setStatus] = useState(ProjectStatusType.OnTrack)

  const handleCloseMenu = () => setAnchorEl(null)

  function handleLatestStatusClick() {
    handleCloseMenu()
    dispatch(openProjectStatusesDialog({
      isOpen: true,
      statusIdSelected: latestStatus!.id
    }))
  }

  function handleStatusClick(status: ProjectStatusType) {
    setStatus(status)
    handleCloseMenu()
    setAddStatusDialogOpen(true)
  }

  return (
    <>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        sx={{
          ...(latestStatus && {
            '& .MuiList-root': {
              paddingTop: 0
            }
          })
        }}>
        {latestStatus &&
          <Stack>
            <Divider color={projectStatusToColor.get(latestStatus.status) ?? 'white'} sx={{ height: 10 }} />
            <MenuItem onClick={handleLatestStatusClick}>
              <Stack maxWidth={200}>
                <Typography variant={'subtitle1'} color={'text.secondary'} fontWeight={600}>View latest update</Typography>
                <Typography variant={'h6'} noWrap>{latestStatus.title}</Typography>
                <Stack direction={'row'} spacing={0.5}>
                  <Typography variant={'body2'} color={'text.triadic'} noWrap>{latestStatus.createdBy.name} -</Typography>
                  <Typography variant={'body2'} color={'text.triadic'}>{latestStatus.createdDateTime.format('DD/MM/YYYY')}</Typography>
                </Stack>
              </Stack>
            </MenuItem>
          </Stack>
        }
        {Object.values(ProjectStatusType).map(status => (
          <MenuItem key={status} onClick={() => handleStatusClick(status)}>
            <ProjectStatusLabel status={status} />
          </MenuItem>
        ))}
      </Menu>

      <AddProjectStatusDialog
        open={addStatusDialogOpen}
        onClose={handleCloseAddStatusDialog}
        initialStatus={status} />
    </>
  );
}

export default ProjectStatusMenu;