import { SectionCards } from '@/components/section-cards';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/ui/data-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { outstandingStudentsColumns, OutstandingStudentData } from '@/components/outstanding-students-table-columns';

interface DashboardProps {
    totalStudents: number;
    totalBpmpPaid: number;
    totalPpdbPaid: number;
    totalEndOfYearPaid: number;
    grandTotalStandardFee: number;
    grandTotalPaid: number;
    grandTotalRemainingBalance: number;
    studentsWithOutstandingBalance: OutstandingStudentData[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    totalStudents,
    totalBpmpPaid,
    totalPpdbPaid,
    totalEndOfYearPaid,
    grandTotalStandardFee,
    grandTotalPaid,
    grandTotalRemainingBalance,
    studentsWithOutstandingBalance,
}: DashboardProps) {
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const cardData = [
        {
            description: 'Total Students',
            title: 'Total Students',
            value: totalStudents.toString(),
            trend: 'up' as const,
            trendText: '',
            footerMainText: '',
            footerSubText: '',
        },
        {
            description: 'Total BPMP Paid',
            title: 'BPMP Paid',
            value: formatRupiah(totalBpmpPaid),
            trend: 'up' as const,
            trendText: '',
            footerMainText: '',
            footerSubText: '',
        },
        {
            description: 'Total PPDB Paid',
            title: 'PPDB Paid',
            value: formatRupiah(totalPpdbPaid),
            trend: 'up' as const,
            trendText: '',
            footerMainText: '',
            footerSubText: '',
        },
        {
            description: 'Total End of Year Paid',
            title: 'End of Year Paid',
            value: formatRupiah(totalEndOfYearPaid),
            trend: 'up' as const,
            trendText: '',
            footerMainText: '',
            footerSubText: '',
        },
        {
            description: 'Grand Total Standard Fee',
            title: 'Standard Fee',
            value: formatRupiah(grandTotalStandardFee),
            trend: 'up' as const,
            trendText: '',
            footerMainText: '',
            footerSubText: '',
        },
        {
            description: 'Grand Total Paid',
            title: 'Total Paid',
            value: formatRupiah(grandTotalPaid),
            trend: 'up' as const,
            trendText: '',
            footerMainText: '',
            footerSubText: '',
        },
        {
            description: 'Grand Total Remaining Balance',
            title: 'Remaining Balance',
            value: formatRupiah(grandTotalRemainingBalance),
            trend: grandTotalRemainingBalance > 0 ? 'down' : 'up' as const,
            trendText: '',
            footerMainText: '',
            footerSubText: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards cards={cardData} />
                        <div className="px-4 lg:px-6">
                            <h2 className="text-xl font-bold mb-4">Students with Outstanding Balance</h2>
                            <DndProvider backend={HTML5Backend}>
                                {studentsWithOutstandingBalance.length > 0 ? (
                                    <DataTable columns={outstandingStudentsColumns} data={studentsWithOutstandingBalance} />
                                ) : (
                                    <p>All students have paid their fees in full.</p>
                                )}
                            </DndProvider>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
