import {
  AppBar,
  Breadcrumbs,
  Collapse,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputBase,
  Link,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import OutlinedInputTextField from "../../../../../components/textfield/OutlinedInputTextField.tsx";
import ProjectStatus from "../types/ProjectStatus.model.ts";
import ProjectStatusType from "../../../../../utils/project/ProjectStatusType.ts";
import { RootState } from "../../../../../state/store.ts";
import { useSelector } from "react-redux";
import FormGridItem from "../../../../../components/form/FormGridItem.tsx";
import ProjectStatusSelector from "../../../shared/components/ProjectStatusSelector.tsx";
import LoadingButton from "../../../../../components/button/LoadingButton.tsx";
import { useUpdateStatusFromProjectMutation } from "../state/projectStatusesDialogApi.ts";
import { updateProjectStatusDialogSchema } from "../state/projectStatusesDialogValidation.ts";
import { updateProjectStatusDialogFormInitialValues } from "../state/projectStatusesDialogState.ts";

interface UpdateProjectStatusDialogProps {
  open: boolean,
  onClose: () => void,
  initialProjectStatus: ProjectStatus
}

function UpdateProjectStatusDialog({
  open,
  onClose,
  initialProjectStatus
}: UpdateProjectStatusDialogProps) {
  const titlePlaceholder = "Status Update"

  const projectId = useSelector((state: RootState) => state.project.projectId)
  const breadcrumbs = useSelector((state: RootState) => state.project.breadcrumbs)

  const [updateStatusFromProject, {
    isLoading
  }] = useUpdateStatusFromProjectMutation()

  const [statusType, setStatusType] = useState(ProjectStatusType.OnTrack)

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: updateProjectStatusDialogFormInitialValues,
    validationSchema: updateProjectStatusDialogSchema,
    onSubmit: handleSubmitForm
  })
  useEffect(() => {
    values.projectStatusTitle = initialProjectStatus.title
    setStatusType(initialProjectStatus.status)
    values.projectStatusDescription = initialProjectStatus.description
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProjectStatus])

  async function handleSubmitForm() {
    await updateStatusFromProject({
      id: projectId,
      statusId: initialProjectStatus!.id,
      title: values.projectStatusTitle === '' ? titlePlaceholder : values.projectStatusTitle,
      status: statusType,
      description: values.projectStatusDescription
    })
    onClose()
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
              {breadcrumbs.map(breadcrumb => (
                <Link key={breadcrumb.path} href={breadcrumb.path}>
                  {breadcrumb.name}
                </Link>
              ))}
              <Typography>Update Status</Typography>
            </Breadcrumbs>
            <LoadingButton variant="contained" type={'submit'} isLoading={isLoading}>
              Update
            </LoadingButton>
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <InputBase
              fullWidth
              name={'projectStatusTitle'}
              placeholder={titlePlaceholder}
              value={values.projectStatusTitle}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ fontSize: 24 }} />

            <Grid container rowSpacing={1} width={500}>
              <FormGridItem label={'Status'} labelSize={3}>
                <ProjectStatusSelector value={statusType} onChange={setStatusType} />
              </FormGridItem>

              <FormGridItem label={'Publisher'} labelSize={3}>
                <Link variant={'h6'} ml={1.5}>{initialProjectStatus.createdBy.name}</Link>
              </FormGridItem>
            </Grid>

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

export default UpdateProjectStatusDialog