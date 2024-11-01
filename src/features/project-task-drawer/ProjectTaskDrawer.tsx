import { useGetProjectTaskQuery, useUpdateProjectTaskMutation } from './state/projectTaskDrawerApi.ts'
import {
  alpha,
  Button,
  ButtonProps,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { CheckRounded, LinkOutlined, MoreHoriz, SkipNextRounded, VisibilityOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import Paths from '../../utils/enums/Paths.ts'
import ProjectTaskDrawerActionsMenu from './components/ProjectTaskDrawerActionsMenu.tsx'
import useDependencyState from '../../hooks/useDependencyState.ts'
import useUpdateEffect from '../../hooks/useUpdateEffect.ts'
import useDependencyFacadeState from '../../hooks/useDependencyFacadeState.ts'
import { isNoneUserDependencyState } from '../../types/DependencyState.ts'
import OutlinedInputTextField from '../../components/textfield/OutlinedInputTextField.tsx'
import { useNavigate } from 'react-router-dom'
import ProjectTaskDrawerLoader from './components/ProjectTaskDrawerLoader.tsx'
import FormGridItem from '../../components/form/FormGridItem.tsx'
import AssigneeButton from './components/AssigneeButton.tsx'
import RichTooltip from '../../components/tooltip/RichTooltip.tsx'

interface CompletedButtonProps extends ButtonProps {
  isCompleted: boolean
}

const CompletedButton = styled(Button, {
  shouldForwardProp: (props) => props !== 'isCompleted'
})<CompletedButtonProps>(({ theme, isCompleted }) => ({
  padding: '6px 9px 6px 9px',
  '& .MuiTypography-root': {
    fontWeight: 400,
    fontSize: 12,
    paddingTop: '2px',
    fontFamily: '"Roboto", sans-serif'
  },
  color: theme.palette.background[100],
  borderColor: alpha(theme.palette.background[100], 0.25),
  '&:hover': {
    borderColor: alpha(theme.palette.success.main, 0.75),
    color: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.1)
  },
  ...(isCompleted && {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.1),
    '&:hover': {
      borderColor: theme.palette.success.main,
      color: theme.palette.success.main,
      backgroundColor: alpha(theme.palette.success.main, 0.3)
    },
    ...(theme.palette.mode === 'light' && {
      '&:hover': {
        borderColor: theme.palette.success.light,
        color: theme.palette.background[900],
        backgroundColor: alpha(theme.palette.success.main, 0.75)
      }
    })
  })
}))

interface ProjectTaskDrawerProps {
  isDrawerOpen: boolean,
  onClose: () => void,
  taskId: string
}

function ProjectTaskDrawer({ isDrawerOpen, onClose, taskId }: ProjectTaskDrawerProps) {
  const navigate = useNavigate()

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const { data: task, isFetching } = useGetProjectTaskQuery(
    { id: taskId },
    { skip: !isDrawerOpen }
  )

  const [name, refreshName, facadeName, setFacadeName] =
    useDependencyFacadeState(task?.name ?? '')
  const [description, refreshDescription, facadeDescription, setFacadeDescription] =
    useDependencyFacadeState(task?.description ?? '')
  const [isCompleted, setIsCompleted, refreshIsCompleted] =
    useDependencyState(task?.isCompleted ?? false)
  const [assigneeId, setAssigneeId, refreshAssignee] =
    useDependencyState<string | null>(task?.assignee?.id ?? null)

  useEffect(() => {
    if (!task) return

    setFacadeName(task.name)
    setFacadeDescription(task.description)
    setIsCompleted(task.isCompleted)
    setAssigneeId(task.assignee?.id ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]) // TODO: Referential Equality

  const [updateProjectTask] = useUpdateProjectTaskMutation()
  useUpdateEffect(() => {
    if (name.value === '' || isNoneUserDependencyState([name, description, isCompleted, assigneeId])) return

    updateProjectTask({
      id: taskId,
      name: name.value,
      description: description.value,
      isCompleted: isCompleted.value,
      assigneeId: assigneeId.value
    })

    refreshName()
    refreshDescription()
    refreshIsCompleted()
    refreshAssignee()
  }, [name, description, isCompleted, assigneeId])

  function handleViewDetails() {
    onClose()
    navigate(`${Paths.ProjectTask}/${taskId}`)
  }

  function handleCopyTaskLink() {
    navigator.clipboard.writeText(`${window.location.host}${Paths.ProjectTask}/${taskId}`).then()
  }

  return (
    <Drawer
      anchor={'right'}
      open={isDrawerOpen}
      onClose={onClose}
      sx={{
        width: 600,
        '& .MuiDrawer-paper': { width: 600 }
      }}>
      {
        !task
          ? <ProjectTaskDrawerLoader />
          : (
            <Stack mt={1}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mx={2} mb={1}>
                <CompletedButton
                  variant={'alt-outlined'}
                  size={'small'}
                  startIcon={<CheckRounded />}
                  isCompleted={isCompleted.value}
                  onClick={() => setIsCompleted(!isCompleted.value, true)}>
                  <Typography>{isCompleted.value ? 'Completed' : 'Mark Complete'}</Typography>
                </CompletedButton>

                <Stack direction={'row'} spacing={1}>
                  <Tooltip title={'View More Details'} arrow placement={'bottom'} enterDelay={400}>
                    <IconButton onClick={handleViewDetails}>
                      <VisibilityOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Copy task Link'} arrow placement={'bottom'} enterDelay={400}>
                    <IconButton onClick={handleCopyTaskLink}>
                      <LinkOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'More'} arrow placement={'bottom'} enterDelay={400}>
                    <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                      <MoreHoriz />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Close Drawer'} arrow placement={'bottom'} enterDelay={400}>
                    <IconButton onClick={onClose}>
                      <SkipNextRounded />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              <Divider sx={{ mb: 1 }} />

              <Stack mx={2} spacing={0.5}>
                <OutlinedInputTextField
                  fullWidth
                  multiline
                  isTitle
                  maxLength={256}
                  error={facadeName === '' && name.isUser}
                  placeholder={'Enter a name'}
                  value={facadeName}
                  onChange={(e) => setFacadeName(e.target.value, true)} />

                <Grid container rowSpacing={1}>
                  <FormGridItem
                    labelSize={3}
                    label={
                      <RichTooltip title={'Assignee'} description={'Add the person who should complete the task.'}>
                        <Typography>Assignee</Typography>
                      </RichTooltip>
                    }>
                    <AssigneeButton
                      isFetching={isFetching}
                      workspaceId={task.workspace.id}
                      assignee={task.assignee}
                      assigneeId={assigneeId}
                      setAssigneeId={setAssigneeId} />
                  </FormGridItem>
                </Grid>

                <Stack spacing={1} pt={1.5} alignItems={'start'}>
                  <RichTooltip title={'Description'} description={'Write a few things about the task.'}>
                    <Typography>Description</Typography>
                  </RichTooltip>
                  <TextField
                    fullWidth
                    multiline
                    placeholder={'Enter a description'}
                    value={facadeDescription}
                    onChange={(e) => setFacadeDescription(e.target.value, true)}
                    minRows={5} />
                </Stack>
              </Stack>
            </Stack>
          )
      }

      <ProjectTaskDrawerActionsMenu
        taskId={taskId}
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)} />
    </Drawer>
  )
}

export default ProjectTaskDrawer
