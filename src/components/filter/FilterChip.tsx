import { ReactNode, useCallback, useEffect, useState } from "react";
import { alpha, Chip, Stack, Typography, useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";
import { Filter } from "../../types/Filter.ts";

interface FilterChipProps {
  title: string,
  icon: ReactNode,
  filters: Filter[],
  filter: Filter,
  handleFilter: (filter: Filter) => void,
  removeFilter: (filter: Filter) => void,
}

function FilterChip({
  title,
  icon,
  filter,
  filters,
  handleFilter,
  removeFilter,
}: FilterChipProps) {
  const theme = useTheme()

  const [selected, setSelected] = useState(false)
  const isSelected = useCallback(() => {
    return filters.some(f =>
      f.property === filter.property &&
      f.operator === filter.operator &&
      f.value === filter.value)
  }, [filters, filter])
  useEffect(() => {
    setSelected(isSelected())
  }, [isSelected])

  function handleClick() {
    if (!selected)
      handleFilter(filter)
    else
      removeFilter(filter)
  }

  return (
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
      onClick={handleClick}
      sx={{
        ...((selected && {
          backgroundColor: alpha(theme.palette.primary[700], 0.3),
          borderColor: theme.palette.primary[300],
          color: theme.palette.primary[300]
        }))
      }}/>
  )
}

export default FilterChip