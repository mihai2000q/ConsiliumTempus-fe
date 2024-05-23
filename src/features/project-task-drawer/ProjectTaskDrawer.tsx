import {
  useLazyGetProjectTaskQuery,
  useUpdateProjectTaskMutation
} from "./state/projectTaskDrawerApi.ts";
import { alpha, Button, Divider, Drawer, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";
import { closeDrawer } from "../../state/project-task-drawer/projectTaskDrawerSlice.ts";
import { CheckRounded, LinkOutlined, MoreHoriz, SkipNextRounded } from "@mui/icons-material";
import { useState } from "react";
import Paths from "../../utils/Paths.ts";
import ProjectTaskDrawerActionsMenu from "./components/ProjectTaskDrawerActionsMenu.tsx";
import ProjectTask from "./types/ProjectTask.model.ts";
import useDependencyState from "../../hooks/useDependencyState.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import useDependencyFacadeState from "../../hooks/useDependencyFacadeState.ts";
import { isNoneUserDependencyState } from "../../types/DependencyState.ts";
import OutlinedInputTextField from "../../components/textfield/OutlinedInputTextField.tsx";

function ProjectTaskDrawer() {
  const theme = useTheme()
  const dispatch = useDispatch()

  const isDrawerOpen = useSelector((state: RootState) => state.projectTaskDrawer.isDrawerOpen)
  const handleCloseDrawer = () => dispatch(closeDrawer())

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const taskId = useSelector((state: RootState) => state.projectTaskDrawer.taskId)
  const [task, setTask] = useState<ProjectTask | undefined>(undefined)
  const [getProjectTask] = useLazyGetProjectTaskQuery()
  useUpdateEffect(() => {
    if (taskId !== '') getProjectTask({ id: taskId }).unwrap().then(setTask)
  }, [taskId]);

  const [name, refreshName,  facadeName, setFacadeName] = useDependencyFacadeState('')
  const [description, refreshDescription, facadeDescription, setFacadeDescription] = useDependencyFacadeState('')
  const [isCompleted, setIsCompleted, refreshIsCompleted] = useDependencyState(false)
  useUpdateEffect(() => {
    setFacadeName(task?.name ?? '')
    setFacadeDescription(task?.description ?? '')
    setIsCompleted(task?.isCompleted ?? false)
  }, [task])
  
  const [updateProjectTask] = useUpdateProjectTaskMutation()
  useUpdateEffect(() => {
    if (name.value === '' || isNoneUserDependencyState([name, description, isCompleted])) return

    updateProjectTask({
      id: taskId,
      name: name.value,
      description: description.value,
      assigneeId: null
    }).unwrap()

    refreshName()
    refreshDescription()
    refreshIsCompleted()
  }, [name, description, isCompleted]);

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
        '& .MuiDrawer-paper': {
          width: 600,
          boxSizing: 'border-box',
        },
      }}>
      {
        task &&
        <Stack mt={1}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mx={2} mb={0.5}>
            <Button
              startIcon={<CheckRounded />}
              onClick={() => setIsCompleted(!isCompleted.value, true)}
              sx={{
                color: isCompleted.value ? theme.palette.success.light : theme.palette.background[100],
                '&:hover' : {
                  color: isCompleted.value ? theme.palette.success.main : theme.palette.success.light,
                  background: alpha(theme.palette.success.main, 0.1)
                }
              }}>
              {isCompleted.value ? 'Completed' : 'Mark Complete'}
            </Button>

            <Stack direction={'row'} spacing={1}>
              <IconButton onClick={handleCopyTaskLink}>
                <LinkOutlined />
              </IconButton>
              <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                <MoreHoriz />
              </IconButton>
              <IconButton onClick={handleCloseDrawer}>
                <SkipNextRounded />
              </IconButton>
            </Stack>
          </Stack>
          <Divider sx={{ mb: 1 }}/>

          <Stack mx={2} spacing={2}>
            <OutlinedInputTextField
              fullWidth
              multiline
              isTitle
              error={facadeName === ''}
              placeholder={'Enter a name'}
              value={facadeName}
              onChange={(e) => setFacadeName(e, true)} />

            <Stack spacing={1}>
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
      }
      <ProjectTaskDrawerActionsMenu taskId={taskId} anchorEl={menuAnchorEl} setAnchorEl={setMenuAnchorEl} />
    </Drawer>
  );
}

export default ProjectTaskDrawer;