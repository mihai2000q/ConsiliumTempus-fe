import { Stack, TextField, Typography } from "@mui/material";
import { useGetProjectOverviewQuery, useUpdateProjectOverviewMutation } from "./state/projectOverviewApi.ts";
import { useState } from "react";
import useDependencyOnceEffect from "../../../../hooks/useDependencyOnceEffect.ts";
import useTimeoutCallbackSkipOnce from "../../../../hooks/useTimeoutCallbackSkipOnce.ts";

interface ProjectOverviewProps {
  projectId: string
}

function ProjectOverview({ projectId }: ProjectOverviewProps) {
  const projectOverview = useGetProjectOverviewQuery({ id: projectId }).data

  const [description, setDescription] = useState('')
  useDependencyOnceEffect(
    () => setDescription(projectOverview!.description),
    projectOverview
  )

  const [updateProjectOverview] = useUpdateProjectOverviewMutation()
  const handleUpdateProjectOverview = ({ newDescription = description }) => {
    updateProjectOverview({
      id: projectId,
      description: newDescription
    })
    console.log('just updated')
  }
  useTimeoutCallbackSkipOnce(
    () => handleUpdateProjectOverview({}),
    [description]
  )

  if (!projectOverview) return <></>

  return (
    <Stack alignItems="start" mt={4} ml={2} spacing={1}>
      <Typography variant={'h6'}>Description</Typography>
      <TextField
        placeholder={'Enter a description'}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        minRows={5}
        sx={{
          width: 500
        }}/>
    </Stack>
  );
}

export default ProjectOverview;