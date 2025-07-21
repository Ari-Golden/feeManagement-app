"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import JsBarcode from 'jsbarcode'
import { router } from '@inertiajs/react'
import { Payment } from '@/components/payment-table-columns'
import { PpdbPayment } from '@/components/ppdb-payment-table-columns'
import { EndOfYearPayment } from '@/components/end-of-year-payment-table-columns'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: number // Changed from string to number
  no_ppdb: string
  nisn: string
  name: string
  class: string
  barcode_id?: string | null // Add barcode_id
  payments?: Payment[] // Add payments relation
  ppdbPayments?: PpdbPayment[] // Add ppdbPayments relation
  endOfYearPayments?: EndOfYearPayment[] // Add endOfYearPayments relation
}

export const getColumns = ({ onEdit, onDelete, onView, onPaymentDetails }: { onEdit: (student: Student) => void; onDelete: (student: Student) => void; onView: (student: Student) => void; onPaymentDetails: (student: Student) => void; }): ColumnDef<Student>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
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
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      accessorKey: "class",
      header: "Class",
      enableSorting: true,
    },
    {
      accessorKey: "barcode_id",
      header: "Barcode ID",
      enableSorting: true,
    },
    {
      id: "barcode_image",
      header: "Barcode",
      enableSorting: true,
      cell: ({ row }) => {
        const barcodeId = row.original.barcode_id;
        const canvasRef = React.useRef<HTMLCanvasElement>(null);

        React.useEffect(() => {
          if (canvasRef.current && barcodeId) {
            JsBarcode(canvasRef.current, barcodeId, {
              format: "CODE128", // You can choose other formats like CODE39, EAN13, etc.
              displayValue: false,
              height: 50,
              width: 1,
            });
          }
        }, [barcodeId]);

        return barcodeId ? <canvas ref={canvasRef} /> : null;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original

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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(student.id)}
              >
                Copy student ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(student)}>View student</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPaymentDetails(student)}>View payment details</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.visit(route('students.printBarcode', student.id))}
              >
                Print Barcode
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit(student)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(student)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
