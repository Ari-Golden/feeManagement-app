'use client';

import { Student } from '@/components/data-table-columns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import * as React from 'react';

interface StudentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    student?: Student | null; // Optional for editing
}

export function StudentFormModal({ isOpen, onClose, student }: StudentFormModalProps) {
    const isEditing = !!student;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        no_ppdb: '',
        nisn: '',
        name: '',
        class: '',
    });

    React.useEffect(() => {
        if (isOpen) {
            if (student) {
                setData({
                    id: String(student.id),
                    no_ppdb: student.no_ppdb,
                    nisn: student.nisn,
                    name: student.name,
                    class: student.class,
                });
            } else {
                console.log('Modal opened for creation, resetting form.');
                reset();
            }
        } else {
            reset();
        }
    }, [isOpen, student, reset, setData]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('students.update', data.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            331133;
            post(route('students.store'), {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Student' : 'Create Student'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Make changes to student details here.' : 'Fill in the details for a new student.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4">
                    {isEditing && <input type="hidden" name="id" value={data.id} />}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="no_ppdb" className="text-right">
                            No. PPDB
                        </Label>
                        <Input id="no_ppdb" value={data.no_ppdb} onChange={(e) => setData('no_ppdb', e.target.value)} className="col-span-3" />
                        {errors.no_ppdb && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.no_ppdb}</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nisn" className="text-right">
                            NISN
                        </Label>
                        <Input id="nisn" value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} className="col-span-3" />
                        {errors.nisn && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.nisn}</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                        {errors.name && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="class" className="text-right">
                            Class
                        </Label>
                        <Input id="class" value={data.class} onChange={(e) => setData('class', e.target.value)} className="col-span-3" />
                        {errors.class && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.class}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {isEditing ? 'Save Changes' : 'Create Student'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
