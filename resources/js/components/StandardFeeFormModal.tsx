'use client';

import { StandardFee } from '@/components/standard-fee-table-columns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import * as React from 'react';

interface StandardFeeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    standardFee?: StandardFee | null; // Optional for editing
}

export function StandardFeeFormModal({ isOpen, onClose, standardFee }: StandardFeeFormModalProps) {
    const isEditing = !!standardFee;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        amount: '',
        frequency: '',
        th_ajaran: '',
        note: '',
    });

    React.useEffect(() => {
        if (isOpen) {
            if (standardFee) {
                setData({
                    id: String(standardFee.id),
                    name: standardFee.name,
                    amount: String(standardFee.amount),
                    frequency: standardFee.frequency || '',
                    th_ajaran: standardFee.th_ajaran || '',
                    note: standardFee.note || '',
                });
            } else {
                reset();
            }
        } else {
            reset();
        }
    }, [isOpen, standardFee, reset, setData]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('standard-fees.update', data.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            post(route('standard-fees.store'), {
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
                    <DialogTitle>{isEditing ? 'Edit Standard Fee' : 'Create Standard Fee'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Make changes to standard fee details here.' : 'Fill in the details for a new standard fee.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4">
                    {isEditing && <input type="hidden" name="id" value={data.id} />}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                        {errors.name && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="col-span-3"
                        />
                        {errors.amount && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.amount}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="frequency" className="text-right">
                            Frequency
                        </Label>
                        <Input
                            id="frequency"
                            type="text"
                            value={data.frequency}
                            onChange={(e) => setData('frequency', e.target.value)}
                            className="col-span-3"
                        />
                        {errors.frequency && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.frequency}</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="th_ajaran" className="text-right">
                            Tahun Ajaran
                        </Label>
                        <Input
                            id="th_ajaran"
                            type="text"
                            value={data.th_ajaran}
                            onChange={(e) => setData('th_ajaran', e.target.value)}
                            className="col-span-3"
                        />
                        {errors.th_ajaran && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.th_ajaran}</p>}
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="note" className="text-right">
                            Note
                        </Label>
                        <Input id="note" type="text" value={data.note} onChange={(e) => setData('note', e.target.value)} className="col-span-3" />
                        {errors.note && <p className="col-span-4 mt-1 text-sm text-red-500">{errors.note}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {isEditing ? 'Save Changes' : 'Create Standard Fee'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
