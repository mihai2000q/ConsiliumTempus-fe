import Project from "../types/Project.model.ts";
import { alpha, Box, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import Paragraph from "../../../components/text/Paragraph.tsx";
import { useNavigate } from "react-router-dom";
import Paths from "../../../utils/Paths.ts";
import useIsDarkMode from "../../../hooks/useIsDarkMode.ts";

interface ProjectItemProps {
  project: Project
}

function ProjectCard({ project }: ProjectItemProps) {
  const theme = useTheme();
  const isDarkMode = useIsDarkMode()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${Paths.Project}/${project.id}`)
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: 340,
        cursor: 'pointer',
        boxShadow: 10,
        borderRadius: '6px',
        bgcolor: alpha(theme.palette.background[900], 0.6)
      }}>
      <Box position="relative">
        <CardMedia
          image={'src/assets/demo-projects.jpg'}
          title={project.name}
          sx={{ height: 200, borderRadius: '6px 6px 0px 0px' }}/>
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
          color={isDarkMode ? theme.palette.grey[300] : undefined}
          lines={3}>
          {project.description}
        </Paragraph>
      </CardContent>
    </Box>
  );
}

export default ProjectCard;