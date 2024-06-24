import DrawerItem from "../types/DrawerItem.ts";
import { CalendarMonth, ChecklistRounded, HomeRounded } from "@mui/icons-material";
import Paths from "../../../../../utils/enums/Paths.ts";

const topDrawerItems: DrawerItem[] = [
  {
    text: 'Home',
    icon: (<HomeRounded />),
    link: Paths.Home
  },
  {
    text: 'My Tasks',
    icon: (<ChecklistRounded />),
    link: Paths.Tasks
  },
  {
    text: 'Calendar',
    icon: (<CalendarMonth />),
    link: Paths.Calendar
  },
]

export default topDrawerItems;