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
import ProjectsLifecycleButtons from "./components/ProjectsLifecycleButtons.tsx";
import useProjectsPages from "./hooks/useProjectsPages.ts";
import useSearchParamsState from "../../hooks/useSearchParamsState.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import useFacadeState from "../../hooks/useFacadeState.ts";
import projectsSearchParamsState from "./state/ProjectsSearchParamsState.ts";
import useSearchQueryParam from "../../hooks/useSearchQueryParam.ts";
import FilterOperator from "../../utils/enums/FilterOperator.ts";
import ProjectsSearchQueryParams from "./utils/ProjectsSearchQueryParams.ts";
import ProjectAdapter from "./adapters/Project.adapter.ts";
import ProjectLifecycle from "../../utils/project/ProjectLifecycle.ts";
import useAdapterState from "../../hooks/useAdapterState.ts";

const GridItem = ({ children }: { children: ReactNode }) => {
  return (
    <Grid item xs={4}>
      {children}
    </Grid>
  )
}

function Projects() {
  const [searchParams, setSearchParams] = useSearchParamsState(projectsSearchParamsState)

  const [orderBy, setOrderBy] = useState<string[]>([])
  const [lifecycle, setLifecycle] = useState(ProjectLifecycle.Active)
  const [lifecycleActive, setLifecycleActive] = useState(true)
  const [searchName, facadeName, setFacadeName] = useFacadeState('')

  const [
    searchQueryParam,
    addToSearchQueryParam,
    removeFromSearchQueryParam
  ] = useSearchQueryParam({
    property: ProjectsSearchQueryParams.Lifecycle,
    operator: FilterOperator.Equal,
    value: lifecycle
  })
  useUpdateEffect(() => {
    addToSearchQueryParam({
      property: ProjectsSearchQueryParams.Name,
      operator: FilterOperator.Contains,
      value: searchName.trim() === '' ? null : searchName
    })
  }, [searchName])


  const pageSize = usePageSize()

  const {
    data,
    isLoading,
    isFetching
  } = useGetProjectsQuery({
    orderBy: orderBy,
    pageSize: pageSize,
    currentPage: searchParams.currentPage,
    search: searchQueryParam
  })
  const projects = useAdapterState(data?.projects, ProjectAdapter.adapt)

  const [startPageCount, endPageCount, totalPages] = useProjectsPages(
    data,
    pageSize,
    searchParams.currentPage
  )

  useUpdateEffect(() => {
    setSearchParams({ ...searchParams, currentPage: 1 })
  }, [searchName])

  useUpdateEffect(() => {
    if (data?.projects.length === 0 && data?.totalCount != 0)
      setSearchParams({ ...searchParams, currentPage: totalPages})
  }, [data, pageSize])

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

        <ProjectsLifecycleButtons
          lifecycle={lifecycle}
          setLifecycle={setLifecycle}
          active={lifecycleActive}
          setActive={setLifecycleActive}
          addToSearchQueryParam={addToSearchQueryParam} />

        <Stack direction={'row'} spacing={2}>
          <ProjectSortButton setOrder={setOrderBy} />
          <ProjectFilterButton addToSearchQueryParam={addToSearchQueryParam}
                               removeFromSearchQueryParam={removeFromSearchQueryParam} />
        </Stack>
      </Stack>

      <Stack
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={1.5}
        mt={1}
        mb={1.5}>
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
                    <Skeleton variant={'rectangular'} sx={{ height: 300, borderRadius: 2 }} />
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
          : <Pagination
            disabled={isFetching}
            count={totalPages}
            page={searchParams.currentPage}
            onChange={handleCurrentPageChange}
            color="primary"
            sx={{ mt: 4 }} />
      }
    </Stack>
  );
}

export default Projects;