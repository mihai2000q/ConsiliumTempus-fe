import ProjectsOrderQueryParams from "../utils/ProjectsOrderQueryParams.ts";
import OrderProperty from "../../../../../types/OrderProperty.ts";

export const projectOrderProperties: OrderProperty[] = [
  {
    value: ProjectsOrderQueryParams.LastActivity,
    displayName: 'Activity'
  },
  {
    value: ProjectsOrderQueryParams.Name,
    displayName: 'Alphabetically'
  },
  {
    value: ProjectsOrderQueryParams.CreatedDateTime,
    displayName: 'Newest'
  }
]