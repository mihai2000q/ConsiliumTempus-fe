import { InputBase } from '@mui/material'
import { useAddProjectTaskMutation } from '../../state/projectBoardApi.ts'
import React, { useEffect, useRef, useState } from 'react'
import StyledProjectTaskCard from './StyledProjectTaskCard.tsx'

interface AddProjectTaskCardProps {
  closeCard: (() => void),
  projectStageId: string,
  onTop: boolean,
  show: boolean,
  mb?: number | undefined,
  mt?: number | undefined,
}

function AddProjectTaskCard({ closeCard, projectStageId, onTop, mb, mt, show }: AddProjectTaskCardProps) {
  const inputRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (show) inputRef.current?.focus()
  }, [show])

  const [name, setName] = useState('')

  const [addProjectTask] = useAddProjectTaskMutation()

  function addNewTask() {
    if (name !== '') {
      addProjectTask({
        projectStageId: projectStageId,
        name: name,
        onTop: onTop
      })
      setName('')
    }
    closeCard()
  }

  function handleBlur() {
    addNewTask()
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if ((e.key === 'Enter')) {
      e.preventDefault()
      inputRef.current?.blur()
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
        inputRef={inputRef}
        fullWidth
        multiline
        maxRows={3}
        inputProps={{ maxLength: 256 }}
        placeholder={'Enter new task name'}
        value={name}
        onChange={(e) => setName(e.target.value)} />
    </StyledProjectTaskCard>
  )
}

export default AddProjectTaskCard
