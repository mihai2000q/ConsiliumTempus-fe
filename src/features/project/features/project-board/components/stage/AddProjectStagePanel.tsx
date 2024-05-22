import { useState } from 'react';
import { useAddStageToProjectSprintMutation } from "../../state/projectBoardApi.ts";
import OutlinedInputTextField from "../../../../../../components/textfield/OutlinedInputTextField.tsx";
import { StagePanel } from "./ProjectStagePanel.tsx";

interface AddProjectStagePanelProps {
  sprintId: string,
  closeCard: () => void,
  onTop: boolean
}

function AddProjectStagePanel({ sprintId, closeCard, onTop }: AddProjectStagePanelProps) {
  const [newStageName, setNewStageName] = useState('')
  const [addStageToProjectSprint] = useAddStageToProjectSprintMutation()
  function handleAddStageToProjectSprint() {
    if (newStageName !== '') {
      addStageToProjectSprint({
        id: sprintId,
        name: newStageName,
        onTop: onTop
      }).unwrap()
    }
    closeCard()
  }

  return (
    <StagePanel boxShadow={4}>
      <OutlinedInputTextField
        autoFocus
        placeholder={'Enter the stage name'}
        value={newStageName}
        onChange={(e) => setNewStageName(e.target.value)}
        onBlur={handleAddStageToProjectSprint}
        onEnter={handleAddStageToProjectSprint} />
    </StagePanel>
  );
}

export default AddProjectStagePanel;