import { ReactElement } from "react";

export default interface DrawerItem {
  text: string,
  icon?: ReactElement,
  link: string
}