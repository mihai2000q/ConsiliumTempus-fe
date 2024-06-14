import { CheckCircleOutlineRounded, Lock, TrendingDown, TrendingUp } from "@mui/icons-material";
import ProjectsSearchQueryParams from "../utils/ProjectsSearchQueryParams.ts";
import FilterOperator from "../../../utils/FilterOperator.ts";
import FilterChipItem from "../../../types/FilterChipItem.ts";

export const projectFilterChipsData: FilterChipItem[] = [
  {
    icon: <TrendingUp />,
    title: 'On Track',
    filter: {
      property: ProjectsSearchQueryParams.LatestStatus,
      operator: FilterOperator.Equal,
      value: 'OnTrack'
    }
  },
  {
    icon: <TrendingDown />,
    title: 'Off Track',
    filter: {
      property: ProjectsSearchQueryParams.LatestStatus,
      operator: FilterOperator.Equal,
      value: 'OffTrack'
    }
  },
  {
    icon: <CheckCircleOutlineRounded />,
    title: 'Completed',
    filter: {
      property: ProjectsSearchQueryParams.LatestStatus,
      operator: FilterOperator.Equal,
      value: 'Completed'
    },
  },
  {
    icon: <Lock />,
    title: 'Private',
    filter: {
      property: ProjectsSearchQueryParams.IsPrivate,
      operator: FilterOperator.Equal,
      value: true
    }
  }
]