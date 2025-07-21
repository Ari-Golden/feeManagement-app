'use client'

import * as React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@inertiajs/react'
import { Student } from '@/components/data-table-columns'
import { DataTable } from '@/components/ui/data-table'
import { paymentColumns, Payment } from '@/components/payment-table-columns'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface StandardFee {
  id: number
  name: string
  amount: string
  frequency: string | null
  created_at: string
  updated_at: string
}

interface PaymentPageProps {
  payments: Payment[]
  students: Student[]
  bpmpStandardFee: StandardFee | null
}

export default function PaymentPage({ payments: initialPayments, students: allStudents, bpmpStandardFee }: PaymentPageProps) {
  console.log('BPMP Standard Fee received:', bpmpStandardFee); // Add this line
  const [payments, setPayments] = React.useState<Payment[]>(initialPayments)
  const [students, setStudents] = React.useState<Student[]>(allStudents)
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null)

  const { data, setData, post, processing, errors, reset } = useForm({
    student_id: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    description: '',
  })

  React.useEffect(() => {
    setPayments(initialPayments)
    setStudents(allStudents)
  }, [initialPayments, allStudents])

  const handleStudentSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const foundStudent = students.find(
      (s) =>
        s.name.toLowerCase().includes(searchTerm) ||
        s.no_ppdb.toLowerCase().includes(searchTerm) ||
        s.nisn.toLowerCase().includes(searchTerm) ||
        (s.barcode_id && s.barcode_id.toLowerCase().includes(searchTerm))
    )
    if (foundStudent) {
      setSelectedStudent(foundStudent)
      setData('student_id', String(foundStudent.id))
    } else {
      setSelectedStudent(null)
      setData('student_id', '')
    }
  }

  const submitPayment = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('payments.store'), {
      onSuccess: () => {
        reset()
        setSelectedStudent(null)
        router.reload({ only: ['payments', 'students', 'bpmpStandardFee'] })
      },
    })
  }

  const filteredPayments = React.useMemo(() => {
    if (!selectedStudent) {
      return []
    }
    return payments.filter(payment => payment.student_id === selectedStudent.id)
  }, [payments, selectedStudent])

  const totalPaid = React.useMemo(() => {
    return filteredPayments.reduce((sum, payment) => sum + Number(payment.amount), 0)
  }, [filteredPayments])

  const standardPayment = bpmpStandardFee ? (Number(bpmpStandardFee.amount) * 12) : 0 // Use prop, assume monthly
  const remainingBalance = standardPayment - totalPaid

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'BPMP Payments', href: route('payments.index') }]}>
      <Head title="BPMP Payments" />
      <div className="container px-4 py-6 mx-auto">
        <h1 className="text-2xl font-bold mb-4">BPMP Fee Payments</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"> {/* Top two columns */}
          {/* Payment Form (Left Column) */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Record New Payment</h2>
            <form onSubmit={submitPayment} className="space-y-4">
              <div>
                <Label htmlFor="student_search">Search Student (Name, PPDB, NISN, Barcode)</Label>
                <Input
                  id="student_search"
                  type="text"
                  onChange={handleStudentSearch}
                  placeholder="Type to search student..."
                />
                {selectedStudent && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {selectedStudent.name} ({selectedStudent.no_ppdb})
                  </p>
                )}
                {errors.student_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.student_id}</p>
                )}
              </div>

              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={data.amount}
                  onChange={(e) => setData('amount', e.target.value)}
                  className={errors.amount ? 'border-red-500' : ''}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <Label htmlFor="payment_date">Payment Date</Label>
                <Input
                  id="payment_date"
                  type="date"
                  value={data.payment_date}
                  onChange={(e) => setData('payment_date', e.target.value)}
                  className={errors.payment_date ? 'border-red-500' : ''}
                />
                {errors.payment_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.payment_date}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  type="text"
                  value={data.description || ''}
                  onChange={(e) => setData('description', e.target.value)}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <Button type="submit" disabled={processing || !selectedStudent}>
                {processing ? 'Saving...' : 'Record Payment'}
              </Button>
            </form>
          </div>

          {/* Payment Summary for Selected Student (Right Column) */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Summary for Selected Student</h2>
            {!selectedStudent ? (
              <p>Please select a student to view payment summary.</p>
            ) : (
              <div className="space-y-2">
                <p><strong>Standard Annual Payment:</strong> {formatRupiah(standardPayment)}</p>
                <p><strong>Total Paid:</strong> {formatRupiah(totalPaid)}</p>
                <p><strong>Remaining Balance:</strong> <span className={remainingBalance > 0 ? 'text-red-500' : 'text-green-500'}>{formatRupiah(remainingBalance)}</span></p>

                <h3 className="text-lg font-semibold mt-4">Payment Details:</h3>
                {filteredPayments.length > 0 ? (
                  <ul className="space-y-1 text-sm">
                    {filteredPayments.map((payment) => (
                      <li key={payment.id} className="border-b last:border-b-0 py-1">
                        {payment.payment_date}: {formatRupiah(Number(payment.amount))} {payment.description && `(${payment.description})`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No payment records found for this student.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* All Payments History (Bottom Section) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">All Payments History</h2>
          <DndProvider backend={HTML5Backend}>
            {payments.length > 0 ? (
              <DataTable columns={paymentColumns} data={payments} />
            ) : (
              <p>No payments recorded yet.</p>
            )}
          </DndProvider>
        </div>
      </div>
    </AppLayout>
  )
}

