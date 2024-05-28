import Project from "../types/Project.model.ts";
import { alpha, Box, BoxProps, CardContent, CardMedia, styled, Typography, useTheme } from "@mui/material";
import Paragraph from "../../../components/text/Paragraph.tsx";
import { useNavigate } from "react-router-dom";
import Paths from "../../../utils/Paths.ts";
import useIsDarkMode from "../../../hooks/useIsDarkMode.ts";

const StyledProjectCard = styled(Box)<BoxProps>(({ theme }) => ({
  height: 340,
  cursor: 'pointer',
  borderRadius: '6px',
  backgroundColor: alpha(theme.palette.background[900], 0.6),
  transition: theme.transitions.create(['transform', 'box-shadow', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.background[900]
  }
}))

const ProjectStatus = styled(Box)<BoxProps>(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: '100%',
  backgroundColor: alpha(theme.palette.primary.main, 0.43),
  backdropFilter: 'blur(2px)'
}))

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
    <StyledProjectCard
      onClick={handleClick}
      sx={{ boxShadow: 10, '&:hover': { boxShadow: 20 }, }}>
      <Box position="relative">
        <CardMedia
          image={'src/assets/demo-projects.jpg'}
          title={project.name}
          sx={{ height: 200, borderRadius: '6px 6px 0px 0px' }} />
        <ProjectStatus>
          <Typography align={'center'} padding={1} fontWeight={500} variant={'subtitle1'} color={'white'}>
            Project started on 12 September 2023
          </Typography>
        </ProjectStatus>
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
    </StyledProjectCard>
  );
}

export default ProjectCard;