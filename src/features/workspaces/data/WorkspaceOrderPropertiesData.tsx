import OrderProperty from "../../../types/OrderProperty.ts";
import WorkspacesOrderQueryParams from "../utils/WorkspacesOrderQueryParams.ts";

export const workspaceOrderProperties: OrderProperty[] = [
  { property: WorkspacesOrderQueryParams.LastActivity, displayName: 'Activity' },
  { property: WorkspacesOrderQueryParams.Name, displayName: 'Alphabetically' },
  { property: WorkspacesOrderQueryParams.CreatedDateTime, displayName: 'Newest' },
  { property: WorkspacesOrderQueryParams.UpdatedDateTime, displayName: 'Modified' },
]