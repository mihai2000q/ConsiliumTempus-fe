import { useFormik } from "formik";
import { useEffect, useState } from "react";
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
import { updateProjectSprintDialogInitialValues } from "../state/projectSprintsDialogState.ts";
import { updateProjectSprintDialogValidationSchema } from "../state/projectSprintsDialogValidation.ts";
import dayjs, { Dayjs } from "dayjs";
import { useUpdateProjectSprintMutation } from "../state/projectSprintsDialogApi.ts";
import ProjectSprint from "../types/ProjectSprint.model.ts";
import { Close } from "@mui/icons-material";
import FormGridItem from "../../../../../components/form/FormGridItem.tsx";
import { DatePicker } from "@mui/x-date-pickers";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state/store.ts";
import LoadingButton from "../../../../../components/button/LoadingButton.tsx";

interface UpdateProjectSprintDialogProps {
  open: boolean,
  onClose: () => void,
  sprintId: string,
  initialProjectSprint: ProjectSprint
}

function UpdateProjectSprintDialog({
  open,
  onClose,
  sprintId,
  initialProjectSprint
}: UpdateProjectSprintDialogProps) {
  const breadcrumbs = useSelector((state: RootState) => state.project.breadcrumbs)

  const [updateProjectSprint, {
    isLoading,
    isError
  }] = useUpdateProjectSprintMutation()

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = useState<Dayjs | null>(null)

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: updateProjectSprintDialogInitialValues,
    validationSchema: updateProjectSprintDialogValidationSchema,
    onSubmit: handleSubmitForm
  })
  useEffect(() => {
    if (!initialProjectSprint) return

    values.projectSprintName = initialProjectSprint.name
    setStartDate(initialProjectSprint.startDate)
    setEndDate(initialProjectSprint.endDate)
  }, [initialProjectSprint]);

  async function handleSubmitForm() {
    await updateProjectSprint({
      id: sprintId,
      name: values.projectSprintName,
      startDate: startDate?.toJSON()?.split('T')[0],
      endDate: endDate?.toJSON()?.split('T')[0],
    })
    if (isError) return
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
              <Typography>Update Sprint</Typography>
            </Breadcrumbs>
            <LoadingButton variant="contained" type={'submit'} isLoading={isLoading}>
              Update
            </LoadingButton>
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <FormControl>
              <InputBase
                fullWidth
                name={'projectSprintName'}
                placeholder={'Enter sprint name...'}
                value={values.projectSprintName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.projectSprintName && !!errors.projectSprintName}
                sx={{ fontSize: 24 }} />
              <Collapse in={touched.projectSprintName && !!errors.projectSprintName}>
                <FormHelperText error={touched.projectSprintName && !!errors.projectSprintName}>
                  {errors.projectSprintName}
                </FormHelperText>
              </Collapse>
            </FormControl>

            <Grid container rowSpacing={1} width={500}>
              <FormGridItem label={'Start Date'} justifyContent={'center'}>
                <DatePicker
                  format={'DD/MM/YYYY'}
                  name={'startDate'}
                  value={startDate}
                  onChange={(v) => setStartDate(v)} />
              </FormGridItem>

              <FormGridItem label={'End Date'} justifyContent={'center'}>
                <FormControl sx={{ display: 'flex', alignItems: 'center' }}>
                  <DatePicker
                    format={'DD/MM/YYYY'}
                    name={'endDate'}
                    value={endDate}
                    onChange={(v) => setEndDate(v)}
                    shouldDisableDate={(day) => day.isBefore(startDate)} />
                  <Collapse in={endDate?.isBefore(startDate)}>
                    <FormHelperText error={endDate?.isBefore(startDate)}>
                      End Date must happen after Start Date
                    </FormHelperText>
                  </Collapse>
                </FormControl>
              </FormGridItem>
            </Grid>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default UpdateProjectSprintDialog;