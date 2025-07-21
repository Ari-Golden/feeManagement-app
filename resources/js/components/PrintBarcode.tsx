'use client'

import * as React from 'react'
import JsBarcode from 'jsbarcode'
import { Student } from '@/components/data-table-columns'

interface PrintBarcodeProps {
  student: Student
}

const PrintBarcode: React.FC<PrintBarcodeProps> = ({ student }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (canvasRef.current && student.barcode_id) {
      JsBarcode(canvasRef.current, student.barcode_id, {
        format: "CODE128",
        displayValue: false,
        height: 50,
        width: 1,
        margin: 0,
      })
    }
  }, [student.barcode_id])

  return (
    <div className="print-container" style={{ padding: '10mm', border: '1px solid #ccc' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        {student.barcode_id ? <canvas ref={canvasRef} /> : <p>No Barcode ID</p>}
        <div style={{ fontSize: '12px', marginTop: '5px' }}>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>No. PPDB:</strong> {student.no_ppdb}</p>
          <p><strong>NISN:</strong> {student.nisn}</p>
          <p><strong>Class:</strong> {student.class}</p>
        </div>
      </div>
    </div>
  )
}

export default PrintBarcode
