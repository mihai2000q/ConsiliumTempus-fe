import FilterOperator from "../../../utils/enums/FilterOperator.ts";
import { CalendarTodayRounded, Lock } from "@mui/icons-material";
import FilterProperty from "../../../types/FilterProperty.ts";
import FilterPropertyValueType from "../../../utils/enums/FilterPropertyValueType.ts";
import { Dayjs } from "dayjs";
import WorkspacesSearchQueryParams from "../utils/WorkspacesSearchQueryParams.ts";

export const workspaceFilterPropertiesData: FilterProperty[] = [
  {
    icon: <Lock />,
    property: WorkspacesSearchQueryParams.IsPersonal,
    defaultOperator: FilterOperator.Equal,
    defaultValue: true,
    valueType: FilterPropertyValueType.Boolean,
    title: 'Private'
  },
  {
    icon: <CalendarTodayRounded />,
    property: WorkspacesSearchQueryParams.LastActivity,
    defaultOperator: FilterOperator.Equal,
    defaultValue: null as Dayjs | null,
    valueType: FilterPropertyValueType.PastDate,
    title: 'Activity'
  },
  {
    icon: <CalendarTodayRounded />,
    property: WorkspacesSearchQueryParams.CreatedDateTime,
    defaultOperator: FilterOperator.GreaterThan,
    defaultValue: null as Dayjs | null,
    valueType: FilterPropertyValueType.PastDate,
    title: 'Creation Date'
  },
  {
    icon: <CalendarTodayRounded />,
    property: WorkspacesSearchQueryParams.UpdatedDateTime,
    defaultOperator: FilterOperator.GreaterThan,
    defaultValue: null as Dayjs | null,
    valueType: FilterPropertyValueType.PastDate,
    title: 'Last Modified On'
  },
]