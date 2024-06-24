import Project from "../types/Project.model.ts";
import { alpha, Box, BoxProps, CardContent, CardMedia, Stack, styled, Typography, } from "@mui/material";
import Paragraph from "../../../components/text/Paragraph.tsx";
import { useNavigate } from "react-router-dom";
import Paths from "../../../utils/enums/Paths.ts";
import useProjectStatusHeader from "../hooks/useProjectStatusHeader.ts";

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

interface ProjectStatusHeaderProps extends BoxProps {
  headerColor: string
}

const ProjectStatusHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'headerColor'
})<ProjectStatusHeaderProps>(({ headerColor }) => ({
  position: "absolute",
  bottom: 0,
  width: '100%',
  backgroundColor: alpha(headerColor, 0.43),
  backdropFilter: 'blur(2px)'
}))

interface ProjectItemProps {
  project: Project
}

function ProjectCard({ project }: ProjectItemProps) {
  const navigate = useNavigate()

  const [projectStatusHeader, projectStatusHeaderColor] =
    useProjectStatusHeader(project.createdDateTime, project.latestStatus)

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
        <ProjectStatusHeader headerColor={projectStatusHeaderColor}>
          <Typography align={'center'} padding={1} fontWeight={500} variant={'subtitle1'} color={'white'}>
            {projectStatusHeader}
          </Typography>
        </ProjectStatusHeader>
      </Box>

      <CardContent>
        <Stack direction={'row'}>
          <Typography variant={'h5'} flexGrow={1} noWrap>{project.name}</Typography>
        </Stack>
        <Paragraph
          variant={'subtitle1'}
          color={'text.secondary'}
          lines={3}>
          {project.description}
        </Paragraph>
      </CardContent>
    </StyledProjectCard>
  );
}

export default ProjectCard;