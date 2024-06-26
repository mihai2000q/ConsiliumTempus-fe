import OrderProperty from "../../../types/OrderProperty.ts";
import ProjectsOrderQueryParams from "../utils/ProjectsOrderQueryParams.ts";

export const projectOrderProperties: OrderProperty[] = [
  { value: ProjectsOrderQueryParams.LastActivity, displayName: 'Activity' },
  { value: ProjectsOrderQueryParams.Name, displayName: 'Alphabetically' },
  { value: ProjectsOrderQueryParams.CreatedDateTime, displayName: 'Newest' },
  { value: ProjectsOrderQueryParams.UpdatedDateTime, displayName: 'Modified' },
]