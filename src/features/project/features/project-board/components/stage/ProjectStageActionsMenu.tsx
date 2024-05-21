import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import {
  DeleteOutlined,
  East,
  Edit,
  ElectricBolt,
  PlaylistAdd,
  West
} from "@mui/icons-material";

interface ProjectStageActionsMenuProps {
  anchorEl: HTMLElement | null,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}

interface ProjectStageActionsMenuItemProps {
  icon: ReactNode,
  children: ReactNode,
  color?: string | undefined,
  onClick?: MouseEventHandler<HTMLLIElement> | undefined,
  disabled?: boolean | undefined
}

const ProjectStageActionsMenuItem = ({
  onClick,
  icon,
  children,
  disabled,
  color
} : ProjectStageActionsMenuItemProps) => (
  <MenuItem disabled={disabled} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography pt={0.5} color={color}>{children}</Typography>
  </MenuItem>
)

function ProjectStageActionsMenu({ anchorEl, setAnchorEl }: ProjectStageActionsMenuProps) {
  const theme = useTheme()

  const handleCloseMenu = () => setAnchorEl(null)

  const handleAddRuleToStage = () => {
    console.log('Rule Added to stage!')
    handleCloseMenu()
  }
  const handleRenameStage = () => {
    console.log('Stage Renamed!')
    handleCloseMenu()
  }

  enum Placement { Left = 'left', Right = 'right' }
  const handleAddNewStage = (placement: Placement) => {
    console.log(`Added new stage to ${placement}!`)
    handleCloseMenu()
  }

  const handleDeleteStage = () => {
    console.log('project stage deleted!')
    handleCloseMenu()
  }

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
      <ProjectStageActionsMenuItem icon={<ElectricBolt />} onClick={handleAddRuleToStage}>
        Add Rule to Stage
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem icon={<Edit />} onClick={handleRenameStage}>
        Rename Stage
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem icon={<PlaylistAdd />}>
        Add New Stage
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem icon={<West />} onClick={() => handleAddNewStage(Placement.Left)}>
        To Left
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem icon={<East />} onClick={() => handleAddNewStage(Placement.Right)}>
        To Right
      </ProjectStageActionsMenuItem>
      <ProjectStageActionsMenuItem
        color={theme.palette.error.light}
        icon={<DeleteOutlined sx={{ color: theme.palette.error.light }} />}
        onClick={handleDeleteStage}>
        Delete Stage
      </ProjectStageActionsMenuItem>
    </Menu>
  );
}

export default ProjectStageActionsMenu;