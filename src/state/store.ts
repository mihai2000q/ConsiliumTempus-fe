import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice.ts'
import globalReducer from './global/globalSlice.ts'
import projectReducer from './project/projectSlice.ts'
import projectBoardReducer from './project-board/projectBoardSlice.ts'
import workspaceReducer from './workspace/workspaceSlice.ts'
import { api } from './api.ts'
import { useDispatch, useSelector } from 'react-redux'

const reducer = {
  auth: authReducer,
  global: globalReducer,
  project: projectReducer,
  projectBoard: projectBoardReducer,
  workspace: workspaceReducer,
  [api.reducerPath]: api.reducer
}

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
