import ProjectTask from "../../features/project/features/project-board/types/ProjectTask.model.ts";

export interface ProjectStageState {
  id: string,
  tasks: ProjectTask[] | undefined
}

interface ProjectBoardState {
  projectStages: ProjectStageState[],
  draggedProjectTask: ProjectTask | undefined,
  dragOverlayProjectTask: ProjectTask | undefined
}

export const initialState: ProjectBoardState = {
  projectStages: [],
  draggedProjectTask: undefined,
  dragOverlayProjectTask: undefined
}