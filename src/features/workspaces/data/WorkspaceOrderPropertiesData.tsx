import OrderProperty from "../../../types/OrderProperty.ts";
import WorkspacesOrderQueryParams from "../utils/WorkspacesOrderQueryParams.ts";

export const workspaceOrderProperties: OrderProperty[] = [
  { value: WorkspacesOrderQueryParams.LastActivity, displayName: 'Activity' },
  { value: WorkspacesOrderQueryParams.Name, displayName: 'Alphabetically' },
  { value: WorkspacesOrderQueryParams.CreatedDateTime, displayName: 'Newest' },
  { value: WorkspacesOrderQueryParams.UpdatedDateTime, displayName: 'Modified' },
]