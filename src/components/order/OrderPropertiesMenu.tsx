import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import OrderProperty from "../../types/OrderProperty.ts";
import Order from "../../types/Order.ts";

interface OrderPropertiesMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  orders: Order[],
  orderProperties: OrderProperty[],
  onClick: (orderProperty: OrderProperty) => void
}

function OrderPropertiesMenu({
  anchorEl,
  onClose,
  orders,
  orderProperties,
  onClick
}: OrderPropertiesMenuProps) {
  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}>
      {orderProperties.map((op) => (
        <MenuItem
          key={op.value}
          disabled={orders.find(o => o.property === op.value) !== undefined}
          onClick={() => {
            onClick(op)
            onClose()
          }}>
          {op.icon && <ListItemIcon>{op.icon}</ListItemIcon>}
          <ListItemText>{op.displayName}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default OrderPropertiesMenu;