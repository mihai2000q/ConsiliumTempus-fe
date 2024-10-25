import { Dayjs } from 'dayjs'

export default interface ProjectSprint {
  id: string,
  name: string,
  startDate: Dayjs | null,
  endDate: Dayjs | null,
}
