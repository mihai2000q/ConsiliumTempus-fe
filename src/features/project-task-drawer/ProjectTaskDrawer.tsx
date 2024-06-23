import { useGetProjectTaskQuery, useUpdateProjectTaskMutation } from "./state/projectTaskDrawerApi.ts";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";
import { closeDrawer } from "../../state/project-task-drawer/projectTaskDrawerSlice.ts";
import { CheckRounded, LinkOutlined, MoreHoriz, SkipNextRounded, VisibilityOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Paths from "../../utils/Paths.ts";
import ProjectTaskDrawerActionsMenu from "./components/ProjectTaskDrawerActionsMenu.tsx";
import useDependencyState from "../../hooks/useDependencyState.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import useDependencyFacadeState from "../../hooks/useDependencyFacadeState.ts";
import { isNoneUserDependencyState } from "../../types/DependencyState.ts";
import OutlinedInputTextField from "../../components/textfield/OutlinedInputTextField.tsx";
import { useNavigate } from "react-router-dom";
import ProjectTaskDrawerLoader from "./components/ProjectTaskDrawerLoader.tsx";
import FormGridItem from "../../components/form/FormGridItem.tsx";
import AssigneeButton from "./components/AssigneeButton.tsx";

interface CompletedButtonProps extends ButtonProps {
  isCompleted: boolean
}

const CompletedButton = styled(Button, {
  shouldForwardProp: (props) => props !== 'isCompleted'
})<CompletedButtonProps>(({ theme, isCompleted }) => ({
  color: theme.palette.background[100],
  borderColor: alpha(theme.palette.background[100], 0.25),
  '&:hover' : {
    borderColor: alpha(theme.palette.success.main, 0.75),
    color: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.1)
  },
  ...(isCompleted && {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.1),
    '&:hover' : {
      borderColor: theme.palette.success.main,
      color: theme.palette.success.main,
      backgroundColor: alpha(theme.palette.success.main, 0.3)
    },
    ...(theme.palette.mode === 'light' && {
      '&:hover' : {
        borderColor: theme.palette.success.light,
        color: theme.palette.background[900],
        backgroundColor: alpha(theme.palette.success.main, 0.75)
      },
    })
  })
}))

function ProjectTaskDrawer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isDrawerOpen = useSelector((state: RootState) => state.projectTaskDrawer.isDrawerOpen)
  const handleCloseDrawer = () => dispatch(closeDrawer())

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const taskId = useSelector((state: RootState) => state.projectTaskDrawer.taskId)

  const { data: task, isFetching, isLoading } = useGetProjectTaskQuery(
    { id: taskId },
    { skip: taskId === '' }
  )

  const [name, refreshName,  facadeName, setFacadeName] =
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
    }).unwrap()

    refreshName()
    refreshDescription()
    refreshIsCompleted()
    refreshAssignee()
  }, [name, description, isCompleted, assigneeId]);

  function handleViewDetails() {
    handleCloseDrawer()
    navigate(`${Paths.ProjectTask}/${taskId}`)
  }
  function handleCopyTaskLink() {
    navigator.clipboard.writeText(`${window.location.host}${Paths.ProjectTask}/${taskId}`).then()
  }

  return (
    <Drawer
      anchor={'right'}
      open={isDrawerOpen}
      onClose={handleCloseDrawer}
      sx={{
        width: 600,
        '& .MuiDrawer-paper': { width: 600, },
      }}>
      {
        !task || isLoading
          ? <ProjectTaskDrawerLoader />
          : (
            <Stack mt={1}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mx={2} mb={1}>
                <CompletedButton
                  variant={'alt-outlined'}
                  startIcon={<CheckRounded />}
                  isCompleted={isCompleted.value}
                  onClick={() => setIsCompleted(!isCompleted.value, true)}>
                  {isCompleted.value ? 'Completed' : 'Mark Complete'}
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
                    <IconButton onClick={handleCloseDrawer}>
                      <SkipNextRounded />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              <Divider sx={{ mb: 1 }}/>

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
                    label={<Typography>Assignee</Typography>}>
                    <AssigneeButton
                      isFetching={isFetching}
                      workspaceId={task.workspace.id}
                      assignee={task.assignee}
                      assigneeId={assigneeId}
                      setAssigneeId={setAssigneeId} />
                  </FormGridItem>
                </Grid>

                <Stack spacing={1} pt={1.5}>
                  <Typography>Description</Typography>
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
  );
}

export default ProjectTaskDrawer;