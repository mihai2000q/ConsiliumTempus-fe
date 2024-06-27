import { alpha, Box, BoxProps, CardContent, CardMedia, Stack, styled, Typography, } from "@mui/material";
import Paragraph from "../../../components/text/Paragraph.tsx";
import { useNavigate } from "react-router-dom";
import Paths from "../../../utils/enums/Paths.ts";
import Workspace from "../types/Workspace.model.ts";

const StyledWorkspaceCard = styled(Box)<BoxProps>(({ theme }) => ({
  height: 340,
  cursor: 'pointer',
  borderRadius: '6px',
  backgroundColor: alpha(theme.palette.background[900], 0.6),
  boxShadow: theme.shadows[10],
  transition: theme.transitions.create(['transform', 'box-shadow', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.background[900],
    boxShadow: theme.shadows[20]
  }
}))

interface WorkspaceCardProps {
  workspace: Workspace
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${Paths.Workspace}/${workspace.id}`)
  }

  return (
    <StyledWorkspaceCard onClick={handleClick}>
      <Box position="relative">
        <CardMedia
          image={'src/assets/demo-workspace-pic.jpg'}
          title={workspace.name}
          sx={{ height: 200, borderRadius: '6px 6px 0px 0px' }} />
      </Box>

      <CardContent>
        <Stack direction={'row'}>
          <Typography variant={'h5'} flexGrow={1} noWrap>{workspace.name}</Typography>
        </Stack>
        <Paragraph
          variant={'subtitle1'}
          color={'text.secondary'}
          lines={3}>
          {workspace.description}
        </Paragraph>
      </CardContent>
    </StyledWorkspaceCard>
  );
}

export default WorkspaceCard;