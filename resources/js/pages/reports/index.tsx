'use client'

import * as React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { DataTable } from '@/components/ui/data-table'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { reportColumns, ReportData } from '@/components/report-table-columns'

interface ReportPageProps {
  reportData: ReportData[]
}

export default function ReportPage({ reportData: initialReportData }: ReportPageProps) {
  const [reportData, setReportData] = React.useState<ReportData[]>(initialReportData)

  React.useEffect(() => {
    setReportData(initialReportData)
  }, [initialReportData])

  const grandTotalStandardFee = React.useMemo(() => {
    return reportData.reduce((sum, item) => sum + item.total_standard_fee, 0)
  }, [reportData])

  const grandTotalPaid = React.useMemo(() => {
    return reportData.reduce((sum, item) => sum + item.total_paid, 0)
  }, [reportData])

  const grandTotalRemainingBalance = React.useMemo(() => {
    return reportData.reduce((sum, item) => sum + item.remaining_balance, 0)
  }, [reportData])

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Fee Report', href: '/reports' }]}>
      <Head title="Fee Report" />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Fee Report</h1>

        <DndProvider backend={HTML5Backend}>
          {reportData.length > 0 ? (
            <DataTable columns={reportColumns} data={reportData} />
          ) : (
            <p>No report data available.</p>
          )}
        </DndProvider>

        <div className="mt-8 p-4 border rounded-md shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Grand Totals</h2>
          <p><strong>Total Standard Fee:</strong> {formatRupiah(grandTotalStandardFee)}</p>
          <p><strong>Total Paid:</strong> {formatRupiah(grandTotalPaid)}</p>
          <p><strong>Total Remaining Balance:</strong> <span className={grandTotalRemainingBalance > 0 ? 'text-red-500' : 'text-green-500'}>{formatRupiah(grandTotalRemainingBalance)}</span></p>
        </div>
      </div>
    </AppLayout>
  )
}
