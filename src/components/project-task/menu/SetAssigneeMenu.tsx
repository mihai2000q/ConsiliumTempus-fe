import {
  Autocomplete,
  Avatar,
  Button,
  FormLabel,
  lighten,
  Menu,
  MenuItem,
  Popper,
  PopperProps,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material'
import demoUserPic from '../../../assets/demo-user-pic.jpg'
import { useEffect, useState } from 'react'
import Collaborator from '../../../features/project-task-drawer/types/Collaborator.model.ts'
import { useGetCollaboratorsQuery } from '../../../features/project-task-drawer/state/projectTaskDrawerApi.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store.ts'

const StyledPopper = styled(Popper)<PopperProps>(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: lighten(theme.palette.background.default, 0.03),
    backgroundImage: 'unset',
    width: 400
  }
}))

interface SetAssigneeMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  workspaceId: string,
  assigneeId: string | null,
  setAssigneeId: (newAssigneeId: string | null) => void
}

function SetAssigneeMenu({
                           anchorEl,
                           onClose,
                           workspaceId,
                           assigneeId,
                           setAssigneeId
                         }: SetAssigneeMenuProps) {
  const currentUserId = useSelector((state: RootState) => state.global.userId)

  const [searchValue, setSearchValue] = useState('')
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null)

  const { data } = useGetCollaboratorsQuery({
    workspaceId,
    searchValue: searchValue
  }, { skip: anchorEl === null })
  const collaborators = data?.collaborators
  useEffect(() => {
    if (collaborators && assigneeId) {
      setCollaborator(collaborators.find(({ id }) => id === assigneeId) ?? null)
    }
  }, [collaborators, assigneeId])

  function handleAssignMe() {
    setAssigneeId(currentUserId ?? null)
    onClose()
  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <Stack spacing={0.5} px={2} py={1}>
        <FormLabel>Assignee</FormLabel>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Autocomplete
            value={collaborator}
            onChange={(_e, newValue) => {
              setAssigneeId(newValue?.id ?? null)
              onClose()
            }}
            inputValue={searchValue}
            onKeyDown={(e) => e.stopPropagation()}
            onInputChange={(_e, newValue) => setSearchValue(newValue)}
            options={collaborators ?? []}
            noOptionsText={'No collaborators found'}
            getOptionLabel={(c) => c.name}
            filterOptions={(options) => options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            PopperComponent={(props) =>
              <StyledPopper {...props} />
            }
            renderOption={(props, option, { selected }) => (
              <MenuItem {...props} key={option.id} selected={selected}>
                <Stack direction={'row'} alignItems={'center'}>
                  <Avatar src={demoUserPic} sx={{ width: 25, height: 25, mr: 1 }} />
                  <Typography mr={2}>{option.name}</Typography>
                  <Typography variant={'subtitle1'} color={'text.secondary'}>{option.email}</Typography>
                </Stack>
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField {...params} placeholder={'Search Collaborator'} />
            )}
            sx={{
              width: 230,
              '& .MuiInputBase-root': {
                borderRadius: 2,
                py: '5px'
              }
            }}
          />

          {assigneeId === null && <>
            <Typography>or</Typography>
            <Button variant={'alt-outlined'} onClick={handleAssignMe}>
              Assign Me
            </Button>
          </>}
        </Stack>
      </Stack>
    </Menu>
  )
}

export default SetAssigneeMenu
