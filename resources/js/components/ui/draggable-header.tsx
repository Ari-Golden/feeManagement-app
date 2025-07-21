'use client'

import { flexRender, Header } from '@tanstack/react-table'
import { useDrag, useDrop } from 'react-dnd'
import { TableHead } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

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
      console.log('DraggableColumnHeader - Dropped column:', draggedColumn.id, 'onto', column.id); // Log drop event
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      )
      setColumnOrder(newColumnOrder)
      console.log('DraggableColumnHeader - New column order:', newColumnOrder); // Log new column order
    },
  })

  const [{ isDragging }, dragRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => {
      console.log('DraggableColumnHeader - Dragging column:', column.id); // Log drag start
      return column;
    },
    type: 'column',
  })

  return (
    <TableHead
      ref={node => dropRef(dragRef(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      colSpan={header.colSpan}
      className="relative"
    >
      <div className="flex items-center space-x-2">
        {header.isPlaceholder
          ? null
          : column.getCanSort() ? (
              <Button
                variant="ghost"
                onClick={column.getToggleSortingHandler()}
                className="p-0 h-auto w-full justify-start"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{ asc: <ArrowUpDown className="ml-2 h-4 w-4" />, desc: <ArrowUpDown className="ml-2 h-4 w-4" /> }[column.getIsSorted() as string] ?? <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            ) : (
              flexRender(
                header.column.columnDef.header,
                header.getContext()
              )
            )}
      </div>
    </TableHead>
  )
}
