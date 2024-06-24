import { MouseEventHandler, ReactNode } from "react";
import { ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { DeleteOutlined, East, Edit, ElectricBolt, PlaylistAdd, West } from "@mui/icons-material";
import { useRemoveStageFromProjectSprintMutation } from "../../state/projectBoardApi.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../state/store.ts";

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

interface ProjectStageActionsMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  stageId: string
}

function ProjectStageActionsMenu({ anchorEl, onClose, stageId }: ProjectStageActionsMenuProps) {
  const theme = useTheme()

  const sprintId = useSelector((state: RootState) => state.project.sprintId)

  const handleAddRuleToStage = () => {
    onClose()
  }
  const handleRenameStage = () => {
    onClose()
  }

  enum Placement { Left = 'left', Right = 'right' }
  const handleAddNewStage = (placement: Placement) => {
    console.log(placement)
    onClose()
  }

  const [removeStageFromProjectSprint] = useRemoveStageFromProjectSprintMutation()
  const handleDeleteStage = () => {
    removeStageFromProjectSprint({ id: sprintId!, stageId })
    onClose()
  }

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
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