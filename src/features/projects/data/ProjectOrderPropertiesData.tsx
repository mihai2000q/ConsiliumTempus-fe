import OrderProperty from '../../../types/OrderProperty.ts'
import ProjectsOrderQueryParams from '../utils/ProjectsOrderQueryParams.ts'
import { CalendarIcon } from '@mui/x-date-pickers'
import { AbcOutlined } from '@mui/icons-material'

export const projectOrderProperties: OrderProperty[] = [
  {
    property: ProjectsOrderQueryParams.LastActivity,
    displayName: 'Activity',
    icon: <CalendarIcon />
  },
  {
    property: ProjectsOrderQueryParams.Name,
    displayName: 'Alphabetically',
    icon: <AbcOutlined />
  },
  {
    property: ProjectsOrderQueryParams.CreatedDateTime,
    displayName: 'Newest',
    icon: <CalendarIcon />
  },
  {
    property: ProjectsOrderQueryParams.UpdatedDateTime,
    displayName: 'Modified',
    icon: <CalendarIcon />
  }
]
