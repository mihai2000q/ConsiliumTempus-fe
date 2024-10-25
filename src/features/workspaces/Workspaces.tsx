import Grid from '@mui/material/Grid2'
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { GridViewRounded, Search, ViewStreamRounded } from "@mui/icons-material";
import useSearchParamsState from "../../hooks/useSearchParamsState.ts";
import { ChangeEvent, ReactNode } from "react";
import useSearchQueryParam from "../../hooks/useSearchQueryParam.ts";
import useFacadeState from "../../hooks/useFacadeState.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import FilterOperator from "../../utils/enums/FilterOperator.ts";
import WorkspacesSearchQueryParams from "./utils/WorkspacesSearchQueryParams.ts";
import { useGetWorkspacesQuery } from "./state/workspacesApi.ts";
import useWorkspacesPage from "./hooks/useWorkspacesPages.ts";
import WorkspaceFilterButton from "./components/WorkspaceFilterButton.tsx";
import WorkspaceSortButton from "./components/WorkspaceSortButton.tsx";
import WorkspaceCard from "./components/WorkspaceCard.tsx";
import workspacesSearchParamsState from "./state/WorkspacesSearchParamsState.ts";
import useOrderByQueryParam from "../../hooks/useOrderByQueryParam.ts";
import WorkspacesOrderQueryParams from "./utils/WorkspacesOrderQueryParams.ts";
import OrderType from "../../utils/enums/OrderType.ts";
import Order from "../../types/Order.ts";

const GridItem = ({ children }: { children: ReactNode }) => {
  return (
    <Grid size={4}>
      {children}
    </Grid>
  )
}

function Workspaces() {
  const [searchParams, setSearchParams] = useSearchParamsState(workspacesSearchParamsState)

  const initialOrder: Order = {
    property: WorkspacesOrderQueryParams.LastActivity,
    type: OrderType.Descending,
    displayName: ''
  }
  const [orderBy, setOrderBy] = useOrderByQueryParam(initialOrder)
  const [
    searchQueryParam,
    addToSearchQueryParam,
    removeFromSearchQueryParam
  ] = useSearchQueryParam();

  const [searchName, facadeName, setFacadeName] = useFacadeState('')
  useUpdateEffect(() => {
    addToSearchQueryParam({
      property: WorkspacesSearchQueryParams.Name,
      operator: FilterOperator.Contains,
      value: searchName.trim() === '' ? null : searchName
    })
  }, [searchName])

  const pageSize = 12

  const {
    data,
    isLoading,
    isFetching
  } = useGetWorkspacesQuery({
    orderBy: orderBy,
    pageSize: pageSize,
    currentPage: searchParams.currentPage,
    search: searchQueryParam
  })
  const workspaces = data?.workspaces

  const [startPageCount, endPageCount, totalPages] = useWorkspacesPage(
    data,
    pageSize,
    searchParams.currentPage
  )

  useUpdateEffect(() => {
    setSearchParams({ ...searchParams, currentPage: 1 })
  }, [searchName])

  useUpdateEffect(() => {
    if (data?.workspaces.length === 0 && data?.totalCount != 0)
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
        Workspaces
      </Typography>
      <Stack
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <TextField
            name={'workspace-search'}
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

        <Stack direction={'row'} spacing={2}>
          <WorkspaceSortButton initialOrder={initialOrder} setOrderBy={setOrderBy} />
          <WorkspaceFilterButton addToSearchQueryParam={addToSearchQueryParam}
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
              {startPageCount} - {endPageCount} of {data.totalCount} workspaces
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

      <Grid
        container
        columns={{ xs: 4, md: 8, xl: 16 }}
        flexGrow={1}
        spacing={4}>
        {
          !workspaces
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
              workspaces?.map((workspace) => (
                <GridItem key={workspace.id}>
                  <WorkspaceCard workspace={workspace} />
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

export default Workspaces;
