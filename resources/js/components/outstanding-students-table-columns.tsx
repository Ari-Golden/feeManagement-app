'use client'

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface OutstandingStudentData {
  id: number
  name: string
  no_ppdb: string
  nisn: string
  class: string
  total_standard_fee: number
  total_paid: number
  remaining_balance: number
}

export const outstandingStudentsColumns: ColumnDef<OutstandingStudentData>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
    enableSorting: true,
  },
  {
    accessorKey: "no_ppdb",
    header: "No. PPDB",
    enableSorting: true,
  },
  {
    accessorKey: "nisn",
    header: "NISN",
    enableSorting: true,
  },
  {
    accessorKey: "class",
    header: "Class",
    enableSorting: true,
  },
  {
    accessorKey: "remaining_balance",
    header: "Remaining Balance",
    enableSorting: true,
    cell: ({ row }) => {
      const amount = row.original.remaining_balance
      const colorClass = amount > 0 ? 'text-red-500' : 'text-green-500'
      return <span className={colorClass}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)}</span>
    },
  },
]
