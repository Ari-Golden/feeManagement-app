'use client';

import { Student } from '@/components/data-table-columns';
import { Payment } from '@/components/payment-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ColumnDef } from '@tanstack/react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface StudentPaymentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
}

const paymentDetailColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'payment_date',
        header: 'Date',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(row.original.amount));
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
];

export function StudentPaymentDetailsModal({ isOpen, onClose, student }: StudentPaymentDetailsModalProps) {
    if (!student) return null;

    const allPayments: Payment[] = [...(student.payments || []), ...(student.ppdbPayments || []), ...(student.endOfYearPayments || [])].map((p) => ({
        ...p,
        type: p.amount > 0 ? 'BPMP' : '',
    })); // Add a type for display if needed

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Payment Details for {student.name}</DialogTitle>
                    <DialogDescription>
                        All recorded payments for {student.name} ({student.no_ppdb}).
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <DndProvider backend={HTML5Backend}>
                        {allPayments.length > 0 ? (
                            <DataTable columns={paymentDetailColumns} data={allPayments} />
                        ) : (
                            <p>No payment records found for this student.</p>
                        )}
                    </DndProvider>
                </div>
            </DialogContent>
        </Dialog>
    );
}
