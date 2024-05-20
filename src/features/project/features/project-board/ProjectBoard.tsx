import { useState } from "react";
import { Button, ButtonGroup, Divider, Menu, MenuItem, Stack } from "@mui/material";
import ProjectStages from "./components/stage/ProjectStages.tsx";
import ProjectStagesLoader from "./components/stage/ProjectStagesLoader.tsx";
import {
  Add,
  ArrowDropDownOutlined,
  FilterList,
  GroupWorkOutlined,
  Sort,
  VisibilityOffOutlined
} from "@mui/icons-material";

interface ProjectBoardProps {
  sprintId: string | undefined
}

function ProjectBoard({ sprintId }: ProjectBoardProps) {
  const handleAddTask = () => {
    console.log('Task Added')
  }
  const handleAddStage = () => {
    console.log('Stage Added')
  }
  const handleAddSprint = () => {
    console.log('Sprint Added')
  }

  type Option = { option: string, action: () => void }
  const addOptions: Option[] = [
    { option: 'Add Task', action: handleAddTask },
    { option: 'Add Stage', action: handleAddStage },
    { option: 'Add Sprint', action: handleAddSprint },
  ]
  const [addOption, setAddOption] = useState(addOptions[0])

  const [addOptionsMenuAnchorEl, setAddOptionsMenuAnchorEl] =
    useState<HTMLElement | null>(null)
  const handleCloseAddOptionsMenu = () => setAddOptionsMenuAnchorEl(null)

  return (
    <Stack alignItems="start" height={'100%'} mt={1}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <ButtonGroup variant={'outlined'} size={'small'}>
          <Button
            startIcon={<Add />}
            sx={{ borderRadius: 1.5 }}
            onClick={addOption.action}>
            {addOption.option}
          </Button>
          <Button
            size={'small'}
            sx={{ borderRadius: 1.5 }}
            onClick={(e) => setAddOptionsMenuAnchorEl(e.currentTarget)}>
            <ArrowDropDownOutlined />
          </Button>
        </ButtonGroup>
        <Menu
          open={Boolean(addOptionsMenuAnchorEl)}
          anchorEl={addOptionsMenuAnchorEl}
          onClose={handleCloseAddOptionsMenu}>
          {addOptions.map((a, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                setAddOption(a)
                handleCloseAddOptionsMenu()
              }}>
              {a.option}
            </MenuItem>
          ))}
        </Menu>

        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Button startIcon={<FilterList />} size={'small'}>
            Filter
          </Button>
          <Button startIcon={<Sort />} size={'small'}>
            Sort
          </Button>
          <Button startIcon={<GroupWorkOutlined />} size={'small'}>
            Group By
          </Button>
          <Button startIcon={<VisibilityOffOutlined />} size={'small'}>
            Hide
          </Button>
        </Stack>
      </Stack>

      <Stack direction={'row'} spacing={3} mt={3} height={800}>
        {sprintId ? <ProjectStages sprintId={sprintId} /> : <ProjectStagesLoader />}
      </Stack>
    </Stack>
  );
}

export default ProjectBoard;