import FilterOperator from "../../../utils/FilterOperator.ts";
import { ChargingStationOutlined, Lock } from "@mui/icons-material";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";
import FilterProperty from "../../../types/FilterProperty.ts";

export const projectFilterPropertiesData: FilterProperty[] = [
  {
    icon: <Lock />,
    property: ProjectsSearchQueryParams.IsPrivate,
    defaultOperator: FilterOperator.Equal,
    defaultValue: true,
    title: 'Private'
  },
  {
    icon: <ChargingStationOutlined />,
    property: ProjectsSearchQueryParams.LatestStatus,
    defaultOperator: FilterOperator.Equal,
    defaultValue: 'OnTrack',
    title: 'Status'
  }
]