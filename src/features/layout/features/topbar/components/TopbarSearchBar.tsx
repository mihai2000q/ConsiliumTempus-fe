import { alpha, Box, BoxProps, darken, InputBase, InputBaseProps, lighten, Stack, styled } from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";

interface SearchbarProps extends BoxProps {
  isFocused: boolean
}

const Searchbar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFocused',
})<SearchbarProps>(({ theme, isFocused }) => ({
  boxShadow:
    '0px 10px 15px -6px rgba(0,0,0,0.05),' +
    '-10px 10px 15px -6px rgba(0,0,0,0.05),' +
    '10px 10px 15px -6px rgba(0,0,0,0.05),' +
    '10px -3px 15px -6px rgba(0,0,0,0.05),' +
    '-10px -3px 15px -6px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.background[900], 0.8)
    : lighten(theme.palette.background[900], 0.5),
  borderRadius: '16px',
  padding: '4px 8px',
  marginTop: '4px',
  marginLeft: 50,
  transition: theme.transitions.create(['background-color', 'border-radius', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? darken(theme.palette.background[900], 0.15)
      : lighten(theme.palette.background[900], 1),
    borderRadius: '8px',
    boxShadow:
      '0px 10px 15px -4px rgba(0,0,0,0.08),' +
      '-10px 10px 15px -4px rgba(0,0,0,0.08),' +
      '10px 10px 15px -4px rgba(0,0,0,0.08),' +
      '10px -3px 15px -4px rgba(0,0,0,0.08),' +
      '-10px -3px 15px -3px rgba(0,0,0,0.08)',
  },
  ...(isFocused && {
    backgroundColor: theme.palette.mode === 'dark'
      ? darken(theme.palette.background[900], 0.15)
      : lighten(theme.palette.background[900], 1),
    borderRadius: '8px',
  })
}))

const SearchInput = styled(InputBase)<InputBaseProps>({
  width: 200,
  padding: '4px 8px',
})

function TopbarSearchBar() {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <Searchbar isFocused={isFocused}>
      <Stack direction={'row'} alignItems={'center'}>
        <Search />
        <SearchInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
      </Stack>
    </Searchbar>
  );
}

export default TopbarSearchBar;