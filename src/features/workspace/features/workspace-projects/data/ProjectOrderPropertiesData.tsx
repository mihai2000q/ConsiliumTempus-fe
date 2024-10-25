import ProjectsOrderQueryParams from '../utils/ProjectsOrderQueryParams.ts'
import OrderProperty from '../../../../../types/OrderProperty.ts'

export const projectOrderProperties: OrderProperty[] = [
  { property: ProjectsOrderQueryParams.LastActivity, displayName: 'Activity' },
  { property: ProjectsOrderQueryParams.Name, displayName: 'Alphabetically' },
  { property: ProjectsOrderQueryParams.CreatedDateTime, displayName: 'Newest' },
  { property: ProjectsOrderQueryParams.UpdatedDateTime, displayName: 'Modified' }
]
