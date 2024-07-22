import { ReactNode } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

interface SortableItemProps {
  children: ReactNode,
  id: string | number,
  blurBackground?: boolean | undefined
}

function SortableItem({ children, id, blurBackground }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        height: 'inherit',
        position: 'relative',
        ...(isDragging && blurBackground && {
          backdropFilter: "blur(2px)",
        })
      }}>
      {children}
    </div>
  );
}

export default SortableItem;