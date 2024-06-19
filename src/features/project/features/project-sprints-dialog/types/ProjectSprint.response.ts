export default interface ProjectSprintResponse {
  id: string,
  name: string,
  startDate: string | null,
  endDate: string | null,
  createdDateTime: string,
  updatedDateTime: string,
  createdBy: UserResponse,
  updatedBy: UserResponse
}

interface UserResponse {
  id: string,
  name: string,
  email: string,
}