import { ReactNode } from "react";
import { Filter } from "./Filter.ts";

export default interface FilterChipItem {
  icon: ReactNode,
  title: string,
  filter: Filter,
}