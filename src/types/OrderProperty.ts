import { ReactNode } from "react";

export default interface OrderProperty {
  value: string,
  displayName: string
  icon?: ReactNode | undefined,
}