import { Button, IconButton, ListItemText, Menu, MenuItem, Stack } from "@mui/material";
import { ArrowDownward, ArrowUpward, KeyboardArrowDown, KeyboardArrowUp, Sort } from "@mui/icons-material";
import OrderType from "../../../types/OrderType.ts";
import { projectOrderProperties } from "../data/ProjectOrderPropertiesData.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ProjectSortButtonProps {
  setOrder: Dispatch<SetStateAction<string>>
}

function ProjectSortButton({ setOrder }: ProjectSortButtonProps) {
  const [orderProperty, setOrderProperty] = useState(projectOrderProperties[0])
  const [orderType, setOrderType] = useState(OrderType.Descending)
  useEffect(() => {
    setOrder(`${orderProperty.value}.${orderType}`)
  }, [orderType, orderProperty, setOrder]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  return (
    <>
      <Button
        variant={'outlined'}
        startIcon={<Sort />}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        sx={{ textTransform: 'capitalize' }}>
        {orderProperty.displayName}
        {orderType === OrderType.Descending
          ? <ArrowDownward fontSize={'small'} sx={{ ml: 0.5 }} />
          : <ArrowUpward fontSize={'small'} sx={{ ml: 0.5 }} />}
      </Button>

      <Menu
        open={Boolean(menuAnchorEl)}
        anchorEl={menuAnchorEl}
        onClose={handleCloseMenu}>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <IconButton
            disabled={orderType === OrderType.Ascending}
            onClick={() => {
              setOrderType(OrderType.Ascending)
              handleCloseMenu()
            }}
          >
            <KeyboardArrowUp />
          </IconButton>
          <IconButton
            disabled={orderType === OrderType.Descending}
            onClick={() => {
              setOrderType(OrderType.Descending)
              handleCloseMenu()
            }}
          >
            <KeyboardArrowDown />
          </IconButton>
        </Stack>
        {projectOrderProperties.map((op) => (
          <MenuItem
            key={op.value}
            onClick={() => {
              setOrderProperty(op)
              handleCloseMenu()
            }}>
            <ListItemText>{op.displayName}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ProjectSortButton;