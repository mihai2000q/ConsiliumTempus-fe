import OrderProperty from "../../../types/OrderProperty.ts";
import ProjectsOrderQueryParams from "../utils/ProjectsOrderQueryParams.ts";
import { CalendarIcon } from "@mui/x-date-pickers";
import { AbcOutlined } from "@mui/icons-material";

export const projectOrderProperties: OrderProperty[] = [
  {
    value: ProjectsOrderQueryParams.LastActivity,
    displayName: 'Activity',
    icon: <CalendarIcon />
  },
  {
    value: ProjectsOrderQueryParams.Name,
    displayName: 'Alphabetically',
    icon: <AbcOutlined />
  },
  {
    value: ProjectsOrderQueryParams.CreatedDateTime,
    displayName: 'Newest',
    icon: <CalendarIcon />
  },
  {
    value: ProjectsOrderQueryParams.UpdatedDateTime,
    displayName: 'Modified',
    icon: <CalendarIcon />
  },
]