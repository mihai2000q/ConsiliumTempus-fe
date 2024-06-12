import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, useState } from 'react';
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import ProjectStatusDialog from "./ProjectStatusDialog.tsx";
import ProjectStatus from "../../types/ProjectStatus.model.ts";
import { useRemoveStatusFromProjectMutation } from "../../state/projectApi.ts";

interface ProjectStageActionsMenuItemProps {
  children: ReactNode,
  icon?: ReactNode | undefined,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectStatusActionsMenuItem = ({
  onClick,
  icon,
  children,
  disabled,
  color
} : ProjectStageActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    <Typography pt={icon ? 0.5 : 0} color={color}>{children}</Typography>
  </MenuItem>
)

interface ProjectStatusActionsMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
  projectId: string,
  projectName: string,
  projectStatus: ProjectStatus
}

function ProjectStatusActionsMenu({
  anchorEl,
  setAnchorEl,
  projectId,
  projectName,
  projectStatus
}: ProjectStatusActionsMenuProps) {
  const handleClose = () => setAnchorEl(null)

  const [isUpdateProjectStatusDialogOpen, setIsUpdateProjectStatusDialogOpen] = useState(false)

  const [removeStatusFromProject] = useRemoveStatusFromProjectMutation()

  function handleUpdate() {
    handleClose()
    setIsUpdateProjectStatusDialogOpen(true)
  }
  async function handleDelete() {
    handleClose()
    removeStatusFromProject({
      id: projectId,
      statusId: projectStatus.id
    })
  }

  return (
    <>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}>
        <ProjectStatusActionsMenuItem icon={<EditOutlined />} onClick={handleUpdate}>
          Update Status
        </ProjectStatusActionsMenuItem>
        <ProjectStatusActionsMenuItem
          color={'error.light'}
          icon={<DeleteOutlined sx={{ color: 'error.light' }} />}
          onClick={handleDelete}>
          Delete Status
        </ProjectStatusActionsMenuItem>
      </Menu>
      <ProjectStatusDialog
        open={isUpdateProjectStatusDialogOpen}
        onClose={() => setIsUpdateProjectStatusDialogOpen(false)}
        projectId={projectId}
        projectName={projectName}
        initialProjectStatus={projectStatus} />
    </>
  );
}

export default ProjectStatusActionsMenu;