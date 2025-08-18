'use client';

import { getStandardFeeColumns, StandardFee } from '@/components/standard-fee-table-columns';
import { StandardFeeFormModal } from '@/components/StandardFeeFormModal';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface StandardFeePageProps {
    standardFees: StandardFee[];
}

export default function StandardFeePage({ standardFees: initialStandardFees }: StandardFeePageProps) {
    const [standardFees, setStandardFees] = React.useState<StandardFee[]>(initialStandardFees);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingStandardFee, setEditingStandardFee] = React.useState<StandardFee | null>(null);

    React.useEffect(() => {
        setStandardFees(initialStandardFees);
    }, [initialStandardFees]);

    const handleOpenCreateModal = () => {
        setEditingStandardFee(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStandardFee(null);
        router.reload({ only: ['standardFees'] });
    };

    const handleEdit = (standardFee: StandardFee) => {
        setEditingStandardFee(standardFee);
        setIsModalOpen(true);
    };

    const handleDelete = (standardFee: StandardFee) => {
        if (confirm(`Are you sure you want to delete ${standardFee.name}?`)) {
            router.delete(route('standard-fees.destroy', standardFee.id), {
                onSuccess: () => {
                    router.reload({ only: ['standardFees'] });
                },
                onError: (errors) => {
                    console.error('Error deleting standard fee:', errors);
                },
            });
        }
    };

    const columns = getStandardFeeColumns({ onEdit: handleEdit, onDelete: handleDelete });

    return (
        <AppLayout breadcrumbs={[{ title: 'Standard Fee', href: '/standardfee' }]}>
            <Head title="Standard Fees" />
            <div className="m-4 flex flex-1 flex-col">
                <DndProvider backend={HTML5Backend}>
                    <div className="container mx-auto py-10">
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Standard Fees</h1>
                            <Button onClick={handleOpenCreateModal}>Add New Standard Fee</Button>
                        </div>
                        <DataTable columns={columns} data={standardFees} />
                    </div>
                </DndProvider>
            </div>
            <StandardFeeFormModal isOpen={isModalOpen} onClose={handleCloseModal} standardFee={editingStandardFee} />
        </AppLayout>
    );
}
