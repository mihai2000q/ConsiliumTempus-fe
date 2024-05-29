import { useGetProjectsQuery } from "./state/projectsApi.ts";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ProjectCard from "./components/ProjectCard.tsx";
import { ChangeEvent, ReactNode, useState } from "react";
import { GridViewRounded, Search, ViewStreamRounded } from "@mui/icons-material";
import ProjectSortButton from "./components/ProjectSortButton.tsx";
import ProjectFilterButton from "./components/ProjectFilterButton.tsx";
import usePageSize from "./hooks/usePageSize.ts";
import ProjectsButtonGroup from "./components/ProjectsButtonGroup.tsx";
import useProjectsPageCount from "./hooks/useProjectsPageCount.ts";
import useSearchParamsState from "../../hooks/useSearchParamsState.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import useFacadeState from "../../hooks/useFacadeState.ts";
import projectsSearchParamsState from "./state/ProjectsSearchParamsState.ts";

const GridItem = ({ children }: { children: ReactNode }) => {
  return (
    <Grid item xs={4}>
      {children}
    </Grid>
  )
}

function Projects() {
  const [searchParams, setSearchParams] = useSearchParamsState(projectsSearchParamsState)

  const [order, setOrder] = useState('')
  const [searchName, facadeName, setFacadeName] = useFacadeState('')

  const pageSize = usePageSize()

  const {
    data,
    isLoading,
    isFetching
  } = useGetProjectsQuery({
    order: order,
    pageSize: pageSize,
    currentPage: searchParams.currentPage,
    name: searchName.trim()
  })
  const projects = data?.projects

  useUpdateEffect(() => {
    setSearchParams({ ...searchParams, currentPage: 1 })
  }, [searchName]);

  useUpdateEffect(() => {
    if (data && data.projects.length === 0 && data.totalPages)
      setSearchParams({ ...searchParams, currentPage: data.totalPages })
  }, [data, pageSize]);

  const [startPageCount, endPageCount] = useProjectsPageCount(data, pageSize, searchParams.currentPage)

  const handleSearchNameChangeField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFacadeName(e.target.value)
  }
  const handleCurrentPageChange = (_: ChangeEvent<unknown>, p: number) => {
    setSearchParams({ ...searchParams, currentPage: p })
  }

  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'}>
      <Typography variant={'h1'} mb={4} align={'center'}>
        Projects
      </Typography>
      <Stack
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <TextField
            name={'project-search'}
            label={'Search'}
            placeholder={'Search by name'}
            inputMode={'search'}
            value={facadeName}
            onChange={handleSearchNameChangeField}
            InputProps={{ endAdornment: <Search /> }}
            sx={{ boxShadow: 8 }}/>
          {isFetching && !isLoading &&
            <CircularProgress size={33} thickness={5} color={'secondary'} sx={{ ml: 1 }} />}
        </Stack>

        <ProjectsButtonGroup />

        <Stack direction={'row'} spacing={2}>
          <ProjectSortButton setOrder={setOrder} />
          <ProjectFilterButton />
        </Stack>
      </Stack>

      <Stack
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={1.5}
        mt={1}
        mb={2}>
        {
          data
            ?
            <Typography>
                {startPageCount} - {endPageCount} of {data.totalCount} projects
            </Typography>
            : <CircularProgress color={'secondary'} size={20} thickness={8} />
        }
        <ButtonGroup variant='text'>
          <Button sx={{ paddingX: 4 }}>
            <ViewStreamRounded />
          </Button>
          <Button sx={{ paddingX: 4 }}>
            <GridViewRounded />
          </Button>
        </ButtonGroup>
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
        !data
          ? <CircularProgress color={'secondary'} size={27} thickness={7} />
          : data?.totalPages !== null &&
          <Pagination
            disabled={isFetching}
            count={data.totalPages}
            page={searchParams.currentPage}
            onChange={handleCurrentPageChange}
            color="primary"
            sx={{ mt: 4 }} />
      }
    </Stack>
  );
}

export default Projects;