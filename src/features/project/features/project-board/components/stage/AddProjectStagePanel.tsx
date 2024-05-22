import { useState } from 'react';
import { useAddStageToProjectSprintMutation } from "../../state/projectBoardApi.ts";
import OutlinedContentEditable from "../../../../../../components/textfield/OutlinedContentEditable.tsx";
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
      <OutlinedContentEditable
        autoFocus
        typographyVariant={'h6'}
        value={newStageName}
        handleChange={setNewStageName}
        onBlur={handleAddStageToProjectSprint} />
    </StagePanel>
  );
}

export default AddProjectStagePanel;