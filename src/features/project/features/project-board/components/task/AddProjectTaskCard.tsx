import { InputBase } from "@mui/material";
import { StyledProjectTaskCard } from "./ProjectTaskCard.tsx";
import { useAddProjectTaskMutation } from "../../state/projectBoardApi.ts";
import { useState } from "react";

interface AddProjectTaskCardProps{
  closeCard: (() => void),
  projectStageId: string,
  onTop: boolean,
  mb?: number | undefined,
  mt?: number | undefined,
}

function AddProjectTaskCard({ closeCard, projectStageId, onTop, mb, mt }: AddProjectTaskCardProps) {
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
    if ((e.key === 'Enter')) addNewTask()
  }

  return (
    <StyledProjectTaskCard
      component={'div'}
      disableRipple
      onBlur={handleBlur}
      onKeyUp={handleOnKeyUp}
      sx={{
        padding: 2,
        boxShadow: 2,
        '&:hover': { boxShadow: 4 },
        mt: mt,
        mb: mb
      }}>
        <InputBase
          autoFocus
          fullWidth
          placeholder={'Enter new task name'}
          value={name}
          onChange={(e) => setName(e.target.value)} />
    </StyledProjectTaskCard>
  );
}

export default AddProjectTaskCard;