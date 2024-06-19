import FilterOperator from "../../../utils/FilterOperator.ts";
import { CalendarTodayRounded, ChargingStationOutlined, Lock } from "@mui/icons-material";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";
import FilterProperty from "../../../types/FilterProperty.ts";
import FilterPropertyValueType from "../../../utils/FilterPropertyValueType.ts";
import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";
import { Dayjs } from "dayjs";

export const projectFilterPropertiesData: FilterProperty[] = [
  {
    icon: <Lock />,
    property: ProjectsSearchQueryParams.IsPrivate,
    defaultOperator: FilterOperator.Equal,
    defaultValue: true,
    valueType: FilterPropertyValueType.Boolean,
    title: 'Private'
  },
  {
    icon: <ChargingStationOutlined />,
    property: ProjectsSearchQueryParams.LatestStatus,
    defaultOperator: FilterOperator.Equal,
    defaultValue: ProjectStatusType.OnTrack,
    valueType: FilterPropertyValueType.ProjectStatusType,
    title: 'Status'
  },
  {
    icon: <CalendarTodayRounded />,
    property: ProjectsSearchQueryParams.LastActivity,
    defaultOperator: FilterOperator.Equal,
    defaultValue: null as Dayjs | null,
    valueType: FilterPropertyValueType.PastDate,
    title: 'Activity'
  },
  {
    icon: <CalendarTodayRounded />,
    property: ProjectsSearchQueryParams.CreatedDateTime,
    defaultOperator: FilterOperator.GreaterThan,
    defaultValue: null as Dayjs | null,
    valueType: FilterPropertyValueType.PastDate,
    title: 'Creation Date'
  },
  {
    icon: <CalendarTodayRounded />,
    property: ProjectsSearchQueryParams.UpdatedDateTime,
    defaultOperator: FilterOperator.GreaterThan,
    defaultValue: null as Dayjs | null,
    valueType: FilterPropertyValueType.PastDate,
    title: 'Last Modified On'
  },
]