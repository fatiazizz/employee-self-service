import Modal from '@/components/ui/modal';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/axios';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Department', href: '/admin/department' },
];

export default function DepartmentIndex() {
    const { departments } = usePage<any>().props;

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Overview" />
            <div className="mb-4 text-right mt-5">
                <button onClick={() => setCreateModalOpen(true)} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Create New Department
                </button>
            </div>
            <div className="mt-6 rounded-lg bg-white p-6 shadow">
                <h1 className="mb-6 text-xl font-bold text-gray-800">Department List Overview</h1>

                <div className="overflow-auto">
                    <table className="w-full table-auto border-collapse text-left text-sm text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department, index) => (
                                <tr key={department.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{department.name}</td>
                                </tr>
                            ))}

                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-4 py-3 text-center text-gray-500">
                                        No departments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={createModalOpen} onClose={() => setCreateModalOpen(false)}>
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Create New Department</h2>

                    <label className="mb-2 block text-sm font-medium text-gray-700">Department Name</label>
                    <input
                        type="text"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                        placeholder="e.g. Finance"
                        className="w-full rounded border px-3 py-2"
                    />

                    <div className="mt-4 flex justify-end gap-2">
                        <button className="rounded px-4 py-2 text-gray-600 hover:text-gray-800" onClick={() => setCreateModalOpen(false)}>
                            Cancel
                        </button>
                        <button
                            disabled={isSubmitting || newDepartmentName.trim() === ''}
                            onClick={async () => {
                                try {
                                    setIsSubmitting(true);
                                    await api.post(`/admin/departments/create`, {
                                        name: newDepartmentName,
                                    });
                                    setCreateModalOpen(false);
                                    setNewDepartmentName('');
                                    location.reload(); // برای تازه‌سازی لیست
                                } catch (err) {
                                    alert('An error occurred while creating the department.');
                                    console.error(err);
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                            className={`rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}
