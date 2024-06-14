import { MenuItem } from "@mui/material";
import SearchQueryParamValue from "../../types/SearchQueryParamValue.ts";
import { Dispatch, SetStateAction } from "react";
import ProjectStatusType from "../../utils/project/ProjectStatusType.ts";
import normalize from "../../utils/normalize.ts";
import FilterSelector from "./FilterSelector.tsx";

interface FilterValueSelectorProps {
  value: SearchQueryParamValue,
  setValue: Dispatch<SetStateAction<SearchQueryParamValue>>
}

export default function FilterValueSelector({
  value,
  setValue
}: FilterValueSelectorProps) {

  switch (typeof value) {
    case "boolean":
      return <BooleanSelector value={value} setValue={setValue} />
    case "string":
      switch (true) {
        case Object.values(ProjectStatusType).find(s => s === value) !== undefined:
          return <ProjectStatusTypeSelector value={value} setValue={setValue} />
        default: return <></>
      }
    default:
      return <></>
  }
}

function BooleanSelector({ value, setValue }: FilterValueSelectorProps) {
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

function ProjectStatusTypeSelector({ value, setValue }: FilterValueSelectorProps) {
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