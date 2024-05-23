interface ProjectTaskDrawerState {
  taskId: string,
  isDrawerOpen: boolean,
}

export const initialState: ProjectTaskDrawerState = {
  taskId: '',
  isDrawerOpen: false
}