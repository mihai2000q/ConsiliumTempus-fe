import { Dayjs } from 'dayjs'

export default interface ProjectSprint {
  name: string,
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  createdDateTime: Dayjs,
  updatedDateTime: Dayjs,
  createdBy: User,
  updatedBy: User
}

interface User {
  id: string,
  name: string,
  email: string,
}
