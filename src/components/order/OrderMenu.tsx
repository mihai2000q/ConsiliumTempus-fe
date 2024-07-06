import { useEffect, useState } from "react";
import OrderType from "../../utils/enums/OrderType.ts";
import Order from "../../types/Order.ts";
import OrderPropertiesMenu from "./OrderPropertiesMenu.tsx";
import { Button, Collapse, Menu, Stack, Typography } from "@mui/material";
import { default as OrderPropertyModel } from "../../types/OrderProperty.ts";
import { AddRounded } from "@mui/icons-material";
import OrderProperty from "./OrderProperty.tsx";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { TransitionGroup } from "react-transition-group";

interface OrderMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  orderProperties: OrderPropertyModel[],
  setOrderBy: (orders: Order[]) => void,
  initialOrder?: Order | undefined,
  onSizeChange?: (size: number) => void
}

function OrderMenu({
  anchorEl,
  onClose,
  orderProperties,
  initialOrder,
  setOrderBy,
  onSizeChange
}: OrderMenuProps) {
  const [orderPropertiesMenuAnchorEl, setOrderPropertiesMenuAnchorEl] =
    useState<HTMLElement | null>(null)

  const [orders, setOrders] =
    useState<Order[]>(initialOrder ? [initialOrder] : [])
  useEffect(() => {
    if (onSizeChange) onSizeChange(orders.length)
  }, [onSizeChange, orders.length]);
  useUpdateEffect(() => {
    setOrderBy(orders)
  }, [orders])

  function handleClear() {
    setOrders([])
  }

  function handleOrder(index: number, order: Order) {
    setOrders(orders.map((o, i) => i === index ? order : o))
  }

  function handleAddOrder(order: Order) {
    setOrders([...orders, order])
  }

  function handleRemoveOrder(order: Order) {
    setOrders([...orders.filter(o => o.property !== order.property)])
  }

  function handleOrderPropertyClick(orderProperty: OrderPropertyModel) {
    handleAddOrder({
      property: orderProperty.property,
      displayName: orderProperty.displayName,
      type: OrderType.Ascending,
    })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setOrders((orders) => {
        const oldIndex = orders.findIndex(o => o.property === active.id);
        const newIndex = orders.findIndex(o => o.property === over.id);

        return arrayMove(orders, oldIndex, newIndex);
      });
    }
  }

  return (
    orders.length === 0
      ? <OrderPropertiesMenu
        anchorEl={anchorEl}
        onClose={onClose}
        orderProperties={orderProperties}
        orders={orders}
        onClick={handleOrderPropertyClick} />
      : (
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
          <Stack pt={2} pb={1} width={550} gap={2} alignItems={'start'}>
            <Stack px={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography fontSize={16}>Sort</Typography>
              {!initialOrder && <Button variant={'alt-text'} size={'small'} onClick={handleClear}>
                Clear
              </Button>}
            </Stack>

            <DndContext
              modifiers={[restrictToFirstScrollableAncestor]}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}>
              <SortableContext strategy={verticalListSortingStrategy} items={orders.map((o) => o.property)}>
                <TransitionGroup style={{ display: 'block', width: '100%', gap: '4px', padding: '0 16px' }}>
                  {orders.map((order, index) => (
                    <Collapse key={JSON.stringify(order)}>
                      <OrderProperty
                        initialOrder={order}
                        orders={orders}
                        index={index}
                        orderProperties={orderProperties}
                        handleOrder={handleOrder}
                        handleRemoveOrder={handleRemoveOrder}
                        disableRemove={initialOrder && orders.length === 1} />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </SortableContext>
            </DndContext>

            <Button
              variant={'alt-text'}
              startIcon={<AddRounded />}
              onClick={(e) => setOrderPropertiesMenuAnchorEl(e.currentTarget)}
              sx={{ ml: 2 }}>
              Add Sort
            </Button>
            <OrderPropertiesMenu
              anchorEl={orderPropertiesMenuAnchorEl}
              onClose={() => setOrderPropertiesMenuAnchorEl(null)}
              orderProperties={orderProperties}
              orders={orders}
              onClick={handleOrderPropertyClick} />
          </Stack>
        </Menu>
      )
  );
}

export default OrderMenu;