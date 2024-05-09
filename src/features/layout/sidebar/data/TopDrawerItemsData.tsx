import DrawerItem from "../types/DrawerItem.ts";
import { CalendarMonth, CheckBox, Home } from "@mui/icons-material";
import Paths from "../../../../utils/Paths.ts";

const topDrawerItems: DrawerItem[] = [
  {
    text: 'Home',
    icon: (<Home />),
    link: Paths.home
  },
  {
    text: 'My Tasks',
    icon: (<CheckBox />),
    link: Paths.tasks
  },
  {
    text: 'Calendar',
    icon: (<CalendarMonth />),
    link: Paths.calendar
  },
]

export default topDrawerItems;