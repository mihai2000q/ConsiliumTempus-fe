import { MouseEventHandler, ReactNode, useState } from "react";
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import UpdateProjectSprintDialog from "./UpdateProjectSprintDialog.tsx";
import ProjectSprint from "../types/ProjectSprint.model.ts";
import { useDeleteProjectSprintMutation } from "../state/projectSprintDialogApi.ts";

interface ProjectSprintActionsMenuItemProps {
  children: ReactNode,
  onClick: MouseEventHandler<HTMLLIElement> | undefined,
  icon?: ReactNode | undefined,
  color?: string | undefined,
}

const ProjectSprintActionsMenuItem = ({
  onClick,
  icon,
  children,
  color
} : ProjectSprintActionsMenuItemProps) => (
  <MenuItem onClick={onClick}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    <Typography pt={icon ? 0.5 : 0} color={color}>{children}</Typography>
  </MenuItem>
)

interface ProjectSprintActionsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  projectSprint: ProjectSprint
}

function ProjectSprintActionsMenu({
  anchorEl,
  onClose,
  projectSprint
}: ProjectSprintActionsMenuProps) {
  const [isUpdateProjectSprintDialogOpen, setIsUpdateProjectSprintDialogOpen] = useState(false)
  const handleCloseUpdateProjectStatusDialog = () => setIsUpdateProjectSprintDialogOpen(false)

  const [deleteProjectSprint] = useDeleteProjectSprintMutation()

  function handleUpdate() {
    onClose()
    setIsUpdateProjectSprintDialogOpen(true)
  }
  async function handleDelete() {
    onClose()
    deleteProjectSprint({
      id: projectSprint.id
    })
  }

  return (
    <>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}>
        <ProjectSprintActionsMenuItem icon={<EditOutlined />} onClick={handleUpdate}>
          Update Sprint
        </ProjectSprintActionsMenuItem>
        <ProjectSprintActionsMenuItem
          color={'error.light'}
          icon={<DeleteOutlined sx={{ color: 'error.light' }} />}
          onClick={handleDelete}>
          Delete Sprint
        </ProjectSprintActionsMenuItem>
      </Menu>
      <UpdateProjectSprintDialog
        open={isUpdateProjectSprintDialogOpen}
        onClose={handleCloseUpdateProjectStatusDialog}
        initialProjectSprint={projectSprint} />
    </>
  );
}

export default ProjectSprintActionsMenu