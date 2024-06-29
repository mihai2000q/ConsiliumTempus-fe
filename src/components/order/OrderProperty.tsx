import Order from "../../types/Order.ts";
import {
  alpha,
  Box,
  BoxProps,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  styled,
  Tooltip
} from "@mui/material";
import { useState } from "react";
import { default as OrderPropertyModel } from './../../types/OrderProperty.ts'
import OrderType from "../../utils/enums/OrderType.ts";
import { Close, DragIndicator, NorthOutlined, SouthOutlined } from "@mui/icons-material";

const StyledOrderProperty = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  border: `1px solid transparent`,
  padding: '8px',
  transition: theme.transitions.create(['border-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    borderColor: alpha(theme.palette.background[100], 0.2)
  }
}))

interface OrderPropertyProps {
  initialOrder: Order,
  orders: Order[],
  index: number,
  orderProperties: OrderPropertyModel[];
  handleOrder: (index: number, order: Order) => void,
  handleRemoveOrder: (order: Order) => void,
  disableRemove?: boolean
}

function OrderProperty({
  initialOrder,
  orders,
  index,
  orderProperties,
  handleOrder,
  handleRemoveOrder,
  disableRemove
}: OrderPropertyProps) {
  const [property, setProperty] = useState(initialOrder.property)
  const [type, setType] = useState(initialOrder.type)
  const [displayName, setDisplayName] = useState(initialOrder.displayName)

  function handlePropertyChange(newProperty: string) {
    const newDisplayName = orderProperties
      .find(op => op.value === newProperty)
      ?.displayName ?? ''

    setProperty(newProperty)
    setDisplayName(newDisplayName)
    handleOrder(index, { property: newProperty, type, displayName: newDisplayName })
  }
  function handleTypeChange(newType: OrderType) {
    setType(newType)
    handleOrder(index, { property, type: newType, displayName })
  }
  function handleRemoveCurrentOrder() {
    handleRemoveOrder({ property, type, displayName })
  }

  return (
    <StyledOrderProperty>
      <IconButton disableRipple disabled={disableRemove === true} sx={{ cursor: 'grab' }}>
        <DragIndicator />
      </IconButton>

      <Select
        size={'small'}
        inputProps={{ IconComponent: () => null }}
        value={property}
        onChange={(e) => handlePropertyChange(e.target.value)}
        sx={{
          flexGrow: 1,
          '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
            paddingRight: '14px'
          },
          '& .MuiSelect-select': { p: '2px 14px', display: 'flex', alignItems: 'center' },
          '& .MuiListItemIcon-root': { mr: '6px' }
        }}>
        {orderProperties.map((op) => (
          <MenuItem
            key={op.value}
            value={op.value}
            selected={property === op.value}
            disabled={orders.find(o => o.property === op.value) !== undefined}
            sx={{
              '& .MuiListItemIcon-root': {
                minWidth: 0,
                mr: 0.75,
                '& .MuiSvgIcon-root': { fontSize: 18 }
              }
            }}>
            <ListItemIcon>{op.icon}</ListItemIcon>
            <ListItemText sx={{ pt: 0.5 }}>{op.displayName}</ListItemText>
          </MenuItem>
        ))}
      </Select>

      <Select
        size={'small'}
        inputProps={{ IconComponent: () => null }}
        sx={{
          minWidth: 200,
          '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
            paddingRight: '14px'
          },
          '& .MuiSelect-select': { p: '2px 14px', display: 'flex', alignItems: 'center' },
          '& .MuiListItemIcon-root': { mr: '6px' }
        }}
        value={type}
        onChange={(e) => handleTypeChange(e.target.value as OrderType)}>
        <MenuItem value={OrderType.Ascending} selected={type === OrderType.Ascending}>
          <ListItemIcon><NorthOutlined /></ListItemIcon>
          <ListItemText>Ascending</ListItemText>
        </MenuItem>
        <MenuItem value={OrderType.Descending} selected={type === OrderType.Descending}>
          <ListItemIcon><SouthOutlined /></ListItemIcon>
          <ListItemText sx={{ pt: 0.5 }}>Descending</ListItemText>
        </MenuItem>
      </Select>

      <Tooltip
        arrow
        disableHoverListener={disableRemove === true}
        enterDelay={500}
        placement={'top'}
        title={'Remove Order'}>
        <span>
            <IconButton
              variant={'circular'}
              size={'small'}
              disabled={disableRemove === true}
              onClick={handleRemoveCurrentOrder}>
              <Close sx={{ fontSize: 17, m: '1px' }} />
            </IconButton>
        </span>
      </Tooltip>
    </StyledOrderProperty>
  );
}

export default OrderProperty;