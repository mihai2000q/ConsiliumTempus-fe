import { Project } from "./types/Project.ts";
import { useGetProjectsQuery } from "./state/projectsApi.ts";
import { Box, Grid, Skeleton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ProjectCard from "./components/ProjectCard.tsx";
import { ReactNode, useEffect, useState } from "react";

function Projects() {
  const theme = useTheme()
  const isSmallSized = useMediaQuery(theme.breakpoints.down('xs'))
  const isMediumSized = useMediaQuery(theme.breakpoints.down('md'))
  const isLargeSized = useMediaQuery(theme.breakpoints.down('xl'))
  const [pageSize, setPageSize] = useState(0)
  useEffect(() => {
    if (isSmallSized) {
      setPageSize(6)
    } else if (isMediumSized) {
      setPageSize(10)
    } else if (isLargeSized) {
      setPageSize(12)
    }
  }, [isSmallSized, isMediumSized, isLargeSized])

  const GridItem = ({ children }: { children: ReactNode }) => {
    return (
      <Grid item xs={4}>
        {children}
      </Grid>
    )
  }

  const projects: Project[] | undefined = useGetProjectsQuery(undefined).data?.projects

  return (
    <Box
      display={'flex'}
      height={'100%'}>
      <Stack width={'100%'} alignItems={'center'}>
        <Typography variant={'h4'} mb={5} align={'center'}>
          Projects
        </Typography>
        {projects && projects.length === 0 && (
          <Typography variant="body2" align={"center"}>No Projects to display</Typography>
        )}
        <Grid
          container
          columns={{ xs: 4, md: 8, xl: 16 }}
          spacing={4}>
          {
            projects
              ? (
                projects.map((project: Project) => (
                  <GridItem key={project.id}>
                    <ProjectCard project={project} />
                  </GridItem>
                ))
              )
              : (
                <>
                  {Array.from(Array(pageSize)).map((_, i) => (
                    <GridItem key={i}>
                      <Skeleton variant={'rectangular'} sx={{ height: 300 }} />
                    </GridItem>
                  ))}
                </>
              )
          }
        </Grid>
      </Stack>
    </Box>
  );
}

export default Projects;