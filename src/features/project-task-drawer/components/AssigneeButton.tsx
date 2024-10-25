import { useState } from 'react'
import { Close, PersonOutlineRounded } from '@mui/icons-material'
import { Avatar, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import SetAssigneeMenu from '../../../components/project-task/menu/SetAssigneeMenu.tsx'
import { Assignee } from '../types/ProjectTask.model.ts'
import DependencyState from '../../../types/DependencyState.ts'
import demoUsePic from './../../../assets/demo-user-pic.jpg'
import UserPopper from '../../../components/popper/UserPopper.tsx'

interface SetAssigneeButtonProps {
  isFetching: boolean,
  workspaceId: string,
  assignee: Assignee | null,
  assigneeId: DependencyState<string | null>,
  setAssigneeId: (newValue: string | null, isUser?: boolean | undefined) => void
}

function AssigneeButton({
                          isFetching,
                          workspaceId,
                          assignee,
                          assigneeId,
                          setAssigneeId
                        }: SetAssigneeButtonProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  return (
    <>
      {
        assignee === null
          ? (
            <Button
              variant={'alt-text'}
              size={'small'}
              startIcon={<PersonOutlineRounded sx={{ mr: '2px' }} />}
              disabled={isFetching}
              onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
              Set Assignee
            </Button>
          )
          : (
            <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
              <UserPopper user={{ ...assignee }} placement={'bottom'}>
                <Button
                  disabled={isFetching}
                  onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                  sx={{ borderRadius: 2 }}>
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <Avatar src={demoUsePic} sx={{ width: 30, height: 30 }} />
                    <Typography color={'text.primary'}>{assignee.name}</Typography>
                  </Stack>
                </Button>
              </UserPopper>

              <Tooltip arrow placement={'top'} title={'Remove assignee'} enterDelay={500}>
                <IconButton size={'small'} onClick={() => setAssigneeId(null, true)}>
                  <Close />
                </IconButton>
              </Tooltip>
            </Stack>
          )
      }

      <SetAssigneeMenu
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        workspaceId={workspaceId}
        assigneeId={assigneeId.value}
        setAssigneeId={(newAssigneeId) => setAssigneeId(newAssigneeId, true)} />
    </>
  )
}

export default AssigneeButton
