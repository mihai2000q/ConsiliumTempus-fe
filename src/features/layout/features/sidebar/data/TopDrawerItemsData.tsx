import DrawerItem from "../types/DrawerItem.ts";
import { CalendarMonth, CheckBox, Home } from "@mui/icons-material";
import Paths from "../../../../../utils/Paths.ts";

const topDrawerItems: DrawerItem[] = [
  {
    text: 'Home',
    icon: (<Home />),
    link: Paths.Home
  },
  {
    text: 'My Tasks',
    icon: (<CheckBox />),
    link: Paths.Tasks
  },
  {
    text: 'Calendar',
    icon: (<CalendarMonth />),
    link: Paths.Calendar
  },
]

export default topDrawerItems;