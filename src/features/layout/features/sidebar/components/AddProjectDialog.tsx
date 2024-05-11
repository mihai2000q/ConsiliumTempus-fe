import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { Workspace } from "../types/Workspace.ts";
import { useFormik } from "formik";
import { addProjectDialogSchema } from "../state/sidebarValidation.ts";
import { addProjectDialogFormInitialValues } from "../state/sidebarState.ts";
import { useAddProjectMutation } from "../state/sidebarApi.ts";
import { useEffect } from "react";
import { People } from "@mui/icons-material";
import { HttpError } from "../../../../../types/HttpError.ts";

interface AddProjectDialogProps {
  workspaces: Workspace[] | undefined,
  open: boolean,
  onClose: () => void
}

function AddProjectDialog({ workspaces, open, onClose }: AddProjectDialogProps) {
  const [addProject, addProjectMutation] = useAddProjectMutation()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: addProjectDialogFormInitialValues,
    validationSchema: addProjectDialogSchema,
    onSubmit: handleSubmitForm
  })

  useEffect(() => {
    values.workspaceId = workspaces && workspaces[0].id
  }, [workspaces])

  async function handleSubmitForm() {
    const res = await addProject({
      workspaceId: values.workspaceId,
      name: values.name,
      description: values.description
    }).unwrap()
    if ((res as HttpError).data !== undefined) return
    resetForm()
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle variant={'h5'}>Add Project</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              variant="filled"
              name={'name'}
              label={"Name"}
              placeholder="Enter the project name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name} />
            <TextField
              variant="filled"
              name={'description'}
              label={"Description"}
              placeholder="Enter the project description"
              onBlur={handleBlur}
              value={values.description}
              onChange={handleChange}
              multiline
              rows={8} />
            <FormControl>
              <InputLabel variant={'filled'}>Workspace</InputLabel>
              <Select
                variant="filled"
                name={'workspaceId'}
                value={values.workspaceId}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ '& .MuiListItemIcon-root': { minWidth: 0, mr: 1 } }}
                SelectDisplayProps={{
                  style: { display: 'flex', alignItems: 'center'  },
                }}>
                {
                  workspaces && workspaces?.map((workspace) => (
                    <MenuItem key={workspace.id} value={workspace.id}>
                      <ListItemIcon><People /></ListItemIcon>
                      <ListItemText>{workspace.name}</ListItemText>
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box position={'relative'}>
            <Button disabled={addProjectMutation.isLoading} variant={'contained'} type={"submit"}>
              Add
            </Button>
            {addProjectMutation.isLoading &&
              <CircularProgress
                color={"secondary"}
                thickness={7}
                size={24}
                sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }} />
            }
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddProjectDialog;