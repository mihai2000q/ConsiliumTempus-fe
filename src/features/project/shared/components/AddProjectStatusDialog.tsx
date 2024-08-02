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
import OutlinedInputTextField from "../../../../components/textfield/OutlinedInputTextField.tsx";
import ProjectStatusType from "../../../../utils/project/ProjectStatusType.ts";
import { RootState } from "../../../../state/store.ts";
import { useSelector } from "react-redux";
import FormGridItem from "../../../../components/form/FormGridItem.tsx";
import ProjectStatusSelector from "./ProjectStatusSelector.tsx";
import LoadingButton from "../../../../components/button/LoadingButton.tsx";
import { addProjectStatusDialogSchema } from "../state/sharedProjectValidation.ts";
import { addProjectStatusDialogFormInitialValues } from "../state/sharedProjectState.ts";
import { useAddStatusToProjectMutation } from "../state/sharedProjectApi.ts";

interface AddProjectStatusDialogProps {
  open: boolean,
  onClose: () => void,
  initialStatus?: ProjectStatusType | undefined
}

function AddProjectStatusDialog({
  open,
  onClose,
  initialStatus
}: AddProjectStatusDialogProps) {
  const titlePlaceholder = "Status Update"

  const projectId = useSelector((state: RootState) => state.project.projectId)
  const breadcrumbs = useSelector((state: RootState) => state.project.breadcrumbs)

  const [addStatusToProject, {
    isLoading
  }] = useAddStatusToProjectMutation()

  const [statusType, setStatusType] = useState(ProjectStatusType.OnTrack)

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: addProjectStatusDialogFormInitialValues,
    validationSchema: addProjectStatusDialogSchema,
    onSubmit: handleSubmitForm
  })
  useEffect(() => {
    if (initialStatus) setStatusType(initialStatus)
  }, [initialStatus]);

  async function handleSubmitForm() {
    await addStatusToProject({
      id: projectId,
      title: values.projectStatusTitle === '' ? titlePlaceholder : values.projectStatusTitle,
      status: statusType,
      description: values.projectStatusDescription
    }).unwrap()
    resetForm()
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
              <Typography>Add Status</Typography>
            </Breadcrumbs>
            <LoadingButton isLoading={isLoading} variant="contained" type={'submit'}>
              Submit
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

export default AddProjectStatusDialog;