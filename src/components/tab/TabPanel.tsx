import { ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children: ReactNode,
  value: number,
  index: number
}

function TabPanel({ value, index, children }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      <Box mt={2}>
        {children}
      </Box>
    </div>
  );
}

export default TabPanel;