import { useState } from 'react';
import { useAddStageToProjectSprintMutation } from "../../state/projectBoardApi.ts";
import { alpha, Stack, useTheme } from "@mui/material";
import OutlinedInputTextField from "../../../../../../components/textfield/OutlinedInputTextField.tsx";

interface AddProjectStagePanelProps {
  sprintId: string,
  closeCard: () => void,
  onTop: boolean
}

function AddProjectStagePanel({ sprintId, closeCard, onTop }: AddProjectStagePanelProps) {
  const theme = useTheme()

  const [newStageName, setNewStageName] = useState('')
  const [addStageToProjectSprint] = useAddStageToProjectSprintMutation()
  function handleAddStageToProjectSprint() {
    console.log(newStageName)
    if (newStageName !== '') {
      addStageToProjectSprint({
        id: sprintId,
        name: newStageName,
        onTop: onTop
      }).unwrap()
      console.log('stage added')
    }
    closeCard()
  }

  return (
    <Stack
      height={'100%'}
      width={335}
      borderRadius={4}
      p={1.5}
      bgcolor={alpha(theme.palette.primary[800], 0.25)}
      boxShadow={4}>
      <OutlinedInputTextField
        autoFocus
        value={newStageName}
        onChange={(e) => setNewStageName(e.target.value)}
        onBlur={handleAddStageToProjectSprint}
        onEnter={handleAddStageToProjectSprint} />
    </Stack>
  );
}

export default AddProjectStagePanel;