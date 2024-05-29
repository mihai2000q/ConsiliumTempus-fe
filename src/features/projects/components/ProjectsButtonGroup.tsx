import { Button, ButtonProps, Stack, StackProps, styled } from "@mui/material";
import { ArchiveOutlined, HourglassEmptyOutlined, SkipNextOutlined } from "@mui/icons-material";
import { useState } from "react";

const StyledButtonGroup = styled(Stack)<StackProps>(({ theme }) => ({
  alignItems: "center",
  flexDirection: 'row',
  backgroundColor: theme.palette.background[900],
  padding: '5px 5px',
  borderRadius: '16px',
}))

interface StyledButtonProps extends ButtonProps {
  selected: boolean,
  active: boolean,
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'active'
})<StyledButtonProps>(({ theme, selected, active }) => ({
  transition: theme.transitions.create(['background-color', 'color', 'padding'], {
    duration: theme.transitions.duration.standard,
  }),
  borderRadius: '11px',
  padding: '6px 10px',
  margin: '0px 2px',
  '& .MuiButton-startIcon': {
    marginRight: '6px',
  },
  ...(selected
      ? theme.palette.mode === 'dark'
        ? {
          backgroundColor: theme.palette.primary[600],
          color: theme.palette.background[50],
          '&: hover': {
            backgroundColor: theme.palette.primary[800],
            color: theme.palette.background[300],
          },
          padding: '9px 10px',
        }
        : {
          backgroundColor: theme.palette.primary[300],
          color: theme.palette.background[700],
          '&: hover': {
            backgroundColor: theme.palette.primary[500],
            color: theme.palette.background[900],
          },
          padding: '9px 10px',
        }
      : {}
  ),
  ...(!active && selected
      ? theme.palette.mode === 'dark'
        ? {
          backgroundColor: theme.palette.grey[700],
          color: theme.palette.grey[400],
          '&: hover': {
            backgroundColor: theme.palette.primary[600],
            color: theme.palette.background[50],
          }
        }
        : {
          backgroundColor: theme.palette.grey[500],
          color: theme.palette.grey[300],
          '&: hover': {
            backgroundColor: theme.palette.primary[600],
            color: theme.palette.background[700],
          }
        }
      : {}
  )
}))

type ProjectsButtonGroupState = 'archived' | 'active' | 'upcoming'

function ProjectsButtonGroup() {
  const [state, setState] = useState<ProjectsButtonGroupState>('active')
  const [active, setActive] = useState(true)

  const handleClick = (newState: ProjectsButtonGroupState) => {
    if (newState === state) {
      setActive(!active)
    } else {
      setState(newState)
      setActive(true)
    }
  }

  return (
    <StyledButtonGroup>
      <StyledButton
        startIcon={<ArchiveOutlined />}
        selected={state === 'archived'}
        active={active}
        onClick={() => handleClick('archived')}>
        Archived Projects
      </StyledButton>
      <StyledButton
        startIcon={<SkipNextOutlined />}
        selected={state === 'active'}
        active={active}
        onClick={() => handleClick('active')}>
        Active Projects
      </StyledButton>
      <StyledButton
        startIcon={<HourglassEmptyOutlined />}
        selected={state === 'upcoming'}
        active={active}
        onClick={() => handleClick('upcoming')}>
        Upcoming Projects
      </StyledButton>
    </StyledButtonGroup>
  );
}

export default ProjectsButtonGroup;