import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice.ts'
import globalReducer from './global/globalSlice.ts'
import projectReducer from './project/projectSlice.ts'
import workspaceReducer from './workspace/workspaceSlice.ts'
import { api } from "./api.ts";

const reducer = {
  auth: authReducer,
  global: globalReducer,
  project: projectReducer,
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