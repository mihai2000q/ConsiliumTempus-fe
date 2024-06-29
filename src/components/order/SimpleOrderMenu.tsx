import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from "@mui/material";
import OrderType from "../../utils/enums/OrderType.ts";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";
import OrderProperty from "../../types/OrderProperty.ts";
import Order from "../../types/Order.ts";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";

interface SimpleOrderMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  initialOrder: Order,
  orderProperties: OrderProperty[],
  setOrderBy: (order: Order) => void,
  onOrderChange: (order: Order) => void
}

function SimpleOrderMenu({
  anchorEl,
  onClose,
  initialOrder,
  orderProperties,
  setOrderBy,
  onOrderChange
}: SimpleOrderMenuProps) {
  const [orderProperty, setOrderProperty] =
    useState(orderProperties.find(op => op.value === initialOrder.property)!)
  const [orderType, setOrderType] = useState(initialOrder.type)
  useUpdateEffect(() => {
    const newOrder = {
      property: orderProperty.value,
      type: orderType,
      displayName: orderProperty.displayName
    }
    setOrderBy(newOrder)
    onOrderChange(newOrder)
  }, [orderType, orderProperty, setOrderBy, onOrderChange]);

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <IconButton
          variant={'circular'}
          disabled={orderType === OrderType.Ascending}
          onClick={() => {
            setOrderType(OrderType.Ascending)
            onClose()
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
        <IconButton
          variant={'circular'}
          disabled={orderType === OrderType.Descending}
          onClick={() => {
            setOrderType(OrderType.Descending)
            onClose()
          }}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Stack>
      {orderProperties.map((op) => (
        <MenuItem
          key={op.value}
          onClick={() => {
            setOrderProperty(op)
            onClose()
          }}>
          {op.icon && <ListItemIcon>{op.icon}</ListItemIcon>}
          <ListItemText>{op.displayName}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default SimpleOrderMenu;