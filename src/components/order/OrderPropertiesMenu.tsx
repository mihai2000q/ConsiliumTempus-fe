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
      onClose={onClose}
      sx={{
        '& .MuiListItemIcon-root': { minWidth: 0, mr: 1 }
      }}>
      {orderProperties.map((op) => (
        <MenuItem
          key={op.property}
          disabled={orders.find(o => o.property === op.property) !== undefined}
          onClick={() => {
            onClick(op)
            onClose()
          }}>
          {op.icon && <ListItemIcon>{op.icon}</ListItemIcon>}
          <ListItemText sx={{ pt: 0.5 }}>{op.displayName}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default OrderPropertiesMenu;