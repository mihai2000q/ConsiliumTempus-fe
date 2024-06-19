import { Button, Dialog, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import VerticalLargeRadioButton from "../../../../components/button/radio/VerticalLargeRadioButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store.ts";
import useAdapterState from "../../../../hooks/useAdapterState.ts";
import { useEffect, useState } from "react";
import { closeProjectSprintsDialog, openAddProjectSprintDialog } from "../../../../state/project/projectSlice.ts";
import ProjectSprintsDialogLoader from "./components/ProjectSprintsDialogLoader.tsx";
import { useGetProjectSprintsQuery } from "./state/projectSprintsDialogApi.ts";
import ProjectSprintsAdapter from "./adapters/ProjectSprints.adapter.ts";
import ProjectSprint from "./components/ProjectSprint.tsx";

function ProjectSprintsDialog() {
  const { open } = useSelector((state: RootState) => state.project.projectSprintsDialog)

  const projectId = useSelector((state: RootState) => state.project.projectId)
  const projectName = useSelector((state: RootState) => state.project.projectName)

  const dispatch = useDispatch<AppDispatch>()

  const { data } = useGetProjectSprintsQuery(
    { projectId: projectId },
    { skip: projectId === '' }
  )
  const sprints = useAdapterState(data?.sprints, ProjectSprintsAdapter.adapt)

  const [projectSprintIdSelected, setProjectSprintIdSelected] = useState<string>('')
  useEffect(() => {
    if (sprints) setProjectSprintIdSelected(sprints[0].id)
  }, [sprints]);

  const handleClose = () => dispatch(closeProjectSprintsDialog())
  const handleAddNewSprint = () => {
    dispatch(openAddProjectSprintDialog({
      open: true
    }))
  }

  function handleSprintClick(sprintId: string) {
    setProjectSprintIdSelected(sprintId)
  }

  if (!data) {
    return <ProjectSprintsDialogLoader open={open} onClose={handleClose} />
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth={'md'}>
      <Stack height={720} sx={{ overflowY: 'hidden' }}>
        <Stack direction={'row'} alignItems={'center'} px={3} py={2} spacing={2}>
          <Stack flexGrow={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
              <Typography variant={'h5'} fontSize={20} fontWeight={500}>Sprints of</Typography>
              <Typography variant={'h5'} fontSize={20} fontWeight={600}>{projectName}</Typography>
            </Stack>
            <Typography variant={'subtitle2'} fontWeight={400} color={'text.secondary'}>
              {data.totalCount} sprint{data.totalCount > 1 ? 's' : ''}
            </Typography>
          </Stack>

          <Button variant={'alt-outlined'} onClick={handleAddNewSprint}>
            Add New Sprint
          </Button>

          <IconButton variant={'circular'} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />

        <Stack direction={'row'} flexGrow={1} sx={{ overflowY: 'hidden' }}>
          <Stack minWidth={280} sx={{ overflowY: 'auto' }}>
            {sprints?.map((sprint) => (
              <div key={sprint.id}>
                <VerticalLargeRadioButton
                  isSelected={sprint.id === projectSprintIdSelected}
                  onClick={() => handleSprintClick(sprint.id)}>
                  <Stack alignItems="start" spacing={0.5}>
                    <Stack
                      direction={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      spacing={1}
                      width={240}>
                      <Typography variant={'body1'} fontWeight={400} fontSize={16} noWrap>{sprint.name}</Typography>
                      <Typography>{sprint.createdDateTime.format('DD/MM/YYYY')}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={'4px'}>
                      <Typography variant={'body2'}>{sprint.startDate?.format('DD/MM/YYYY') ?? '?'}</Typography>
                      <Typography variant={'body2'}>-</Typography>
                      <Typography variant={'body2'}>{sprint.endDate?.format('DD/MM/YYYY') ?? '?'}</Typography>
                    </Stack>
                  </Stack>
                </VerticalLargeRadioButton>
                <Divider />
              </div>
            ))}
          </Stack>
          <Divider orientation={"vertical"} />

          <ProjectSprint sprintId={projectSprintIdSelected} />
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default ProjectSprintsDialog;