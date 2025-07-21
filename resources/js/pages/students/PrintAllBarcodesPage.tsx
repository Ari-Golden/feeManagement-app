'use client'

import * as React from 'react'
import PrintBarcode from '@/components/PrintBarcode'
import { Student } from '@/components/data-table-columns'

interface PrintAllBarcodesPageProps {
  students: Student[]
}

const PrintAllBarcodesPage: React.FC<PrintAllBarcodesPageProps> = ({ students }) => {
  React.useEffect(() => {
    window.print()
  }, [])

  const chunkSize = 20;
  const chunks = [];
  for (let i = 0; i < students.length; i += chunkSize) {
    chunks.push(students.slice(i, i + chunkSize));
  }

  return (
    <div className="p-4">
      {chunks.length > 0 ? (
        chunks.map((chunk, chunkIndex) => (
          <div
            key={chunkIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', // Adjust as needed for layout
              gap: '10mm',
              pageBreakAfter: chunkIndex < chunks.length - 1 ? 'always' : 'auto',
            }}
          >
            {chunk.map((student) => (
              <PrintBarcode key={student.id} student={student} />
            ))}
          </div>
        ))
      ) : (
        <p>No students found to print barcodes.</p>
      )}
    </div>
  )
}

export default PrintAllBarcodesPage
