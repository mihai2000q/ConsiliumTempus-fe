import { ReactNode } from "react";
import FilterOperator from "../../../utils/FilterOperator.ts";
import SearchQueryParamValue from "../../../types/SearchQueryParamValue.ts";
import { ChargingStationOutlined, Lock } from "@mui/icons-material";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";

interface ProjectFiltersMenuItem {
  icon: ReactNode,
  property: string,
  defaultOperator: FilterOperator,
  defaultValue: SearchQueryParamValue,
  title: string
}

export const projectFilterPropertiesData: ProjectFiltersMenuItem[] = [
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