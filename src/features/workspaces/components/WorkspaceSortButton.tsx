import { Button } from '@mui/material'
import { ArrowDownward, ArrowUpward, Sort } from '@mui/icons-material'
import OrderType from '../../../utils/enums/OrderType.ts'
import { workspaceOrderProperties } from '../data/WorkspaceOrderPropertiesData.tsx'
import { useState } from 'react'
import SimpleOrderMenu from '../../../components/order/SimpleOrderMenu.tsx'
import Order from '../../../types/Order.ts'

interface WorkspaceSortButtonProps {
  initialOrder: Order,
  setOrderBy: (order: Order) => void
}

function WorkspaceSortButton({ initialOrder, setOrderBy }: WorkspaceSortButtonProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [order, setOrder] = useState<Order>(
    {
      ...workspaceOrderProperties.find(op => op.property === initialOrder.property)!,
      type: initialOrder.type
    }
  )

  return (
    <>
      <Button
        variant={'outlined'}
        startIcon={<Sort />}
        onClick={(e) => setMenuAnchorEl(e.currentTarget)}
        sx={{ boxShadow: 4 }}>
        {order.displayName}
        {order.type === OrderType.Descending
          ? <ArrowDownward sx={{ ml: 0.5 }} />
          : <ArrowUpward sx={{ ml: 0.5 }} />}
      </Button>

      <SimpleOrderMenu
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        initialOrder={initialOrder}
        orderProperties={workspaceOrderProperties}
        setOrderBy={setOrderBy}
        onOrderChange={setOrder} />
    </>
  )
}

export default WorkspaceSortButton
