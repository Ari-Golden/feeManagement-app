'use client'

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ReportData {
  id: number
  name: string
  no_ppdb: string
  nisn: string
  class: string
  total_bpmp_paid: number
  bpmp_months_paid: number // Add this new property
  total_ppdb_paid: number
  total_end_of_year_paid: number
  total_standard_fee: number
  total_paid: number
  remaining_balance: number
}

export const reportColumns: ColumnDef<ReportData>[] = [
  {
    id: "studentInfo",
    header: "Student Info",
    cell: ({ row }) => {
      const student = row.original
      return (
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-sm text-gray-500">No. PPDB: {student.no_ppdb}</p>
          <p className="text-sm text-gray-500">NISN: {student.nisn}</p>
        </div>
      )
    },
    enableSorting: true,
    accessorFn: row => `${row.name} ${row.no_ppdb} ${row.nisn}`, // For global filter
  },
  {
    accessorKey: "class",
    header: "Class",
    enableSorting: true,
  },
  {
    accessorKey: "total_bpmp_paid",
    header: "BPMP Paid",
    cell: ({ row }) => {
      return (
        <div>
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.original.total_bpmp_paid)}
          <p className="text-xs text-gray-500">({row.original.bpmp_months_paid} months)</p>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "total_ppdb_paid",
    header: "PPDB Paid",
    cell: ({ row }) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.original.total_ppdb_paid)
    },
    enableSorting: true,
  },
  {
    accessorKey: "total_end_of_year_paid",
    header: "End of Year Paid",
    cell: ({ row }) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.original.total_end_of_year_paid)
    },
    enableSorting: true,
  },
  {
    accessorKey: "total_standard_fee",
    header: "Standard Fee",
    cell: ({ row }) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.original.total_standard_fee)
    },
    enableSorting: true,
  },
  {
    accessorKey: "total_paid",
    header: "Total Paid",
    cell: ({ row }) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.original.total_paid)
    },
    enableSorting: true,
  },
  {
    accessorKey: "remaining_balance",
    header: "Remaining Balance",
    cell: ({ row }) => {
      const amount = row.original.remaining_balance
      const colorClass = amount > 0 ? 'text-red-500' : 'text-green-500'
      return <span className={colorClass}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)}</span>
    },
    enableSorting: true,
  },
]
