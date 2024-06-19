import { CheckCircleOutlineRounded, Lock, TrendingDown, TrendingUp } from "@mui/icons-material";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";
import FilterOperator from "../../../utils/FilterOperator.ts";
import FilterChipItem from "../../../types/FilterChipItem.ts";
import ProjectStatusType from "../../../utils/project/ProjectStatusType.ts";
import FilterPropertyValueType from "../../../utils/FilterPropertyValueType.ts";
import dayjs from "dayjs";
import { CalendarIcon } from "@mui/x-date-pickers";

export const projectFilterChipsData: FilterChipItem[] = [
  {
    icon: <TrendingUp />,
    title: 'On Track',
    filters: [{
      property: ProjectsSearchQueryParams.LatestStatus,
      operator: FilterOperator.Equal,
      value: ProjectStatusType.OnTrack,
      valueType: FilterPropertyValueType.ProjectStatusType
    }]
  },
  {
    icon: <TrendingDown />,
    title: 'Off Track',
    filters: [{
      property: ProjectsSearchQueryParams.LatestStatus,
      operator: FilterOperator.Equal,
      value: ProjectStatusType.OffTrack,
      valueType: FilterPropertyValueType.ProjectStatusType
    }]
  },
  {
    icon: <CheckCircleOutlineRounded />,
    title: 'Completed',
    filters: [{
      property: ProjectsSearchQueryParams.LatestStatus,
      operator: FilterOperator.Equal,
      value: ProjectStatusType.Completed,
      valueType: FilterPropertyValueType.ProjectStatusType
    }],
  },
  {
    icon: <Lock />,
    title: 'Private',
    filters: [{
      property: ProjectsSearchQueryParams.IsPrivate,
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
        property: ProjectsSearchQueryParams.LastActivity,
        operator: FilterOperator.GreaterThanOrEqual,
        value: dayjs().startOf('month'),
        valueType: FilterPropertyValueType.PastDate
      },
      {
        property: ProjectsSearchQueryParams.LastActivity,
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
        property: ProjectsSearchQueryParams.LastActivity,
        operator: FilterOperator.GreaterThanOrEqual,
        value: dayjs().subtract(1, 'week'),
        valueType: FilterPropertyValueType.PastDate
      },
      {
        property: ProjectsSearchQueryParams.LastActivity,
        operator: FilterOperator.LessThanOrEqual,
        value: dayjs(),
        valueType: FilterPropertyValueType.PastDate
      }
    ]
  }
]