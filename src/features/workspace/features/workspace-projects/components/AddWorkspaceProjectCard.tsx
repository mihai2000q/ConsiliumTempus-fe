import { alpha, Box, BoxProps, Divider, Stack, StackProps, styled, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const StyledAddWorkspaceProjectCard = styled(Stack)<StackProps>(({ theme }) => ({
  cursor: "pointer",
  borderRadius: '16px',
  color: theme.palette.text.triadic,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '& .MuiDivider-root': {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short,
    }),
  },
  '& .MuiTypography-root': {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short,
    }),
  },
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.background[100], 0.1),
    '& .MuiDivider-root': { opacity: 0 }
  }
}))

const DashedBorder = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '13px 13px 6px 13px',
  border: '1px dashed black',
  borderColor: 'inherit',
  borderRadius: '14px',
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  }),
}))

function AddWorkspaceProjectCard() {
  return (
    <StyledAddWorkspaceProjectCard>
      <Stack direction={'row'} alignItems={'center'} spacing={2.5} pl={3.3} py={1.4}>
        <DashedBorder><Add /></DashedBorder>
        <Typography variant={'h6'} fontWeight={400} fontSize={15}>New Project</Typography>
      </Stack>
      <Divider variant={'middle'} />
    </StyledAddWorkspaceProjectCard>
  );
}

export default AddWorkspaceProjectCard;