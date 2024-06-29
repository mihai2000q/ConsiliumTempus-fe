import OrderType from "../utils/enums/OrderType.ts";

export default interface Order {
  property: string,
  type: OrderType,
  displayName?: string | undefined,
}