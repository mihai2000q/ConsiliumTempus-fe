import Project from "../types/Project.model.ts";
import { alpha, Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import Paragraph from "../../../components/text/Paragraph.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import Paths from "../../../utils/Paths.ts";
import useIsDarkMode from "../../../hooks/useIsDarkMode.ts";

interface ProjectItemProps {
  project: Project
}

function ProjectCard({ project }: ProjectItemProps) {
  const theme = useTheme();
  const isDarkTheme = useIsDarkMode()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      pathname: Paths.project,
      search: `?${createSearchParams({ id: project.id })}`
    })
  }

  return (
    <Card
      elevation={10}
      onClick={handleClick}
      sx={{ height: 340, cursor: 'pointer' }}>
      <Box position="relative">
        <CardMedia
          image={'src/assets/demo-projects.jpg'}
          title={project.name}
          sx={{ height: 200 }}/>
        <Box bgcolor={alpha(theme.palette.primary.main, 0.43)} position="absolute" bottom={0} width={'100%'}>
          <Typography align={'center'} padding={1} fontWeight={500} variant={'subtitle1'} color={'white'}>
            Project started on 12 September 2023
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant={'h5'} noWrap>{project.name}</Typography>
        <Paragraph
          variant={'subtitle1'}
          color={isDarkTheme ? theme.palette.grey[300] : undefined}
          lines={3}>
          {project.description}
        </Paragraph>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;