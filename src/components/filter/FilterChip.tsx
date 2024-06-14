import { ReactNode, useCallback, useEffect, useState } from "react";
import { alpha, Chip, Stack, Tooltip, Typography, useTheme } from "@mui/material";
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
      f.value === filter.value
    )
  }, [filters, filter]) // TODO: Really necessary to use callback ? and if it is, check for filter (Reference Equality)
  useEffect(() => {
    setSelected(isSelected())
  }, [isSelected])

  const [disabled, setDisabled] = useState(false)
  const isDisabled = useCallback(() => {
    return filters.some(f =>
      f.property === filter.property &&
      f.operator === filter.operator
    ) && !selected
  }, [filters, filter, selected])
  useEffect(() => {
    setDisabled(isDisabled())
  }, [isDisabled])

  function handleClick() {
    if (selected)
      removeFilter(filter)
    else
      handleFilter(filter)
  }

  return (
    <Tooltip
      arrow
      describeChild
      placement={'top'}
      disableHoverListener={!disabled}
      disableFocusListener={!disabled}
      disableTouchListener={!disabled}
      title={'Same property with operator is already active'}>
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