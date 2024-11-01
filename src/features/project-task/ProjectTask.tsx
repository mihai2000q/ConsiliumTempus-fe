import { useParams } from 'react-router-dom'
import { useGetProjectTaskQuery } from './state/projectTaskApi.ts'
import { Stack, Typography } from '@mui/material'
import ProjectTaskParams from './utils/ProjectTaskParams.ts'

function ProjectTask() {
  const params = useParams()
  const id = params[ProjectTaskParams.Id] ?? ''

  const task = useGetProjectTaskQuery({ id: id }).data

  if (!task) return <></>

  return (
    <Stack>
      <Typography>Is Completed: {String(task.isCompleted)}</Typography>
      <Typography variant={'h5'}>{task.name}</Typography>
      <Typography>{task.description}</Typography>
    </Stack>
  )
}

export default ProjectTask
