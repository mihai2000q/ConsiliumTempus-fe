import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./features/layout/Layout.tsx";
import Login from "./features/login/Login.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./state/store.ts";
import Signup from "./features/signup/Signup.tsx";
import { useMemo } from "react";
import { themeSettings } from "./theme/theme.ts";
import Paths from "./utils/enums/Paths.ts";
import Home from "./features/home/Home.tsx";
import Calendar from "./features/calendar/Calendar.tsx";
import MyTasks from "./features/my-tasks/MyTasks.tsx";
import Projects from "./features/projects/Projects.tsx";
import Project from "./features/project/Project.tsx";
import ProjectTask from "./features/project-task/ProjectTask.tsx";
import ProjectTaskParams from "./features/project-task/utils/ProjectTaskParams.ts";
import ProjectParams from "./features/project/utils/ProjectParams.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Workspaces from "./features/workspaces/Workspaces.tsx";
import WorkspaceParams from "./features/workspace/utils/WorkspaceParams.ts";
import Workspace from "./features/workspace/Workspace.tsx";

function App() {
  const mode = useSelector((state: RootState) => state.global.mode)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className={'app'}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Routes>
              <Route element={<Layout />}>
                <Route path={'/'} element={<Navigate to={'/login'} replace />} />
                <Route path={Paths.Login} element={<Login />} />
                <Route path={Paths.Signup} element={<Signup />} />

                <Route path={Paths.Home} element={<Home />} />
                <Route path={Paths.Tasks} element={<MyTasks />} />
                <Route path={Paths.Calendar} element={<Calendar />} />
                <Route path={Paths.Projects} element={<Projects />} />
                <Route path={`${Paths.Project}/:${ProjectParams.Id}`} element={<Project />} />
                <Route path={`${Paths.ProjectTask}/:${ProjectTaskParams.Id}`} element={<ProjectTask />} />
                <Route path={Paths.Workspaces} element={<Workspaces />} />
                <Route path={`${Paths.Workspace}/:${WorkspaceParams.Id}/*`} element={<Workspace />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
