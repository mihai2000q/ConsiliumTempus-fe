import Order from '../../types/Order.ts'
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
} from '@mui/material'
import { useState } from 'react'
import { default as OrderPropertyModel } from './../../types/OrderProperty.ts'
import OrderType from '../../utils/enums/OrderType.ts'
import { Close, DragIndicator, NorthOutlined, SouthOutlined } from '@mui/icons-material'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

interface StyledOrderPropertyProps extends BoxProps {
  isDragHandleHovered: boolean
}

const StyledOrderProperty = styled(Box, {
  shouldForwardProp: (props) => props !== 'isDragHandleHovered'
})<StyledOrderPropertyProps>(({ theme, isDragHandleHovered }) => ({
  height: '55px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  border: `1px solid transparent`,
  padding: '8px',
  transition: theme.transitions.create(['border-color'], {
    duration: theme.transitions.duration.shorter
  }),
  ...(isDragHandleHovered && {
    borderColor: alpha(theme.palette.background[100], 0.2)
  })
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

  const [isDragHandleHovered, setIsDragHandleHovered] = useState(false)

  function handlePropertyChange(newProperty: string) {
    const newDisplayName = orderProperties
      .find(op => op.property === newProperty)
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id: property })

  return (
    <StyledOrderProperty
      isDragHandleHovered={isDragHandleHovered}
      ref={setNodeRef}
      {...attributes}
      sx={{
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: transform ? 'grabbing' : 'unset'
      }}>
      <IconButton
        ref={setActivatorNodeRef}
        {...listeners}
        onMouseEnter={() => setIsDragHandleHovered(true)}
        onMouseLeave={() => setIsDragHandleHovered(false)}
        disableRipple
        disabled={disableRemove === true}
        sx={{ cursor: transform ? 'unset' : 'grab' }}>
        <DragIndicator />
      </IconButton>

      <Select
        size={'small'}
        inputProps={{ IconComponent: () => null }}
        value={property}
        onChange={(e) => handlePropertyChange(e.target.value)}
        sx={{
          flexGrow: 1,
          alignSelf: 'stretch',
          '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
            paddingRight: '14px'
          },
          '& .MuiSelect-select': { p: '2px 14px', display: 'flex', alignItems: 'center' },
          '& .MuiListItemIcon-root': { mr: 1 }
        }}>
        {orderProperties.map((op) => (
          <MenuItem
            key={op.property}
            value={op.property}
            selected={property === op.property}
            disabled={orders.some(o => o.property === op.property)}
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
          alignSelf: 'stretch',
          '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
            paddingRight: '14px'
          },
          '& .MuiSelect-select': { p: '2px 14px', display: 'flex', alignItems: 'center' },
          '& .MuiListItemIcon-root': { mr: 1 }
        }}
        value={type}
        onChange={(e) => handleTypeChange(e.target.value as OrderType)}>
        <MenuItem
          value={OrderType.Ascending}
          selected={type === OrderType.Ascending}
          sx={{
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              mr: 0.75,
              '& .MuiSvgIcon-root': { fontSize: 18 }
            }
          }}>
          <ListItemIcon><NorthOutlined /></ListItemIcon>
          <ListItemText>Ascending</ListItemText>
        </MenuItem>
        <MenuItem
          value={OrderType.Descending}
          selected={type === OrderType.Descending}
          sx={{
            '& .MuiListItemIcon-root': {
              minWidth: 0,
              mr: 0.75,
              '& .MuiSvgIcon-root': { fontSize: 18 }
            }
          }}>
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
  )
}

export default OrderProperty
