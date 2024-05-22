import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./features/layout/Layout.tsx";
import Login from "./features/login/Login.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./state/store.ts";
import Signup from "./features/signup/Signup.tsx";
import { useMemo } from "react";
import { themeSettings } from "./theme/theme.ts";
import Paths from "./utils/Paths.ts";
import Home from "./features/home/Home.tsx";
import Calendar from "./features/calendar/Calendar.tsx";
import MyTasks from "./features/my-tasks/MyTasks.tsx";
import Projects from "./features/projects/Projects.tsx";
import Project from "./features/project/Project.tsx";

function App() {
  const mode = useSelector((state: RootState) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className={'app'}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path={'/'} element={<Navigate to={'/login'} replace />} />
              <Route path={Paths.Login} element={<Login />} />
              <Route path={Paths.Signup} element={<Signup />} />

              <Route path={Paths.Home} element={<Home />} />
              <Route path={Paths.Tasks} element={<MyTasks />} />
              <Route path={Paths.Calendar} element={<Calendar />} />
              <Route path={Paths.Projects} element={<Projects />} />
              <Route path={Paths.Project} element={<Project />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
