import { FilterAlt } from '@mui/icons-material'
import { Badge, Button } from '@mui/material'
import { addToSearchQueryParamType, removeFromSearchQueryParamType } from '../../../hooks/useSearchQueryParam.ts'
import { useState } from 'react'
import FilterMenu from '../../../components/filter/FilterMenu.tsx'
import { workspaceFilterChipsData } from '../data/WorkspaceFilterChipsData.tsx'
import { workspaceFilterPropertiesData } from '../data/WorkspaceFilterPropertiesData.tsx'
import { workspacesSearchQueryParamsFilterOperators } from '../utils/WorkspacesSearchQueryParamsFilterOperators.ts'

interface WorkspaceFilterButtonProps {
  addToSearchQueryParam: addToSearchQueryParamType
  removeFromSearchQueryParam: removeFromSearchQueryParamType
}

function WorkspaceFilterButton({
                                 addToSearchQueryParam,
                                 removeFromSearchQueryParam
                               }: WorkspaceFilterButtonProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [filtersSize, setFiltersSize] = useState(0)

  return (
    <>
      <Badge badgeContent={filtersSize} color={'primary'}>
        <Button
          variant={'outlined'}
          startIcon={<FilterAlt />}
          onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          sx={{ boxShadow: 4 }}>
          Filter
        </Button>
      </Badge>

      <FilterMenu
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        addToSearchQueryParam={addToSearchQueryParam}
        removeFromSearchQueryParam={removeFromSearchQueryParam}
        filterChips={workspaceFilterChipsData}
        filterProperties={workspaceFilterPropertiesData}
        operatorsMap={workspacesSearchQueryParamsFilterOperators}
        onSizeChange={setFiltersSize}
      />
    </>
  )
}

export default WorkspaceFilterButton
