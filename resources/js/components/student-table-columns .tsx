'use client';

import { EndOfYearPayment } from '@/components/end-of-year-payment-table-columns';
import { Payment } from '@/components/payment-table-columns';
import { PpdbPayment } from '@/components/ppdb-payment-table-columns';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import JsBarcode from 'jsbarcode';
import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ReportData {
    id: number;
    name: string;
    no_ppdb: string;
    nisn: string;
    class: string;
    BPMP_id: string;
    PPDB_id: string;
    EOY_id: string;
    barcode_id?: string | null; // Add barcode_id
    payments?: Payment[]; // Add payments relation
    ppdbPayments?: PpdbPayment[]; // Add ppdbPayments relation
    endOfYearPayments?: EndOfYearPayment[]; // Add endOfYearPayments relation
}

export const studentColumns: ColumnDef<ReportData>[] = [
    {
        id: 'studentInfo',
        header: 'Student Info',
        cell: ({ row }) => {
            const student = row.original;
            return (
                <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">No. PPDB: {student.no_ppdb}</p>
                    <p className="text-sm text-gray-500">NISN: {student.nisn}</p>
                </div>
            );
        },
        enableSorting: true,
        accessorFn: (row) => `${row.name} ${row.no_ppdb} ${row.nisn}`, // For global filter
    },
    {
        accessorKey: 'class',
        header: 'Class',
        enableSorting: true,
    },
    {
        accessorKey: 'bpmp_id',
        header: 'BPMP id',
        cell: ({ row }) => {
            return (
                <div>
                    <p className="text-xs text-gray-500">{row.original.BPMP_id} </p>
                    <p className="text-xs text-gray-500">jumlah iuran BPMP : Rp </p>
                </div>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: 'ppdb_id',
        header: 'PPDB_id',
        cell: ({ row }) => {
            return (
                <div>
                    <p className="text-xs text-gray-500">{row.original.PPDB_id} </p>
                    <p className="text-xs text-gray-500">jumlah iuran PPDB : Rp </p>
                </div>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: 'eoy_id',
        header: 'Biaya_Akhir_Tahun id',
        cell: ({ row }) => {
            return (
                <div>
                    <p className="text-xs text-gray-500">{row.original.EOY_id} </p>
                    <p className="text-xs text-gray-500">jumlah iuran Biaya Akhir tahun Klas 12 : Rp </p>
                </div>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: 'barcode_id',
        header: 'Barcode ID',
        enableSorting: true,
    },
    {
        id: 'barcode_image',
        header: 'Barcode',
        enableSorting: true,
        cell: ({ row }) => {
            const barcodeId = row.original.barcode_id;
            const canvasRef = React.useRef<HTMLCanvasElement>(null);

            React.useEffect(() => {
                if (canvasRef.current && barcodeId) {
                    JsBarcode(canvasRef.current, barcodeId, {
                        format: 'CODE128', // You can choose other formats like CODE39, EAN13, etc.
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
        id: 'actions',
        cell: ({ row }) => {
            const student = row.original;

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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(student.id)}>Copy student ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onView(student)}>View student</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPaymentDetails(student)}>View payment details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.visit(route('students.printBarcode', student.id))}>Print Barcode</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(student)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(student)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
