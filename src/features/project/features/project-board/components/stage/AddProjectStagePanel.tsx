import { useState } from 'react'
import { useAddStageToProjectSprintMutation } from '../../state/projectBoardApi.ts'
import OutlinedInputTextField from '../../../../../../components/textfield/OutlinedInputTextField.tsx'
import StyledProjectStagePanel from './StyledProjectStagePanel.tsx'
import { SxProps } from '@mui/material'

interface AddProjectStagePanelProps {
  sprintId: string,
  closeCard: () => void,
  onTop: boolean,
  show: boolean,
  sx?: SxProps | undefined,
}

function AddProjectStagePanel({
                                sprintId,
                                closeCard,
                                onTop,
                                show,
                                sx
                              }: AddProjectStagePanelProps) {
  const [newStageName, setNewStageName] = useState('')
  const [addStageToProjectSprint] = useAddStageToProjectSprintMutation()

  function handleAddStageToProjectSprint() {
    if (newStageName !== '') {
      addStageToProjectSprint({
        id: sprintId,
        name: newStageName,
        onTop: onTop
      })
      setNewStageName('')
    }
    closeCard()
  }

  return (
    <StyledProjectStagePanel sx={sx}>
      <OutlinedInputTextField
        autoFocus
        refreshFocus={show}
        maxLength={50}
        placeholder={'Enter stage name'}
        value={newStageName}
        onChange={(e) => setNewStageName(e.target.value)}
        onBlurEvent={handleAddStageToProjectSprint} />
    </StyledProjectStagePanel>
  )
}

export default AddProjectStagePanel
