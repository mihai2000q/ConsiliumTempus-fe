export interface AddProjectSprintRequest {
  projectId: string,
  name: string,
  startDate: string | undefined,
  endDate: string | undefined,
  keepPreviousStages: boolean,
  projectStatus?: {
    title: string,
    status: string,
    description: string,
  }
}