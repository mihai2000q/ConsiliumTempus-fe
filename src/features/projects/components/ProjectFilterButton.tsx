import { FilterAlt } from "@mui/icons-material";
import { Badge, Button } from "@mui/material";
import { useState } from "react";
import { addToSearchQueryParamType, removeFromSearchQueryParamType } from "../../../hooks/useSearchQueryParam.ts";
import FilterMenu from "../../../components/filter/FilterMenu.tsx";
import { projectsSearchQueryParamsFilterOperators } from "../utils/ProjectsSearchQueryParamsFilterOperators.ts";
import { projectFilterPropertiesData } from "../data/ProjectFilterPropertiesData.tsx";
import { projectFilterChipsData } from "../data/ProjectFilterChipsData.tsx";

interface ProjectFilterButtonProps {
  addToSearchQueryParam: addToSearchQueryParamType
  removeFromSearchQueryParam: removeFromSearchQueryParamType
}

function ProjectFilterButton({
  addToSearchQueryParam,
  removeFromSearchQueryParam
} : ProjectFilterButtonProps) {
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
        filterChips={projectFilterChipsData}
        filterProperties={projectFilterPropertiesData}
        operatorsMap={projectsSearchQueryParamsFilterOperators}
        onSizeChange={setFiltersSize}
      />
    </>
  );
}

export default ProjectFilterButton;