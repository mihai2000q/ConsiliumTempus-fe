import { Box, BoxProps, styled, Typography } from "@mui/material";
import { projectStatusToBackgroundColor } from "../../data/ProjectStatusToBackgroundColor.ts";
import { projectStatusNormalization } from "../../data/ProjectStatusNormalization.ts";
import { Check, Circle } from "@mui/icons-material";
import { projectStatusToColor } from "../../data/ProjectStatusToColor.ts";
import ProjectStatusType from "../../types/ProjectStatusType.ts";

interface StyledLabelProps extends BoxProps {
  status: ProjectStatusType
}

const StyledLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status'
})<StyledLabelProps>(({ status }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: projectStatusToBackgroundColor.get(status) ?? '#FFFFFF',
  color: projectStatusToColor.get(status) ?? '#FFFFFF',
  padding: '2px 10px 2px 8px',
  margin: '1px 0',
  borderRadius: '16px',
  gap: '8px',
  '& .MuiSvgIcon-root': {
    fontSize: status === 'Completed' ? '16px' : '12px',
  }
}))

interface ProjectStatusLabelProps {
  status: ProjectStatusType
}

function ProjectStatusLabel({
  status
}: ProjectStatusLabelProps) {
  return (
    <StyledLabel status={status}>
      {status === 'Completed' ? <Check /> : <Circle />}
      <Typography variant={'body2'}>{projectStatusNormalization.get(status)}</Typography>
    </StyledLabel>
  );
}

export default ProjectStatusLabel;