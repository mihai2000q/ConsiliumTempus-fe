import { ReactNode, useEffect, useState } from "react";
import { alpha, Chip, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";
import { Filter } from "../../types/Filter.ts";

interface FilterChipProps {
  title: string,
  icon: ReactNode,
  allFilters: Filter[],
  filters: Filter[],
  handleFilters: (filters: Filter[]) => void,
  removeFilters: (filters: Filter[]) => void,
}

function FilterChip({
  title,
  icon,
  filters,
  allFilters,
  handleFilters,
  removeFilters,
}: FilterChipProps) {
  const theme = useTheme()

  const [selected, setSelected] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const isSelected = (filters: Filter[]) => {
    for (const filter of filters) {
      const res = allFilters.some(f =>
        f.property === filter.property &&
        f.operator === filter.operator &&
        f.value === filter.value
      )
      if (!res) return false
    }
    return true
  }
  
  const isDisabled = (selected: boolean, filters: Filter[]) => {
    if (selected) return false

    for (const filter of filters) {
      const res = allFilters.some(f =>
        f.property === filter.property &&
        f.operator === filter.operator
      )
      if (res) return true
    }

    return false
  }
  
  useEffect(() => {
    const selected = isSelected(filters)
    setSelected(selected)
    setDisabled(isDisabled(selected, filters))
  }, [allFilters, filters]) // TODO: check for filters (Reference Equality)

  function handleClick() {
    if (selected)
      removeFilters(filters)
    else
      handleFilters(filters)
  }

  return (
    <Tooltip
      arrow
      describeChild
      placement={'top'}
      disableHoverListener={!disabled}
      disableFocusListener={!disabled}
      disableTouchListener={!disabled}
      title={`Same property with operator${filters.length > 1 ? 's' : ''} is already active`}>
      <span>
        <Chip
          variant={'outlined'}
          label={
            <Stack
              direction={'row'}
              alignItems={'center'}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 17,
                  ...((selected && {
                    color: theme.palette.primary[300]
                  }))
                }
              }}>
              {selected ? <Check /> : icon}
              <Typography ml={0.5} pt={'3px'}>{title}</Typography>
            </Stack>
          }
          clickable
          disabled={disabled}
          onClick={handleClick}
          sx={{
            ...((selected && {
              backgroundColor: alpha(theme.palette.primary[700], 0.3),
              borderColor: theme.palette.primary[300],
              color: theme.palette.primary[300]
            }))
          }}/>
      </span>
    </Tooltip>
  )
}

export default FilterChip