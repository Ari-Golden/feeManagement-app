'use client';

import { getColumns, Student } from '@/components/data-table-columns';
import { StudentFormModal } from '@/components/StudentFormModal';
import { StudentViewModal } from '@/components/StudentViewModal'; // Import StudentViewModal
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function StudentPage({ students }: { students: Student[] }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false); // New state for view modal
    const [viewingStudent, setViewingStudent] = React.useState<Student | null>(null); // New state for viewing student

    const handleOpenCreateModal = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleCloseFormModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setViewingStudent(null);
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = (student: Student) => {
        if (confirm(`Are you sure you want to delete ${student.name}?`)) {
            router.delete(route('students.destroy', student.id), {
                onSuccess: () => {
                    // Optionally, show a success message or refresh data
                },
                onError: (errors) => {
                    console.error('Error deleting student:', errors);
                },
            });
        }
    };

    const handleView = (student: Student) => {
        setViewingStudent(student);
        setIsViewModalOpen(true);
    };

    const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete, onView: handleView }); // Pass onView

    return (
        <AppLayout>
            <Head title="Students" />
            <div className="m-4 flex flex-1 flex-col">
                <DndProvider backend={HTML5Backend}>
                    <div className="container mx-auto py-10">
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Students</h1>
                            <div className="space-x-2">
                                <Button onClick={handleOpenCreateModal}>Add New Student</Button>
                                <Button onClick={() => router.visit(route('students.printAllBarcodes'))}>Print All Barcodes</Button>
                            </div>
                        </div>
                        <DataTable columns={columns} data={students} />
                    </div>
                </DndProvider>
            </div>
            <StudentFormModal isOpen={isModalOpen} onClose={handleCloseFormModal} student={editingStudent} />
            <StudentViewModal isOpen={isViewModalOpen} onClose={handleCloseViewModal} student={viewingStudent} />
        </AppLayout>
    );
}
