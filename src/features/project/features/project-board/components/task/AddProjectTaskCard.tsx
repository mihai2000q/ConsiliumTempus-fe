import { InputBase } from "@mui/material";
import { useAddProjectTaskMutation } from "../../state/projectBoardApi.ts";
import React, { useState } from "react";
import StyledProjectTaskCard from "../../../../../../components/project-task/StyledProjectTaskCard.tsx";

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
  function handleOnKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if ((e.key === 'Enter')) {
      e.preventDefault()
      addNewTask()
    }
  }

  return (
    <StyledProjectTaskCard
      component={'div'}
      disableRipple
      onBlur={handleBlur}
      onKeyDown={handleOnKeyDown}
      sx={{
        padding: 2,
        mt: mt,
        mb: mb
      }}>
        <InputBase
          autoFocus
          fullWidth
          multiline
          maxRows={3}
          inputProps={{ maxLength: 256 }}
          placeholder={'Enter new task name'}
          value={name}
          onChange={(e) => setName(e.target.value)} />
    </StyledProjectTaskCard>
  );
}

export default AddProjectTaskCard;