export default interface ProjectSprint {
  name: string
  startDate: string | null
  endDate: string | null
  createdDateTime: string
  updatedDateTime: string
  createdBy: User
  updatedBy: User
}

interface User {
  id: string
  name: string
  email: string
}
