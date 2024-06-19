import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputBase,
  Stack
} from "@mui/material";
import { updateProjectSprintDialogInitialValues } from "../state/projectSprintDialogState.ts";
import { updateProjectSprintDialogValidationSchema } from "../state/projectSprintDialogValidation.ts";
import dayjs, { Dayjs } from "dayjs";
import { useUpdateProjectSprintMutation } from "../state/projectSprintDialogApi.ts";
import ProjectSprint from "../types/ProjectSprint.model.ts";

interface UpdateProjectSprintDialogProps {
  open: boolean,
  onClose: () => void,
  initialProjectSprint: ProjectSprint
}

function UpdateProjectSprintDialog({
  open,
  onClose,
  initialProjectSprint
}: UpdateProjectSprintDialogProps) {
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
      id: initialProjectSprint.id,
      name: values.projectSprintName,
      startDate: startDate?.toJSON()?.split('T')[0],
      endDate: endDate?.toJSON()?.split('T')[0],
    })
    if (isError) return
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} type={"submit"} disabled={isLoading}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UpdateProjectSprintDialog;