import {
  Box, Button, CircularProgress, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";
import { useAddWorkspaceMutation } from "../state/sidebarApi.ts";
import { useFormik } from "formik";
import { addWorkspaceDialogFormInitialValues } from "../state/sidebarState.ts";
import { addWorkspaceDialogSchema } from "../state/sidebarValidation.ts";

interface AddWorkspaceDialogProps {
  open: boolean,
  onClose: () => void
}

function AddWorkspaceDialog({ open, onClose }: AddWorkspaceDialogProps) {
  const [addWorkspace, { error, isLoading }] = useAddWorkspaceMutation()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: addWorkspaceDialogFormInitialValues,
    validationSchema: addWorkspaceDialogSchema,
    onSubmit: handleSubmitForm
  })

  async function handleSubmitForm() {
    await addWorkspace({
      name: values.workspaceName
    }).unwrap()
    if (error !== undefined) return
    resetForm()
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle variant={'h4'} mt={1} fontWeight={600}>
        Add Workspace
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              variant="filled"
              name={'workspaceName'}
              label={"Name"}
              placeholder="Enter the workspace name"
              value={values.workspaceName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.workspaceName && !!errors.workspaceName}
              helperText={touched.workspaceName && errors.workspaceName} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box position={'relative'}>
            <Button disabled={isLoading} variant={'contained'} type={"submit"}>
              Add
            </Button>
            {isLoading &&
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

export default AddWorkspaceDialog;