import { MenuItem, Select } from "@mui/material";
import SearchQueryParamValue from "../../types/SearchQueryParamValue.ts";
import { Dispatch, SetStateAction } from "react";

interface FilterValueSelectorProps {
  value: SearchQueryParamValue,
  setValue: Dispatch<SetStateAction<SearchQueryParamValue>>
}

export default function FilterValueSelector({
  value,
  setValue
}: FilterValueSelectorProps) {
  return (
    typeof value === 'boolean'
      ? <BooleanSelector value={value} setValue={setValue} />
      : <></>
  )
}

function BooleanSelector({ value, setValue }: FilterValueSelectorProps) {
  value = value as boolean

  return (
    <Select
      size={'small'}
      value={value}
      onChange={(e) => setValue(e.target.value === 'true')}>
      <MenuItem value={'true'} disabled={value}>True</MenuItem>
      <MenuItem value={'false'} disabled={!value}>False</MenuItem>
    </Select>
  )
}