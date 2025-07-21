'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Student } from "@/components/data-table-columns"

export interface Payment {
  id: number
  student_id: number
  student: Student
  amount: string
  payment_date: string
  description: string | null
  created_at: string
  updated_at: string
}

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    id: "studentName", // Explicitly define ID
    accessorKey: "student.name",
    header: "Student Name", // Changed to string
    enableSorting: true,
    cell: ({ row }) => {
      return `${row.original.student.name} (${row.original.student.no_ppdb})`
    },
  },
  {
    id: "amount", // Explicitly define ID
    accessorKey: "amount",
    header: "Amount", // Changed to string
    enableSorting: true,
    cell: ({ row }) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(row.original.amount))
    },
  },
  {
    id: "paymentDate", // Explicitly define ID
    accessorKey: "payment_date",
    header: "Payment Date", // Changed to string
    enableSorting: true,
  },
  {
    id: "description", // Explicitly define ID
    accessorKey: "description",
    header: "Description", // Changed to string
    enableSorting: true,
  },
  {
    id: "recordedAt", // Explicitly define ID
    accessorKey: "created_at",
    header: "Recorded At", // Changed to string
    enableSorting: true,
    cell: ({ row }) => {
      return new Date(row.original.created_at).toLocaleDateString()
    },
  },
]





