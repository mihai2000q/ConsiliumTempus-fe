import { useState } from 'react';
import { useAddStageToProjectSprintMutation } from "../../state/projectBoardApi.ts";
import { StagePanel } from "./ProjectStagePanel.tsx";
import OutlinedInputTextField from "../../../../../../components/textfield/OutlinedInputTextField.tsx";

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
        placeholder={'Enter stage name'}
        value={newStageName}
        onChange={setNewStageName}
        onBlur={handleAddStageToProjectSprint} />
    </StagePanel>
  );
}

export default AddProjectStagePanel;