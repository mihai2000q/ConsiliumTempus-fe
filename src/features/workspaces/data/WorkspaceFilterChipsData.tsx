import { Lock } from "@mui/icons-material";
import FilterOperator from "../../../utils/enums/FilterOperator.ts";
import FilterChipItem from "../../../types/FilterChipItem.ts";
import FilterPropertyValueType from "../../../utils/enums/FilterPropertyValueType.ts";
import dayjs from "dayjs";
import { CalendarIcon } from "@mui/x-date-pickers";
import WorkspacesSearchQueryParams from "../utils/WorkspacesSearchQueryParams.ts";

export const workspaceFilterChipsData: FilterChipItem[] = [
  {
    icon: <Lock />,
    title: 'Personal',
    filters: [{
      property: WorkspacesSearchQueryParams.IsPersonal,
      operator: FilterOperator.Equal,
      value: true,
      valueType: FilterPropertyValueType.Boolean
    }]
  },
  {
    icon: <CalendarIcon />,
    title: 'Active this month',
    filters: [
      {
        property: WorkspacesSearchQueryParams.LastActivity,
        operator: FilterOperator.GreaterThanOrEqual,
        value: dayjs().startOf('month'),
        valueType: FilterPropertyValueType.PastDate
      },
      {
        property: WorkspacesSearchQueryParams.LastActivity,
        operator: FilterOperator.LessThanOrEqual,
        value: dayjs(),
        valueType: FilterPropertyValueType.PastDate
      }
    ]
  },
  {
    icon: <CalendarIcon />,
    title: 'Active this week',
    filters: [
      {
        property: WorkspacesSearchQueryParams.LastActivity,
        operator: FilterOperator.GreaterThanOrEqual,
        value: dayjs().subtract(1, 'week'),
        valueType: FilterPropertyValueType.PastDate
      },
      {
        property: WorkspacesSearchQueryParams.LastActivity,
        operator: FilterOperator.LessThanOrEqual,
        value: dayjs(),
        valueType: FilterPropertyValueType.PastDate
      }
    ]
  }
]