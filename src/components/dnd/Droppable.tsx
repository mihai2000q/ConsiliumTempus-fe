import { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'

interface DroppableProps {
  children: ReactNode,
  id: string | number
}

function Droppable({ children, id }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} style={{ height: 'inherit' }}>
      {children}
    </div>
  )
}

export default Droppable
