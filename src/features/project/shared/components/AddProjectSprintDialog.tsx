import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store.ts";
import { useFormik } from "formik";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Breadcrumbs,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText, FormLabel,
  Grid,
  IconButton,
  InputBase,
  Link,
  Stack,
  Toolbar, Tooltip,
  Typography, useTheme
} from "@mui/material";
import { Close, ExpandMore, InfoOutlined } from "@mui/icons-material";
import { closeAddProjectSprintDialog } from "../../../../state/project/projectSlice.ts";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ProjectStatusType from "../../../../utils/project/ProjectStatusType.ts";
import OutlinedInputTextField from "../../../../components/textfield/OutlinedInputTextField.tsx";
import ProjectStatusSelector from "../../components/status/ProjectStatusSelector.tsx";
import FormGridItem from "../../../../components/form/FormGridItem.tsx";
import { addProjectSprintDialogValidationSchema } from "../state/sharedProjectValidation.ts";
import { useAddProjectSprintMutation } from "../state/sharedProjectApi.ts";
import { addProjectSprintDialogInitialValues } from "../state/sharedProjectState.ts";
import LoadingButton from "../../../../components/button/LoadingButton.tsx";

function AddProjectSprintDialog() {
  const projectStatusTitlePlaceholder = 'Status Update'

  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const { open } = useSelector((state: RootState) => state.project.addProjectSprintDialog)
  const projectId = useSelector((state: RootState) => state.project.projectId)
  const breadcrumbs = useSelector((state: RootState) => state.project.breadcrumbs)

  const onClose = () => dispatch(closeAddProjectSprintDialog())

  const [addProjectSprint, {
    isLoading,
    isError
  }] = useAddProjectSprintMutation()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: addProjectSprintDialogInitialValues,
    validationSchema: addProjectSprintDialogValidationSchema,
    onSubmit: handleSubmitForm
  })

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = useState<Dayjs | null>(null)

  const [projectStatus, setProjectStatus] = useState(ProjectStatusType.OnTrack)

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)
  useEffect(() => {
    values.isProjectStatusAccordionOpen = isAccordionExpanded
  }, [isAccordionExpanded]);

  async function handleSubmitForm() {
    await addProjectSprint({
      projectId: projectId,
      name: values.projectSprintName,
      startDate: startDate?.toJSON()?.split('T')[0],
      endDate: endDate?.toJSON()?.split('T')[0],
      keepPreviousStages: values.keepPreviousStages,
      projectStatus: !values.isProjectStatusAccordionOpen
        ? undefined
        : {
          title: values.projectStatusTitle.trim() === '' ? projectStatusTitlePlaceholder : values.projectStatusTitle,
          status: projectStatus,
          description: values.projectStatusDescription
        }
    })
    if (isError) return
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
              <Typography>Add Sprint</Typography>
            </Breadcrumbs>
            <LoadingButton isLoading={isLoading} variant="contained" type={'submit'}>
              Submit
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

              <FormGridItem
                justifyContent={'center'}
                label={
                  <Stack direction={'row'} spacing={'2px'}>
                    <FormLabel>Keep Previous Stages</FormLabel>
                    <Tooltip
                      placement={'top'}
                      title={'This option copies the stages from the previous sprint and populates the new sprint'}>
                      <InfoOutlined sx={{ color: theme.palette.text.secondary, fontSize: 15 }} />
                    </Tooltip>
                  </Stack>
                }>
                <Checkbox
                  name={'keepPreviousStages'}
                  checked={values.keepPreviousStages}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </FormGridItem>
            </Grid>

            <Accordion
              expanded={isAccordionExpanded}
              onChange={(_, n) => setIsAccordionExpanded(n)}
              sx={{ backgroundColor: theme.palette.background.default }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Add Status (optional)
              </AccordionSummary>
              <AccordionDetails>
                <Stack mb={1} spacing={2}>
                  <FormControl>
                    <InputBase
                      fullWidth
                      name={'projectStatusTitle'}
                      placeholder={projectStatusTitlePlaceholder}
                      value={values.projectStatusTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ fontSize: 16 }} />
                  </FormControl>

                  <Stack direction={'row'} alignItems={'center'} spacing={10}>
                    <Typography>Status</Typography>
                    <ProjectStatusSelector value={projectStatus} onChange={setProjectStatus} />
                  </Stack>

                  <Stack width={'100%'}>
                    <Typography variant={'h6'} mb={1}>Description</Typography>
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
              </AccordionDetails>
            </Accordion>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddProjectSprintDialog;