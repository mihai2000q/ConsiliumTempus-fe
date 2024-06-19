import { ReactNode } from "react";
import { Select, SxProps, Theme } from "@mui/material";

interface FilterSelectorProps<TValue>{
  children: ReactNode,
  value: TValue,
  onChange: (newValue: TValue | string) => void,
  sx?: SxProps<Theme> | undefined
}

function FilterSelector<TValue>({
  children,
  value,
  onChange,
  sx
} : FilterSelectorProps<TValue>) {
  return (
    <Select
      size={'small'}
      inputProps={{ IconComponent: () => null }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
          paddingRight: '14px'
        },
        ...sx
    }}>
      {children}
    </Select>
  );
}

export default FilterSelector;