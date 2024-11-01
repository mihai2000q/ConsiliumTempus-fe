import { Stack, TextField, Typography } from '@mui/material'
import { useGetProjectOverviewQuery, useUpdateProjectOverviewMutation } from './state/projectOverviewApi.ts'
import useDependencyFacadeState from '../../../../hooks/useDependencyFacadeState.ts'
import useUpdateEffect from '../../../../hooks/useUpdateEffect.ts'
import { isNoneUserDependencyState } from '../../../../types/DependencyState.ts'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../state/store.ts'

function ProjectOverview() {
  const projectId = useSelector((state: RootState) => state.project.projectId)

  const projectOverview = useGetProjectOverviewQuery({ id: projectId }).data

  const [description, refreshDescription, facadeDescription, setFacadeDescription] = useDependencyFacadeState('')
  useEffect(() => {
    setFacadeDescription(projectOverview?.description ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectOverview]) // TODO: Referential Equality

  const [updateProjectOverview] = useUpdateProjectOverviewMutation()
  useUpdateEffect(() => {
    if (isNoneUserDependencyState([description])) return

    updateProjectOverview({
      id: projectId,
      description: description.value
    })

    refreshDescription()
  }, [description])

  if (!projectOverview) return <></>

  return (
    <Stack alignItems="start" mt={4} ml={2} spacing={1}>
      <Typography variant={'h6'}>Description</Typography>
      <TextField
        placeholder={'Enter a description'}
        value={facadeDescription}
        onChange={(e) => setFacadeDescription(e.target.value, true)}
        multiline
        minRows={5}
        sx={{
          width: 500
        }} />
    </Stack>
  )
}

export default ProjectOverview
