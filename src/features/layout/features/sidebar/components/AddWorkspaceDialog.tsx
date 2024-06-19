import {
  Dialog,
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
import LoadingButton from "../../../../../components/button/LoadingButton.tsx";

interface AddWorkspaceDialogProps {
  open: boolean,
  onClose: () => void
}

function AddWorkspaceDialog({ open, onClose }: AddWorkspaceDialogProps) {
  const [addWorkspace, { isError, isLoading }] = useAddWorkspaceMutation()

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
    if (isError) return
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
          <LoadingButton isLoading={isLoading} variant={'contained'} type={"submit"}>
            Add
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddWorkspaceDialog;