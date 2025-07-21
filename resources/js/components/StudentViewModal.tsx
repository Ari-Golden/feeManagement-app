'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Student } from '@/components/data-table-columns'

interface StudentViewModalProps {
  isOpen: boolean
  onClose: () => void
  student: Student | null
}

export function StudentViewModal({
  isOpen,
  onClose,
  student,
}: StudentViewModalProps) {
  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>
            View the details of the selected student.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">ID:</span>
            <span className="col-span-3">{student.id}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">No. PPDB:</span>
            <span className="col-span-3">{student.no_ppdb}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">NISN:</span>
            <span className="col-span-3">{student.nisn}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Name:</span>
            <span className="col-span-3">{student.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Class:</span>
            <span className="col-span-3">{student.class}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Barcode ID:</span>
            <span className="col-span-3">{student.barcode_id}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
