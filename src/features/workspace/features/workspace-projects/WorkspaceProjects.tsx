import { Button, Card, CardContent, CardHeader, CircularProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store.ts";
import useProjects from "./hooks/useProjects.ts";
import WorkspaceProjectCard from "./components/WorkspaceProjectCard.tsx";
import AddWorkspaceProjectCard from "./components/AddWorkspaceProjectCard.tsx";
import { useState } from "react";
import ProjectLifecycle from "../../../../utils/project/ProjectLifecycle.ts";
import { FilterList, Sort } from "@mui/icons-material";
import WorkspaceProjectsFilterMenu from "./components/WorkspaceProjectsFilterMenu.tsx";
import WorkspaceProjectsSortMenu from "./components/WorkspaceProjectsSortMenu.tsx";
import WorkspaceProjectsLoader from "./components/WorkspaceProjectsLoader.tsx";

function WorkspaceProjects() {
  const workspaceId = useSelector((state: RootState) => state.workspace.workspaceId)

  const [orderBy, setOrderByQueryParam] = useState<string[]>([])
  const [lifecycle, setLifecycle] =
    useState<ProjectLifecycle | null>(ProjectLifecycle.Active)

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] =
    useState<HTMLElement | null>(null)
  const [sortMenuAnchorEl, setSortMenuAnchorEl] =
    useState<HTMLElement | null>(null)

  const {
    projects,
    isFetching,
    fetchMore
  } = useProjects(workspaceId, orderBy, lifecycle)

  if (!projects) return <WorkspaceProjectsLoader />

  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'} py={2} overflow={"auto"}>
      <Card variant={'outlined-panel'} sx={{ width: 720 }}>
        <CardHeader
          title="Projects"
          action={
            <Stack direction={'row'} spacing={1}>
              <Button
                startIcon={<Sort />}
                variant={'alt-text'}
                size={'extra-small'}
                onClick={(e) => setSortMenuAnchorEl(e.currentTarget)}>
                Sort
              </Button>
              <Button
                startIcon={<FilterList />}
                variant={'alt-text'}
                size={'extra-small'}
                onClick={(e) => setFilterMenuAnchorEl(e.currentTarget)}>
                Filter
              </Button>
            </Stack>
          }
        />

        <CardContent>
          <AddWorkspaceProjectCard />
          {projects?.map((project, i) => (
            <WorkspaceProjectCard key={project.id} project={project} isLast={i === projects.length - 1} />
          ))}
          {fetchMore &&
            <Stack direction={'row'} alignItems={'center'}>
              <Button variant={'alt-text'} onClick={fetchMore} sx={{ m: 2 }}>
                Show more
              </Button>
              {isFetching && <CircularProgress size={21} thickness={7} />}
            </Stack>}
        </CardContent>
      </Card>


      <WorkspaceProjectsSortMenu
        setOrderByQueryParam={setOrderByQueryParam}
        anchorEl={sortMenuAnchorEl}
        onClose={() => setSortMenuAnchorEl(null)} />
      <WorkspaceProjectsFilterMenu
        lifecycle={lifecycle}
        setLifecycle={setLifecycle}
        anchorEl={filterMenuAnchorEl}
        onClose={() => setFilterMenuAnchorEl(null)} />
    </Stack>
  );
}

export default WorkspaceProjects;