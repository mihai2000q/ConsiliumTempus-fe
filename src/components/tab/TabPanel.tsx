import { ReactNode } from "react";

interface TabPanelProps {
  children: ReactNode,
  value: number,
  index: number,
}

function TabPanel({ value, index, children }: TabPanelProps) {
  return (
    <div hidden={value !== index} style={{ height: 'inherit' }}>
      {children}
    </div>
  );
}

export default TabPanel;