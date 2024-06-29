import { useEffect, useState } from "react";
import OrderType from "../../utils/enums/OrderType.ts";
import Order from "../../types/Order.ts";
import OrderPropertiesMenu from "./OrderPropertiesMenu.tsx";
import { Button, Collapse, Menu, Stack, Typography } from "@mui/material";
import {default as OrderPropertyModel} from "../../types/OrderProperty.ts";
import { AddRounded } from "@mui/icons-material";
import OrderProperty from "./OrderProperty.tsx";
import useUpdateEffect from "../../hooks/useUpdateEffect.ts";

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
      property: orderProperty.value,
      displayName: orderProperty.displayName,
      type: OrderType.Ascending,
    })
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
          <Stack pt={2} pb={1} width={550} spacing={2}>
            <Stack px={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography fontSize={16}>Sort</Typography>
              {!initialOrder && <Button variant={'alt-text'} size={'small'} onClick={handleClear}>
                Clear
              </Button>}
            </Stack>

            <Stack px={2} spacing={0.5}>
              {orders.map((order, index) => (
                <Collapse key={JSON.stringify(order)} in={true}>
                  <OrderProperty
                    initialOrder={order}
                    orders={orders}
                    index={index}
                    orderProperties={orderProperties}
                    handleOrder={handleOrder}
                    handleRemoveOrder={handleRemoveOrder}
                    disableRemove={initialOrder && orders.length === 1}
                  />
                </Collapse>
              ))}
            </Stack>

            <Button
              variant={'alt-text'}
              startIcon={<AddRounded />}
              onClick={(e) => setOrderPropertiesMenuAnchorEl(e.currentTarget)}
              sx={{ alignSelf: 'start', pl: 3 }}>
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