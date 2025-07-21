'use client';

import { Student } from '@/components/data-table-columns';
import { StudentPaymentDetailsModal } from '@/components/StudentPaymentDetailsModal';
import { router } from '@inertiajs/react';
import * as React from 'react';

interface PaymentDetailsModalPageProps {
    student: Student;
}

export default function PaymentDetailsModalPage({ student }: PaymentDetailsModalPageProps) {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClose = () => {
        setIsOpen(false);
        router.visit(route('students.index')); // Redirect back to students list
    };

    return <StudentPaymentDetailsModal isOpen={isOpen} onClose={handleClose} student={student} />;
}
