'use client'

import * as React from 'react'
import PrintBarcode from '@/components/PrintBarcode'
import { Student } from '@/components/data-table-columns'

interface PrintBarcodePageProps {
  student: Student
}

const PrintBarcodePage: React.FC<PrintBarcodePageProps> = ({ student }) => {
  React.useEffect(() => {
    window.print()
  }, [])

  return (
    <div className="p-4">
      <PrintBarcode student={student} />
    </div>
  )
}

export default PrintBarcodePage
