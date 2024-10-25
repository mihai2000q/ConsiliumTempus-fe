import { alpha, Avatar, IconButton, Tooltip, useTheme } from '@mui/material'
import { Person } from '@mui/icons-material'
import UserPopper from '../../../../../../components/popper/UserPopper.tsx'
import { Assignee } from '../../types/ProjectTask.model.ts'
import demoUserPic from '../../../../../../assets/demo-user-pic.jpg'
import SetAssigneeMenu from '../../../../../../components/project-task/menu/SetAssigneeMenu.tsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../state/store.ts'

interface AssigneeIconButtonProps {
  isCompleted: boolean,
  assignee: Assignee | null,
  setAssigneeId?: ((newAssigneeId: string | null) => void) | undefined
}

function AssigneeIconButton({
                              isCompleted,
                              assignee,
                              setAssigneeId
                            }: AssigneeIconButtonProps) {
  const theme = useTheme()
  const workspaceId = useSelector((state: RootState) => state.project.workspaceId)

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  return (
    <>
      {
        assignee === null
          ? (
            <Tooltip title={'Assign this task'} arrow placement={'top'} enterDelay={300}>
              <IconButton
                variant={'dashed'}
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                sx={{
                  transition: theme.transitions.create(['color', 'background-color'], {
                    duration: theme.transitions.duration.shortest
                  }),
                  color: isCompleted ? alpha(theme.palette.text.triadic, 0.5) : theme.palette.text.primary,
                  '&:hover': {
                    color: isCompleted ? alpha(theme.palette.text.triadic, 0.7) : theme.palette.text.primary
                  }
                }}>
                <Person fontSize={'inherit'} />
              </IconButton>
            </Tooltip>
          )
          : (
            <UserPopper user={{ ...assignee }}>
              <Avatar
                src={demoUserPic}
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                sx={{
                  width: 30,
                  height: 30,
                  cursor: 'pointer',
                  transition: theme.transitions.create(['filter'], {
                    duration: theme.transitions.duration.shortest
                  }),
                  '&:hover': {
                    filter: 'brightness(80%)'
                  }
                }} />
            </UserPopper>
          )
      }

      {setAssigneeId && <SetAssigneeMenu
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        workspaceId={workspaceId}
        assigneeId={assignee?.id ?? null}
        setAssigneeId={setAssigneeId} />}
    </>
  )
}

export default AssigneeIconButton
