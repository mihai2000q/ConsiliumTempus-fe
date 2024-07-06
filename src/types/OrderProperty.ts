import { ReactNode } from "react";

export default interface OrderProperty {
  property: string,
  displayName: string
  icon?: ReactNode | undefined,
}