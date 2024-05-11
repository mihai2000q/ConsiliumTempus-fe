import { Project } from "../types/Project.ts";
import { alpha, Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import Paragraph from "../../../components/text/Paragraph.tsx";

interface ProjectItemProps {
  project: Project
}

function ProjectCard({ project }: ProjectItemProps) {
  const theme = useTheme();

  return (
    <Card elevation={6} sx={{ height: 340 }}>
      <Box position="relative">
        <CardMedia
          image={'src/assets/demo-projects.jpg'}
          title={project.name}
          sx={{ height: 200 }}/>
        <Box bgcolor={alpha(theme.palette.primary.main, 0.43)} position="absolute" bottom={0} width={'100%'}>
          <Typography align={'center'} padding={1} variant="subtitle2">
            Project started on 12 September 2023
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant={'h6'}>{project.name}</Typography>
        <Paragraph
          variant={'caption'}
          lines={3}>
          {project.description}
        </Paragraph>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;