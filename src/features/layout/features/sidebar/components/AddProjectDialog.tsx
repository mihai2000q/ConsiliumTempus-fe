import {
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
} from '@mui/material'
import Workspace from '../types/Workspace.model.ts'
import { useFormik } from 'formik'
import { addProjectDialogSchema } from '../state/sidebarValidation.ts'
import { addProjectDialogFormInitialValues } from '../state/sidebarState.ts'
import { useAddProjectMutation } from '../state/sidebarApi.ts'
import { People } from '@mui/icons-material'
import { useEffect } from 'react'
import LoadingButton from '../../../../../components/button/LoadingButton.tsx'
import { useSnackbar } from 'notistack'

interface AddProjectDialogProps {
  workspaces: Workspace[] | undefined,
  open: boolean,
  onClose: () => void
}

function AddProjectDialog({ workspaces, open, onClose }: AddProjectDialogProps) {
  const [addProject, { isLoading }] = useAddProjectMutation()

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
    if (values.workspaceId === undefined) values.workspaceId = workspaces && workspaces[0].id
  }, [values, workspaces])

  const { enqueueSnackbar } = useSnackbar()

  async function handleSubmitForm() {
    await addProject({
      workspaceId: values.workspaceId!,
      name: values.projectName
    }).unwrap()
    enqueueSnackbar('Project created successfully!')
    resetForm()
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle variant={'h4'} mt={1} fontWeight={600}>
        Add Project
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              variant="filled"
              name={'projectName'}
              label={'Name'}
              placeholder="Enter the project name"
              value={values.projectName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.projectName && !!errors.projectName}
              helperText={touched.projectName && errors.projectName} />
            <FormControl>
              <InputLabel variant={'filled'}>Workspace</InputLabel>
              <Select
                variant="filled"
                name={'workspaceId'}
                value={values.workspaceId ?? ''}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ '& .MuiListItemIcon-root': { mr: 1 } }}
                SelectDisplayProps={{
                  style: { display: 'flex', alignItems: 'center' }
                }}>
                {
                  workspaces?.map((workspace) => (
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
          <LoadingButton isLoading={isLoading} variant={'contained'} type={'submit'}>
            Add
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddProjectDialog
