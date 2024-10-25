import useDependencyFacadeState from '../../../../hooks/useDependencyFacadeState.ts'
import { useEffect } from 'react'
import useUpdateEffect from '../../../../hooks/useUpdateEffect.ts'
import { isNoneUserDependencyState } from '../../../../types/DependencyState.ts'
import { Stack, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../state/store.ts'
import { useGetWorkspaceOverviewQuery, useUpdateWorkspaceOverviewMutation } from './state/workspaceOverviewApi.ts'

function WorkspaceOverview() {
  const workspaceId = useSelector((state: RootState) => state.workspace.workspaceId)

  const workspaceOverview = useGetWorkspaceOverviewQuery({ id: workspaceId }).data

  const [description, refreshDescription, facadeDescription, setFacadeDescription] =
    useDependencyFacadeState('')
  useEffect(() => {
    setFacadeDescription(workspaceOverview?.description ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceOverview]) // TODO: Referential Equality

  const [updateWorkspaceOverview] = useUpdateWorkspaceOverviewMutation()
  useUpdateEffect(() => {
    if (isNoneUserDependencyState([description])) return

    updateWorkspaceOverview({
      id: workspaceId,
      description: description.value
    })

    refreshDescription()
  }, [description])

  if (!workspaceOverview) return <></>

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

export default WorkspaceOverview
