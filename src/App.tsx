import { Navigate, Route, Routes } from 'react-router'
import Layout from './features/layout/Layout.tsx'
import Login from './features/login/Login.tsx'
import Signup from './features/signup/Signup.tsx'
import Paths from './utils/enums/Paths.ts'
import Home from './features/home/Home.tsx'
import Calendar from './features/calendar/Calendar.tsx'
import MyTasks from './features/my-tasks/MyTasks.tsx'
import Projects from './features/projects/Projects.tsx'
import Project from './features/project/Project.tsx'
import ProjectTask from './features/project-task/ProjectTask.tsx'
import ProjectTaskParams from './features/project-task/utils/ProjectTaskParams.ts'
import ProjectParams from './features/project/utils/ProjectParams.ts'
import Workspaces from './features/workspaces/Workspaces.tsx'
import WorkspaceParams from './features/workspace/utils/WorkspaceParams.ts'
import Workspace from './features/workspace/Workspace.tsx'
import RequireAuthentication from './router/RequireAuthentication.tsx'
import IsAlreadyAuthenticated from './router/IsAlreadyAuthenticated.tsx'
import Unauthorized from './features/unauthorized/Unauthorized.tsx'
import NotFound from './features/not-found/NotFound.tsx'
import Providers from './Providers.tsx'

function App() {
  return (
    <div className={'app'}>
      <Providers>
        <Routes>
          <Route element={<Layout />}>
            <Route path={'/'} element={<Navigate to={Paths.Home} replace />} />

            <Route element={<IsAlreadyAuthenticated />}>
              <Route path={Paths.Login} element={<Login />} />
              <Route path={Paths.Signup} element={<Signup />} />
            </Route>

            <Route element={<RequireAuthentication />}>
              <Route path={Paths.Home} element={<Home />} />
              <Route path={Paths.Tasks} element={<MyTasks />} />
              <Route path={Paths.Calendar} element={<Calendar />} />
              <Route path={Paths.Projects} element={<Projects />} />
              <Route path={`${Paths.Project}/:${ProjectParams.Id}`} element={<Project />} />
              <Route
                path={`${Paths.ProjectTask}/:${ProjectTaskParams.Id}`}
                element={<ProjectTask />}
              />
              <Route path={Paths.Workspaces} element={<Workspaces />} />
              <Route path={`${Paths.Workspace}/:${WorkspaceParams.Id}/*`} element={<Workspace />} />
              {/* Errors */}
              <Route path={Paths.Unauthorized} element={<Unauthorized />} />
              <Route path={Paths.NotFound} element={<NotFound />} />
              <Route path={'*'} element={<Navigate to={Paths.NotFound} replace />} />
            </Route>
          </Route>
        </Routes>
      </Providers>
    </div>
  )
}

export default App
