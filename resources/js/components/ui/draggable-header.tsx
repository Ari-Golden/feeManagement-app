'use client'

import { flexRender, Header } from '@tanstack/react-table'
import { useDrag, useDrop } from 'react-dnd'
import { TableHead } from '@/components/ui/table'

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): string[] => {
  const newColumnOrder = [...columnOrder]
  const draggedColumnIndex = newColumnOrder.indexOf(draggedColumnId)
  const targetColumnIndex = newColumnOrder.indexOf(targetColumnId)

  // remove the dragged column from its original position
  const [removedColumn] = newColumnOrder.splice(draggedColumnIndex, 1)
  // insert it into the new position
  newColumnOrder.splice(targetColumnIndex, 0, removedColumn)

  return newColumnOrder
}

export const DraggableColumnHeader = <TData, TValue>({ header, table }: { header: Header<TData, TValue>, table: any }) => {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()
  const { column } = header

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: any) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      )
      setColumnOrder(newColumnOrder)
    },
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  })

  return (
    <TableHead
      ref={dropRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      colSpan={header.colSpan}
    >
      <div ref={dragRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    </TableHead>
  )
}
