import Order from '../types/Order.ts'
import { useState } from 'react'

export default function useOrderByQueryParam(
  initialOrder: Order | null = null
): [
  orderBy: string[],
  setOrderBy: (orders: Order[] | Order) => void
] {
  const [orderBy, setOrderBy] = useState<string[]>(
    initialOrder
      ? [createOrder(initialOrder)]
      : []
  )

  function constructOrderBy(arg: Order[] | Order) {
    if ((arg as Order).property !== undefined) {
      setOrderBy([createOrder(arg as Order)])
    } else {
      setOrderBy((arg as Order[]).map(createOrder))
    }
  }

  return [orderBy, constructOrderBy]
}

function createOrder(order: Order): string {
  return `${order.property}.${order.type}`
}
