import { MenuItem } from "@mui/material";
import SearchQueryParamValue from "../../types/SearchQueryParamValue.ts";
import { Dispatch, SetStateAction } from "react";
import ProjectStatusType from "../../utils/project/ProjectStatusType.ts";
import normalize from "../../utils/normalize.ts";
import FilterSelector from "./FilterSelector.tsx";
import { DatePicker } from "@mui/x-date-pickers";
import FilterPropertyValueType from "../../utils/FilterPropertyValueType.ts";
import { Dayjs } from "dayjs";

interface FilterValueSelectorProps {
  type: FilterPropertyValueType,
  value: SearchQueryParamValue,
  setValue: Dispatch<SetStateAction<SearchQueryParamValue>>
}

interface ValueSelectorProps {
  value: SearchQueryParamValue,
  setValue: Dispatch<SetStateAction<SearchQueryParamValue>>
}

export default function FilterValueSelector({
  type,
  value,
  setValue
}: FilterValueSelectorProps) {
  switch (type) {
    case FilterPropertyValueType.Boolean:
      return <BooleanSelector value={value} setValue={setValue} />
    case FilterPropertyValueType.ProjectStatusType:
      return <ProjectStatusTypeSelector value={value} setValue={setValue} />
    case FilterPropertyValueType.PastDate:
      return <PastDateSelector value={value} setValue={setValue} />
  }
}

function BooleanSelector({ value, setValue }: ValueSelectorProps) {
  value = value as boolean

  return (
    <FilterSelector
      value={value}
      onChange={(v) => setValue(v === 'true')}>
      <MenuItem value={'true'} disabled={value}>True</MenuItem>
      <MenuItem value={'false'} disabled={!value}>False</MenuItem>
    </FilterSelector>
  )
}

function ProjectStatusTypeSelector({ value, setValue }: ValueSelectorProps) {
  value = value as ProjectStatusType

  return (
    <FilterSelector
      value={value}
      onChange={(v) => setValue(v)}>
      {Object.values(ProjectStatusType).map(s => (
        <MenuItem key={s} value={s} disabled={value === s}>{normalize(s)}</MenuItem>
      ))}
    </FilterSelector>
  )
}

function PastDateSelector({ value, setValue }: ValueSelectorProps) {
  value = value as Dayjs | null

  return (
    <DatePicker
      format={'DD/MM/YYYY'}
      disableFuture
      value={value}
      onChange={(e) => setValue(e)}
      sx={{
        '& .MuiInputBase-input': {
          paddingY: '8.5px',
          width: 76
        },
        '& .MuiInputAdornment-root': {
          paddingRight: '2px'
        }
      }}/>
  )
}