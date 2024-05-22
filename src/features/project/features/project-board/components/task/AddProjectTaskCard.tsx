import { InputBase } from "@mui/material";
import { TaskCard } from "./ProjectTaskCard.tsx";
import { useAddProjectTaskMutation } from "../../state/projectBoardApi.ts";
import { useState } from "react";

interface AddProjectTaskCardProps{
  closeCard: (() => void),
  projectStageId: string,
  onTop: boolean
}

function AddProjectTaskCard({ closeCard, projectStageId, onTop }: AddProjectTaskCardProps) {
  const [name, setName] = useState('')

  const [addProjectTask] = useAddProjectTaskMutation()
  function addNewTask() {
    if (name !== '') {
      addProjectTask({
        projectStageId: projectStageId,
        name: name,
        onTop: onTop
      }).unwrap()
    }
    closeCard()
  }

  function handleBlur() {
    addNewTask()
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function handleOnKeyUp(e) {
    if ((e.key === 'Enter')) handleBlur()
  }

  return (
    <TaskCard
      component={'div'}
      disableRipple
      onBlur={handleBlur}
      onKeyUp={handleOnKeyUp}
      sx={{ padding: 2, boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
        <InputBase
          autoFocus
          fullWidth
          placeholder={'Enter new task name'}
          value={name}
          onChange={(e) => setName(e.target.value)} />
    </TaskCard>
  );
}

export default AddProjectTaskCard;