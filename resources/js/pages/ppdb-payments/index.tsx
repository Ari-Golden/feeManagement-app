'use client';

import { Student } from '@/components/data-table-columns';
import { Payment, paymentColumns } from '@/components/payment-table-columns'; // Re-use paymentColumns for now
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface PpdbPayment extends Payment {}

interface PpdbPaymentPageProps {
  ppdbPayments: PpdbPayment[]
  students: Student[]
  ppdbStandardFee: StandardFee | null
}

export default function PpdbPaymentPage({ ppdbPayments: initialPpdbPayments, students: allStudents, ppdbStandardFee }: PpdbPaymentPageProps) {
  const [ppdbPayments, setPpdbPayments] = React.useState<PpdbPayment[]>(initialPpdbPayments)
  const [students, setStudents] = React.useState<Student[]>(allStudents)
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null)

  const { data, setData, post, processing, errors, reset } = useForm({
    student_id: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    description: '',
  })

  React.useEffect(() => {
    setPpdbPayments(initialPpdbPayments)
    setStudents(allStudents)
  }, [initialPpdbPayments, allStudents])

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
    post(route('ppdb-payments.store'), {
      onSuccess: () => {
        reset()
        setSelectedStudent(null)
        router.reload({ only: ['ppdbPayments', 'students', 'ppdbStandardFee'] })
      },
    })
  }

  const filteredPpdbPayments = React.useMemo(() => {
    if (!selectedStudent) {
      return []
    }
    return ppdbPayments.filter(payment => payment.student_id === selectedStudent.id)
  }, [ppdbPayments, selectedStudent])

  const totalPaid = React.useMemo(() => {
    return filteredPpdbPayments.reduce((sum, payment) => sum + Number(payment.amount), 0)
  }, [filteredPpdbPayments])

  const standardPayment = ppdbStandardFee ? Number(ppdbStandardFee.amount) : 0 // Use prop
  const remainingBalance = standardPayment - totalPaid

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'PPDB Payments', href: route('ppdb-payments.index') }]}>
            <Head title="PPDB Payments" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="mb-4 text-2xl font-bold">PPDB Fee Payments</h1>

                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Payment Form (Left Column) */}
                    <div>
                        <h2 className="mb-4 text-xl font-semibold">Record New PPDB Payment</h2>
                        <form onSubmit={submitPayment} className="space-y-4">
                            <div>
                                <Label htmlFor="student_search">Search Student (Name, PPDB, NISN, Barcode)</Label>
                                <Input id="student_search" type="text" onChange={handleStudentSearch} placeholder="Type to search student..." />
                                {selectedStudent && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected: {selectedStudent.name} ({selectedStudent.no_ppdb})
                                    </p>
                                )}
                                {errors.student_id && <p className="mt-1 text-sm text-red-500">{errors.student_id}</p>}
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
                                {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
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
                                {errors.payment_date && <p className="mt-1 text-sm text-red-500">{errors.payment_date}</p>}
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
                                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <Button type="submit" disabled={processing || !selectedStudent}>
                                {processing ? 'Saving...' : 'Record Payment'}
                            </Button>
                        </form>
                    </div>

                    {/* Payment Summary for Selected Student (Right Column) */}
                    <div>
                        <h2 className="mb-4 text-xl font-semibold">PPDB Payment Summary for Selected Student</h2>
                        {!selectedStudent ? (
                            <p>Please select a student to view payment summary.</p>
                        ) : (
                            <div className="space-y-2">
                                <p>
                                    <strong>Standard PPDB Payment:</strong> {formatRupiah(standardPayment)}
                                </p>
                                <p>
                                    <strong>Total Paid:</strong> {formatRupiah(totalPaid)}
                                </p>
                                <p>
                                    <strong>Remaining Balance:</strong>{' '}
                                    <span className={remainingBalance > 0 ? 'text-red-500' : 'text-green-500'}>{formatRupiah(remainingBalance)}</span>
                                </p>

                                <h3 className="mt-4 text-lg font-semibold">Payment Details:</h3>
                                {filteredPpdbPayments.length > 0 ? (
                                    <ul className="space-y-1 text-sm">
                                        {filteredPpdbPayments.map((payment) => (
                                            <li key={payment.id} className="border-b py-1 last:border-b-0">
                                                {payment.payment_date}: {formatRupiah(Number(payment.amount))}{' '}
                                                {payment.description && `(${payment.description})`}
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

                {/* All PPDB Payments History (Bottom Section) */}
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-semibold">All PPDB Payments History</h2>
                    <DndProvider backend={HTML5Backend}>
                        {ppdbPayments.length > 0 ? <DataTable columns={paymentColumns} data={ppdbPayments} /> : <p>No PPDB payments recorded yet.</p>}
                    </DndProvider>
                </div>
            </div>
        </AppLayout>
    );
}
