'use client'

import * as React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { router } from '@inertiajs/react'

export interface StandardFee {
  id: number
  name: string
  amount: string
  frequency: string | null
  created_at: string
  updated_at: string
}

export const getStandardFeeColumns = ({
  onEdit,
  onDelete,
}: { onEdit: (standardFee: StandardFee) => void; onDelete: (standardFee: StandardFee) => void }): ColumnDef<StandardFee>[] => {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: "Amount",
      enableSorting: true,
      cell: ({ row }) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(row.original.amount))
      },
    },
    {
      id: "frequency",
      accessorKey: "frequency",
      header: "Frequency",
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const standardFee = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(standardFee)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(standardFee)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

