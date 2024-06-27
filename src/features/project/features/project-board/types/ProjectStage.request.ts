export interface GetStagesFromProjectSprintRequest {
  id: string
}

export interface AddStageToProjectSprintRequest {
  id: string,
  name: string,
  onTop: boolean
}

export interface UpdateStageFromProjectSprintRequest {
  id: string,
  stageId: string,
  name: string
}

export interface RemoveStageFromProjectSprintRequest {
  id: string,
  stageId: string,
}