import { ReactNode } from 'react'

interface TabPanelProps {
  children: ReactNode,
  value: number,
  index: number,
}

function TabPanel({ value, index, children }: TabPanelProps) {
  if (value !== index) return <></>

  return (
    <div
      role={'tabpanel'}
      style={{ height: 'inherit' }}>
      {children}
    </div>
  )
}

export default TabPanel
