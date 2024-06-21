import { FormControl, FormLabel, Menu } from "@mui/material";
import OutlinedInputTextField from "../../../components/textfield/OutlinedInputTextField.tsx";
import { useState } from "react";

interface SetUserMenuProps {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  label: string
}

function SetUserMenu({
  anchorEl,
  onClose,
  label
}: SetUserMenuProps) {
  const [inputValue, setInputValue] = useState('')

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <OutlinedInputTextField
          value={inputValue}
          placeholder={'Search user by name or email'}
          onChange={(e) => setInputValue(e.target.value)} />
      </FormControl>
    </Menu>
  );
}

export default SetUserMenu;