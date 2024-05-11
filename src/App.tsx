import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./features/layout/Layout.tsx";
import Login from "./features/login/Login.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./state/store.ts";
import Signup from "./features/signup/Signup.tsx";
import { useMemo } from "react";
import { themeSettings } from "./theme.ts";
import Paths from "./utils/Paths.ts";
import Home from "./features/home/Home.tsx";
import Calendar from "./features/calendar/Calendar.tsx";
import MyTasks from "./features/my-tasks/MyTasks.tsx";
import Projects from "./features/projects/Projects.tsx";

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
              <Route path={Paths.login} element={<Login />} />
              <Route path={Paths.signup} element={<Signup />} />

              <Route path={Paths.home} element={<Home />} />
              <Route path={Paths.tasks} element={<MyTasks />} />
              <Route path={Paths.calendar} element={<Calendar />} />
              <Route path={Paths.projects} element={<Projects />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
