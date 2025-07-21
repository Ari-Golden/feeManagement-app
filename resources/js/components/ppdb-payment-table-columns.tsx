'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Student } from "@/components/data-table-columns"

export interface PpdbPayment {
  id: number
  student_id: number
  student: Student
  amount: string
  payment_date: string
  description: string | null
  created_at: string
  updated_at: string
}

export const ppdbPaymentColumns: ColumnDef<PpdbPayment>[] = [
  {
    id: "studentName",
    accessorKey: "student.name",
    header: "Student Name",
    enableSorting: true,
    cell: ({ row }) => {
      return `${row.original.student.name} (${row.original.student.no_ppdb})`
    },
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
    id: "paymentDate",
    accessorKey: "payment_date",
    header: "Payment Date",
    enableSorting: true,
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    enableSorting: true,
  },
  {
    id: "recordedAt",
    accessorKey: "created_at",
    header: "Recorded At",
    enableSorting: true,
    cell: ({ row }) => {
      return new Date(row.original.created_at).toLocaleDateString()
    },
  },
]


