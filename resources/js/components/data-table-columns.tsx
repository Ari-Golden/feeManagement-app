"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import JsBarcode from 'jsbarcode'
import { router } from '@inertiajs/react' // Import router

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
  id: string
  no_ppdb: string
  nisn: string
  name: string
  class: string
  barcode_id?: string | null // Add barcode_id
}

export const getColumns = ({ onEdit, onDelete, onView }: { onEdit: (student: Student) => void; onDelete: (student: Student) => void; onView: (student: Student) => void; }): ColumnDef<Student>[] => {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "no_ppdb",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No. PPDB
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "nisn",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NISN
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "class",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Class
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "barcode_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Barcode ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: "barcode_image",
      header: "Barcode",
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
              <DropdownMenuItem>View payment details</DropdownMenuItem>
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
