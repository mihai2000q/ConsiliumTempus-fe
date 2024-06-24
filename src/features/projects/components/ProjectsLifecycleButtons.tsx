import { Button, ButtonProps, Stack, StackProps, styled } from "@mui/material";
import { ArchiveOutlined, HourglassEmptyOutlined, SkipNextOutlined } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect } from "react";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";
import FilterOperator from "../../../utils/enums/FilterOperator.ts";
import ProjectLifecycle from "../../../utils/project/ProjectLifecycle.ts";
import { addToSearchQueryParamType } from "../../../hooks/useSearchQueryParam.ts";

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

interface ProjectsLifecycleButtonsProps {
  lifecycle: ProjectLifecycle,
  setLifecycle: Dispatch<SetStateAction<ProjectLifecycle>>,
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  addToSearchQueryParam: addToSearchQueryParamType
}

function ProjectsLifecycleButtons({
  lifecycle,
  setLifecycle,
  active,
  setActive,
  addToSearchQueryParam
}: ProjectsLifecycleButtonsProps) {
  const handleClick = (newLifecycle: ProjectLifecycle) => {
    if (newLifecycle === lifecycle) {
      setActive(!active)
    } else {
      setLifecycle(newLifecycle)
      setActive(true)
    }
  }

  useEffect(() => {
    addToSearchQueryParam({
      property: ProjectsSearchQueryParams.Lifecycle,
      operator: FilterOperator.Equal,
      value: active ? lifecycle : null
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lifecycle]);

  return (
    <StyledButtonGroup>
      <StyledButton
        startIcon={<ArchiveOutlined />}
        selected={lifecycle === ProjectLifecycle.Archived}
        active={active}
        onClick={() => handleClick(ProjectLifecycle.Archived)}>
        Archived Projects
      </StyledButton>
      <StyledButton
        startIcon={<SkipNextOutlined />}
        selected={lifecycle === ProjectLifecycle.Active}
        active={active}
        onClick={() => handleClick(ProjectLifecycle.Active)}>
        Active Projects
      </StyledButton>
      <StyledButton
        startIcon={<HourglassEmptyOutlined />}
        selected={lifecycle === ProjectLifecycle.Upcoming}
        active={active}
        onClick={() => handleClick(ProjectLifecycle.Upcoming)}>
        Upcoming Projects
      </StyledButton>
    </StyledButtonGroup>
  );
}

export default ProjectsLifecycleButtons;