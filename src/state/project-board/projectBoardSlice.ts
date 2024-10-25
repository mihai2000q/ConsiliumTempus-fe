import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, ProjectStageState } from './projectBoardState.ts'
import ProjectTask from '../../features/project/features/project-board/types/ProjectTask.model.ts'
import { arrayMove } from '@dnd-kit/sortable'

export const projectBoardSlice = createSlice({
  name: 'projectBoard',
  initialState,
  reducers: {
    setDragOverlayProjectTask: (state, action: PayloadAction<ProjectTask | undefined>) => {
      state.dragOverlayProjectTask = action.payload
    },
    setDraggedProjectTask: (state, action: PayloadAction<ProjectTask | undefined>) => {
      state.draggedProjectTask = action.payload
    },
    setProjectStagesWithOverTasks: (
      state,
      action: PayloadAction<{
        activeId: string,
        overId: string,
        activeStage: ProjectStageState,
        overStage: ProjectStageState,
        delta: { y: number }
      }>
    ) => {
      const {
        activeId,
        overId,
        activeStage,
        overStage,
        delta
      } = action.payload

      const activeTasks = activeStage.tasks ?? []
      const overTasks = overStage.tasks ?? []

      const newActiveStageTasks = activeTasks.filter(t => t.id !== activeId)

      const newIndex = () => {
        const overIndex = overTasks.findIndex(t => t.id === overId)
        const putOnBelowLastItem = overIndex === overTasks.length - 1 && delta.y > 0
        const modifier = putOnBelowLastItem ? 1 : 0
        return overIndex >= 0 ? overIndex + modifier : overTasks.length + 1
      }

      const activeTaskIndex = activeTasks.findIndex(t => t.id === activeId)

      const newOverStageTasks = [
        ...overTasks.slice(0, newIndex()),
        activeTasks[activeTaskIndex],
        ...overTasks.slice(newIndex(), overTasks.length)
      ]

      state.projectStages = state.projectStages.map(prevStage => {
        if (prevStage.id === activeStage.id) {
          prevStage.tasks = newActiveStageTasks
          return prevStage
        } else if (prevStage.id === overStage.id) {
          prevStage.tasks = newOverStageTasks
          return prevStage
        } else {
          return prevStage
        }
      })
    },
    setProjectStagesWithEndTasks: (
      state,
      action: PayloadAction<{ activeId: string, overId: string }>
    ) => {
      const { activeId, overId } = action.payload

      const activeStage = state.projectStages
        .find(s => s.tasks?.some(t => t.id === activeId))
      const overStage = state.projectStages
        .find(s => s.tasks?.some(t => t.id === overId))

      if (!activeStage || !overStage || overStage.id !== activeStage.id) return

      const activeTasks = activeStage?.tasks ?? []
      const overTasks = activeStage?.tasks ?? []

      const activeIndex = activeTasks.findIndex(t => t.id === activeId)
      const overIndex = overTasks.findIndex(t => t.id === overId)

      state.projectStages = state.projectStages.map(prevStage => {
        if (prevStage.id === overStage?.id) {
          prevStage.tasks = arrayMove(prevStage.tasks ?? [], activeIndex, overIndex)
          return prevStage
        } else {
          return prevStage
        }
      })
    },
    setProjectTasksOnStage: (state, action: PayloadAction<ProjectStageState>) => {
      const stage = state.projectStages
        .find(stage => stage.id === action.payload.id)

      if (stage) {
        stage.tasks = action.payload.tasks
      } else {
        state.projectStages.push(action.payload)
      }
    }
  }
})

export const {
  setProjectStagesWithOverTasks,
  setProjectStagesWithEndTasks,
  setProjectTasksOnStage,
  setDraggedProjectTask,
  setDragOverlayProjectTask
} = projectBoardSlice.actions

export default projectBoardSlice.reducer
