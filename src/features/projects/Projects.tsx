import { useGetProjectsQuery } from "./state/projectsApi.ts";
import {
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ProjectCard from "./components/ProjectCard.tsx";
import { ReactNode, useState } from "react";
import { Search } from "@mui/icons-material";
import ProjectSortButton from "./components/ProjectSortButton.tsx";
import ProjectFilterButton from "./components/ProjectFilterButton.tsx";
import usePageSize from "./hooks/usePageSize.ts";
import useFacadeState from "../../hooks/useFacadeState.ts";

const GridItem = ({ children }: { children: ReactNode }) => {
  return (
    <Grid item xs={4}>
      {children}
    </Grid>
  )
}

function Projects() {
  const pageSize = usePageSize()
  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchName, searchFacadeName, setSearchFacadeName] = useFacadeState('')

  const {
    data,
    isLoading,
    isFetching
  } = useGetProjectsQuery({
    order: order,
    pageSize: pageSize,
    currentPage: currentPage,
    name: searchName
  })
  const projects = data?.projects
  const totalPages = data?.totalPages

  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'}>
      <Typography variant={'h1'} mb={4} align={'center'}>
        Projects
      </Typography>
      <Stack
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={3}>
        <Stack direction={'row'} alignItems={'center'}>
          <TextField
            name={'project-search'}
            label={'Search'}
            placeholder={'Search by name'}
            value={searchFacadeName}
            onChange={(e) => setSearchFacadeName(e.target.value)}
            InputProps={{
              endAdornment: <Search />
            }} sx={{ boxShadow: 8, borderRadius: 1 }}/>
          {isFetching && !isLoading &&
            <CircularProgress size={33} thickness={5} color={'secondary'} sx={{ ml: 1 }} />}
        </Stack>
        <Stack direction={'row'}>
          <Button>Archived Projects</Button>
          <Button>Active Projects</Button>
          <Button>Upcoming Projects</Button>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <ProjectSortButton setOrder={setOrder} />
          <ProjectFilterButton />
        </Stack>
      </Stack>
      {
        projects && searchName !== "" && projects.length === 0 && (
          <Typography variant="body2" align={"center"}>No Projects to display</Typography>
        )
      }
      <Grid
        container
        columns={{ xs: 4, md: 8, xl: 16 }}
        flexGrow={1}
        spacing={4}>
        {
          !projects
            ? (
              <>
                {Array.from(Array(pageSize)).map((_, i) => (
                  <GridItem key={i}>
                    <Skeleton variant={'rectangular'} sx={{ height: 300 }} />
                  </GridItem>
                ))}
              </>
            )
            : (
              projects?.map((project) => (
                <GridItem key={project.id}>
                  <ProjectCard project={project} />
                </GridItem>
              ))
            )
        }
      </Grid>
      {
        !projects
          ? <CircularProgress color={'secondary'} size={27} thickness={7} />
          : totalPages !== null &&
          <Pagination
            disabled={isFetching}
            count={totalPages}
            page={currentPage}
            onChange={(_, p) => setCurrentPage(p)}
            color="primary"
            sx={{ mt: 4 }} />
      }
    </Stack>
  );
}

export default Projects;