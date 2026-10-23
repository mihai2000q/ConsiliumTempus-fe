import StyledProjectTaskCard from '../task/StyledProjectTaskCard.tsx'
import { useAppSelector } from '../../../../../../state/store.ts'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { CheckCircleOutlineRounded, CheckCircleRounded } from '@mui/icons-material'
import AssigneeIconButton from '../task/AssigneeIconButton.tsx'
import StyledCompleteButton from '../task/StyledCompleteButton.tsx'

function DragOverlayProjectTaskCard() {
  const task = useAppSelector(state => state.projectBoard.dragOverlayProjectTask)

  if (!task) return <></>

  return (
    <Box
      sx={{
        position: "relative",
        backdropFilter: 'blur(2px)'
      }}>
      <StyledProjectTaskCard
        component={'div'}
        nativeButton={false}
        isSelected={true}
        isCompleted={task.isCompleted}>
        <Stack sx={{
          width: '100%'
        }}>
          <Typography>
            <IconButton hidden={true} sx={{ height: 15 }} />
            {task.name}
          </Typography>
        </Stack>
      </StyledProjectTaskCard>

      <StyledCompleteButton isCompleted={task.isCompleted} variant={'circular'} size={'small'}>
        {task.isCompleted
          ? <CheckCircleRounded fontSize={'small'} />
          : <CheckCircleOutlineRounded fontSize={'small'} />}
      </StyledCompleteButton>

      <Stack
        direction={'row'}
        sx={{
          position: 'absolute',
          bottom: 0,
          margin: '14px 16px'
        }}>
        <AssigneeIconButton
          isCompleted={task.isCompleted}
          assignee={task.assignee} />
      </Stack>
    </Box>
  )
}

export default DragOverlayProjectTaskCard
