import Modal from '@/components/ui/modal';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/axios';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/admin/users' },
];

export default function UserShowPage() {
    const { user, allUsers,auth } = usePage<any>().props;
    console.log('user', user);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedManagerId, setSelectedManagerId] = useState(user.manager_id);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [manager, setManager] = useState(user.manager_id);

    const handleSaveManager = async () => {
        try {
            await api.post(`/admin/users/${user.id}/manager`, {
                manager_id: selectedManagerId || null,
            });
            setSuccessMessage(`Manager updated successfully.`);
            setSelectedManagerId(selectedManagerId);
            setManager(selectedManagerId);
            setTimeout(() => setSuccessMessage(null), 10000);
            // alert('Manager updated successfully.');
            setModalOpen(false);
            location.reload();
        } catch (error) {
            console.error('Failed to update manager:', error);
            alert('An error occurred while updating the manager.');
        }
    };

    const handleMakeAdmin = async () => {
        try {
            await api.post(`/admin/users/${user.id}/make-admin`);
            setSuccessMessage(`User granted admin access.`);
            setShowAdminModal(false);
            setTimeout(() => setSuccessMessage(null), 10000);
            location.reload();
        } catch (error) {
            console.error('Failed to make admin:', error);
            alert('An error occurred while updating admin status.');
        }
    };

    return (
        <AppLayout breadcrumbs={[...breadcrumbs, { title: user.name }]}>
            <Head title={`User: ${user.name}`} />

            <div className="mx-auto mt-6 w-full rounded-lg bg-white p-6 shadow">
                <h1 className="mb-6 text-xl font-bold text-gray-800">User Details</h1>

                {successMessage && <div className={`mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-800 shadow`}>{successMessage}</div>}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* نمایش دستی مدیر */}

                    {/* نمایش بقیه فیلدها */}
                    {Object.entries(user).map(([key, value]) => {
                        // از نمایش فیلدهایی که نمی‌خواهیم تکراری بشن صرف‌نظر می‌کنیم
                        if (key === 'manager') return null;

                        return (
                            <div key={key}>
                                <strong className="block text-gray-500">{key}</strong>
                                <span className="text-gray-800">{String(value ?? '—')}</span>
                            </div>
                        );
                    })}

                    <div>
                        <strong className="block text-gray-500">Manager</strong>
                        <span className="text-gray-800">{user.manager?.name ?? '—'}</span>
                    </div>
                </div>

                <div className="mt-8">
                    <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={() => setModalOpen(true)}>
                        Change Manager
                    </button>
                    {(!user.is_admin && auth.user.is_admin === 1) && (
                        <button className="rounded bg-purple-600 px-4 py-2 mx-2 text-white hover:bg-purple-700" onClick={() => setShowAdminModal(true)}>
                            Make Admin
                        </button>
                    )}
                </div>
            </div>

            <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Select New Manager</h2>
                    <select
                        value={selectedManagerId}
                        onChange={(e) => setSelectedManagerId(Number(e.target.value))}
                        className="w-full rounded border px-3 py-2"
                    >
                        <option value="">— No Manager —</option>
                        {allUsers.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                    <div className="mt-4 flex justify-end">
                        <button className="mr-2 rounded px-4 py-2 text-gray-600 hover:text-gray-800" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700" onClick={handleSaveManager}>
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Modal: Make Admin Confirmation */}
            <Modal show={showAdminModal} onClose={() => setShowAdminModal(false)}>
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Make Admin</h2>
                    <p className="mb-4 text-sm text-gray-700">
                        Are you sure you want to grant <strong>{user.name}</strong> admin privileges?
                    </p>
                    <div className="flex justify-end gap-3">
                        <button className="rounded px-4 py-2 text-gray-600 hover:text-gray-800" onClick={() => setShowAdminModal(false)}>
                            Cancel
                        </button>
                        <button className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700" onClick={handleMakeAdmin}>
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}
