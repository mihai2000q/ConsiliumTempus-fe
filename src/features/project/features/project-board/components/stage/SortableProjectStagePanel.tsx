import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import ProjectStage from "../../types/ProjectStage.model.ts";
import ProjectStagePanel from "./ProjectStagePanel.tsx";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material";
import Droppable from "../../../../../../components/dnd/Droppable.tsx";

interface SortableStagePanelProps {
  stage: ProjectStage,
  showAddTaskCard?: boolean | undefined,
  setShowAddTaskCard?: Dispatch<SetStateAction<boolean>> | undefined,
  draggedStageId: string | null
}

function SortableProjectStagePanel({ 
  stage, 
  showAddTaskCard, 
  setShowAddTaskCard,
  draggedStageId 
}: SortableStagePanelProps) {
  const theme = useTheme()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id: stage.id })

  const [isDragged, setIsDragged] = useState(false)
  useEffect(() => {
    setIsDragged(stage.id === draggedStageId)
  }, [draggedStageId, stage]);

  const [isDragging, setIsDragging] = useState(false)
  useEffect(() => {
    setIsDragging(!!transform)
  }, [transform]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        height: 'inherit',
        width: 'inherit',
        position: 'relative',
        zIndex: isDragged ? theme.zIndex.modal : 0
      }}>
      <Droppable id={stage.id}>
        {useMemo(() =>
            <ProjectStagePanel
              stage={stage}
              showAddTaskCard={showAddTaskCard}
              setShowAddTaskCard={setShowAddTaskCard}
              listeners={listeners}
              setActivatorNodeRef={setActivatorNodeRef}
              isDragged={isDragged}
              isDragging={isDragging} />
          , [stage, showAddTaskCard, setShowAddTaskCard, listeners, setActivatorNodeRef, isDragged, isDragging])}
      </Droppable>
    </div>
  )
}

export default SortableProjectStagePanel;