import { Avatar, AvatarProps, Button, ButtonProps, Stack, styled } from "@mui/material";
import User from "../types/User.model.ts";
import { useGetCurrentUserQuery } from "../../../../../state/api.ts";
import demoUserPic from '../../../../../assets/demo-user-pic.jpg'
import { useEffect, useState } from "react";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import TopbarUserMenu from "./TopbarUserMenu.tsx";
import TopbarUserLoader from "./TopbarUserLoader.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../state/store.ts";
import { setUserId } from "../../../../../state/global/globalSlice.ts";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.grey[700],
  borderRadius: '8px',
  padding: '6px 0 6px 6px',
  '&:hover': {
    color: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.grey[600],
    '& .MuiAvatar-root': {
      filter: 'brightness(80%)'
    }
  }
}))

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  width: 35,
  height: 35,
  transition: theme.transitions.create(['filter'], {
    duration: theme.transitions.duration.standard,
  })
}))

function TopbarUser() {
  const user: User | undefined = useGetCurrentUserQuery(undefined).data

  const dispatch = useDispatch<AppDispatch>()
  
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    dispatch(setUserId(user?.id))
  }, [dispatch, user]) // TODO: Reference equality ?

  if (!user) return <TopbarUserLoader />
  
  return (
    <>
      <StyledButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
        <Stack direction={'row'} justifyContent="center" alignItems={"center"}>
          <StyledAvatar alt={"User Profile Picture"} src={demoUserPic} />
          <ArrowDropDownOutlined sx={{ mx: '2px' }} />
        </Stack>
      </StyledButton>
      <TopbarUserMenu anchorEl={menuAnchorEl} setAnchorEl={setMenuAnchorEl} user={user} />
    </>
  )
}

export default TopbarUser;