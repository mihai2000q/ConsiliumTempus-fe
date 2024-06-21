import OrderProperty from "../../../types/OrderProperty.ts";
import ProjectOrderQueryParams from "../utils/ProjectOrderQueryParams.ts";

export const projectOrderProperties: OrderProperty[] = [
  { value: ProjectOrderQueryParams.LastActivity, displayName: 'Activity' },
  { value: ProjectOrderQueryParams.Name, displayName: 'Alphabetically' },
  { value: ProjectOrderQueryParams.CreatedDateTime, displayName: 'Newest' },
  { value: ProjectOrderQueryParams.UpdatedDateTime, displayName: 'Modified' },
]