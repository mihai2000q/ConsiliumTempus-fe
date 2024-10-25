import Project from '../type/Project.model.ts'
import {
  alpha,
  Avatar,
  Box,
  BoxProps,
  Divider,
  IconButton,
  Link,
  Stack,
  StackProps,
  styled,
  Typography,
  useTheme
} from '@mui/material'
import { Link as ReactRouterLink } from 'react-router-dom'
import demoProjectPic from './../../../../../assets/demo-projects.jpg'
import demoUserPic from './../../../../../assets/demo-user-pic.jpg'
import Paths from '../../../../../utils/enums/Paths.ts'
import { Lock, MoreHoriz, Star, StarOutline } from '@mui/icons-material'
import UserPopper from '../../../../../components/popper/UserPopper.tsx'
import { useState } from 'react'
import WorkspaceProjectActionsMenu from './WorkspaceProjectActionsMenu.tsx'
import { useUpdateFavoritesProjectMutation } from '../state/workspaceProjectsApi.ts'

interface StyledWorkspaceProjectCardProps extends BoxProps {
  isHovering: boolean
}

const StyledWorkspaceProjectCard = styled(Stack, {
  shouldForwardProp: (props) => props !== 'isHovering'
})<StyledWorkspaceProjectCardProps>(({ theme, isHovering }) => ({
  borderRadius: '16px',
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short
  }),
  '& .MuiDivider-root': {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: isHovering ? 0 : 1
  },
  ...(isHovering && {
    backgroundColor: alpha(theme.palette.background[100], 0.1)
  })
}))

const StyledProjectAvatar = styled(Avatar)<StackProps>(({ theme }) => ({
  borderRadius: '16px',
  width: 55,
  height: 55,
  transition: theme.transitions.create(['filter'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': {
    filter: 'brightness(85%)'
  }
}))

const StyledOwnerAvatar = styled(Avatar)<StackProps>(({ theme }) => ({
  width: 30,
  height: 30,
  transition: theme.transitions.create(['filter'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': {
    filter: 'brightness(85%)'
  }
}))

interface HoverToDisplay extends BoxProps {
  isHovering: boolean
}

const HoverToDisplay = styled(Box, {
  shouldForwardProp: (props) => props !== 'isHovering'
})<HoverToDisplay>(({ theme, isHovering }) => ({
  transition: theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.short
  }),
  opacity: isHovering ? 1 : 0
}))

interface WorkspaceProjectCardProps {
  project: Project,
  isLast: boolean
}

function WorkspaceProjectCard({ project, isLast }: WorkspaceProjectCardProps) {
  const theme = useTheme()

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [isFavorite, setIsFavorite] = useState(project.isFavorite)

  const [updateFavoritesProject] = useUpdateFavoritesProjectMutation()

  const [isHovering, setIsHovering] = useState(false)

  return (
    <StyledWorkspaceProjectCard
      isHovering={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      <Stack direction="row" alignItems={'center'} spacing={2} py={1} px={3}>
        <Stack direction="row" alignItems={'center'} spacing={2} flexGrow={1}>
          <Link component={ReactRouterLink} to={`${Paths.Project}/${project.id}`}>
            <StyledProjectAvatar src={demoProjectPic} />
          </Link>
          <Stack>
            <Stack direction={'row'} justifyContent={'end'} spacing={1}>
              <Link
                component={ReactRouterLink}
                ml={0.4}
                variant={'h6'}
                noWrap
                maxWidth={400}
                underline={'none'}
                to={`${Paths.Project}/${project.id}`}
                sx={{ '&:hover': { color: 'inherit' } }}>
                {project.name}
              </Link>

              <HoverToDisplay isHovering={isHovering}>
                <IconButton
                  onClick={() => {
                    setIsFavorite(!isFavorite)
                    updateFavoritesProject({
                      id: project.id,
                      isFavorite: !isFavorite
                    })
                  }}
                  sx={{
                    color: theme.palette.primary[100],
                    '&:hover': { color: theme.palette.secondary.main },
                    width: 25,
                    height: 25
                  }}>
                  {isFavorite ? <Star fontSize={'inherit'} /> : <StarOutline fontSize={'inherit'} />}
                </IconButton>
              </HoverToDisplay>
            </Stack>
            {project.isPrivate &&
              <Stack direction={'row'} alignItems={'center'} spacing={'2px'} color={'text.secondary'}>
                <Lock color={'inherit'} />
                <Typography pt={0.5}>Private</Typography>
              </Stack>}
          </Stack>
        </Stack>

        <HoverToDisplay isHovering={isHovering}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <UserPopper user={{ ...project.owner }} placement={'top'}>
              <StyledOwnerAvatar src={demoUserPic} />
            </UserPopper>
            <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
              <MoreHoriz />
            </IconButton>
          </Stack>
        </HoverToDisplay>
      </Stack>
      {!isLast && <Divider variant={'middle'} />}

      <WorkspaceProjectActionsMenu
        anchorEl={menuAnchorEl}
        onClose={() => {
          setIsHovering(false)
          setMenuAnchorEl(null)
        }}
        project={project} />
    </StyledWorkspaceProjectCard>
  )
}

export default WorkspaceProjectCard
