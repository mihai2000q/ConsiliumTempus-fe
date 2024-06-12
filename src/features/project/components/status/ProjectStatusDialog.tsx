import ProjectStatusType from "../../types/ProjectStatusType.ts";
import {
  AppBar, Breadcrumbs,
  Button, Collapse,
  Dialog,
  DialogContent, FormControl, FormHelperText,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  Link, useTheme
} from "@mui/material";
import { useAddStatusToProjectMutation, useUpdateStatusFromProjectMutation } from "../../state/projectApi.ts";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { projectStatusDialogSchema } from "../../state/projectValidation.ts";
import { projectStatusDialogFormInitialValues } from "../../state/projectState.ts";
import { projectStatuses } from "../../data/ProjectStatuses.ts";
import ProjectStatusLabel from "./ProjectStatusLabel.tsx";
import { useEffect, useState } from "react";
import OutlinedInputTextField from "../../../../components/textfield/OutlinedInputTextField.tsx";
import ProjectStatus from "../../types/ProjectStatus.model.ts";
import Paths from "../../../../utils/Paths.ts";

interface AddProjectStatusDialogProps {
  open: boolean,
  onClose: () => void,
  projectId: string,
  projectName: string,
  initialStatus?: ProjectStatusType | undefined,
  initialProjectStatus?: ProjectStatus | undefined
}

function ProjectStatusDialog({
  open,
  onClose,
  projectId,
  projectName,
  initialStatus,
  initialProjectStatus
}: AddProjectStatusDialogProps) {
  const placeholder = "Status Update"

  const theme = useTheme()

  const [addStatusToProject, {
    isLoading: addIsLoading,
    isError: addIsError
  }] = useAddStatusToProjectMutation()
  const [updateStatusFromProject, {
    isLoading: updateIsLoading,
    isError: updateIsError
  }] = useUpdateStatusFromProjectMutation()

  const [statusType, setStatusType] = useState<ProjectStatusType>('OnTrack')

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: projectStatusDialogFormInitialValues,
    validationSchema: projectStatusDialogSchema,
    onSubmit: handleSubmitForm
  })
  useEffect(() => {
    if (initialStatus) setStatusType(initialStatus)
  }, [initialStatus]);
  useEffect(() => {
    if (initialProjectStatus === undefined) return
    values.projectStatusTitle = initialProjectStatus.title
    setStatusType(initialProjectStatus.status)
    values.projectStatusDescription = initialProjectStatus.description
  }, [initialProjectStatus]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const handleCloseMenu = () => setMenuAnchorEl(null)
  const handleMenuItemClick = (status: ProjectStatusType) => {
    setStatusType(status)
    handleCloseMenu()
  }

  async function handleSubmitForm() {
    const res = initialProjectStatus ? await updateStatus() : await addStatus()
    if (res === null) return
    onClose()
  }
  async function addStatus() {
    await addStatusToProject({
      id: projectId,
      title: values.projectStatusTitle === '' ? placeholder : values.projectStatusTitle,
      status: statusType,
      description: values.projectStatusDescription
    })
    if (addIsError) return null
    resetForm()
    return ''
  }
  async function updateStatus() {
    await updateStatusFromProject({
      id: projectId,
      statusId: initialProjectStatus!.id,
      title: values.projectStatusTitle === '' ? placeholder : values.projectStatusTitle,
      status: statusType,
      description: values.projectStatusDescription
    })
    if (updateIsError) return null
    return ''
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <AppBar position={'relative'}>
          <Toolbar>
            <IconButton variant={'circular'} size={'medium'} onClick={onClose}>
              <Close />
            </IconButton>

            <Breadcrumbs separator={'›'} sx={{ flexGrow: 1, ml: 2 }}>
              <Link
                href={`${Paths.Project}/${projectId}`}
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: theme.palette.background[300],
                  }
                }}>
                {projectName}
              </Link>
              <Typography color={theme.palette.background[200]}>
                {initialProjectStatus !== undefined ? 'Update Status' : 'Add Status'}
              </Typography>
            </Breadcrumbs>
            <Button variant="contained" type={'submit'} disabled={addIsLoading || updateIsLoading}>
              {initialProjectStatus ? 'Update' : 'Submit'}
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <FormControl>
              <InputBase
                fullWidth
                name={'projectStatusTitle'}
                placeholder={placeholder}
                value={values.projectStatusTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ fontSize: 24 }} />
            </FormControl>

            <Stack direction={'row'} alignItems={'center'} spacing={10}>
              <Typography>Status</Typography>
              <Button
                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                sx={{ borderRadius: 2 }}>
                <ProjectStatusLabel status={statusType} />
              </Button>
              <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={handleCloseMenu}>
                {projectStatuses.map((s) => (
                  <MenuItem value={s} key={s} onClick={() => handleMenuItemClick(s)}>
                    <ProjectStatusLabel status={s} />
                  </MenuItem>
                ))}
              </Menu>
            </Stack>

            {initialProjectStatus && (
              <Stack direction={'row'} alignItems={'center'} spacing={9}>
                <Typography>Publisher</Typography>
                <Link variant={'h6'}>{initialProjectStatus.createdBy.name}</Link>
              </Stack>
            )}

            <Stack width={'100%'}>
              <Typography variant={'h5'} mt={2} mb={1}>Description</Typography>
              <FormControl>
                <OutlinedInputTextField
                  multiline
                  minRows={5}
                  name={'projectStatusDescription'}
                  placeholder={`How is the project going?`}
                  value={values.projectStatusDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.projectStatusDescription && !!errors.projectStatusDescription}
                  sx={{ width: 500 }}/>
                <Collapse in={touched.projectStatusDescription && !!errors.projectStatusDescription}>
                  <FormHelperText error={touched.projectStatusDescription && !!errors.projectStatusDescription}>
                    {errors.projectStatusDescription}
                  </FormHelperText>
                </Collapse>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default ProjectStatusDialog;