import AppLayout from '@/layouts/app-layout';
import api from '@/lib/axios';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leave Request', href: '/leave-request' },
    { title: 'Create', href: '/leave-request/create' },
];

export default function CreateLeave() {
    const { employee_name, employee_code, remaining_hours, year, now } = usePage<any>().props;
    console.log('remaining_hours', remaining_hours);

    // const now = dayjs().format('YYYY-MM-DDTHH:mm'); // datetime-local format

    const { data, setData, post, processing, errors, reset } = useForm({
        employeeName: employee_name,
        employeeCode: employee_code,
        remainingLeave: remaining_hours,
        startDateTime: now,
        endDateTime: now,
        totalDays: 0,
    });

    const [validationError, setValidationError] = useState<string | null>(null);

    const calculateDays = () => {
        const start = dayjs(data.startDateTime);
        const end = dayjs(data.endDateTime);
        const diff = end.diff(start, 'hour') / 24;
        return diff > 0 ? diff : 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const total = calculateDays();

        if (total > data.remainingLeave) {
            setValidationError('Requested leave exceeds remaining leave balance.');
            return;
        }

        setValidationError(null);

        try {
            await api.post('/leave-request/create', {
                start_at: data.startDateTime,
                end_at: data.endDateTime,
                total_days: total,
            });
            router.visit('/leave-request');
        } catch (error:any) {
          console.log("error",error);
            setValidationError(error.response.data.message);
            console.log('Submit error:', error);
        }
    };

    const handleDecline = () => {
        reset();
        router.visit('/leave-request'); // بازگشت به صفحه لیست
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Leave Request" />
            <div className="mx-auto mt-6 w-full rounded bg-white p-6 shadow">
                <h1 className="mb-4 text-xl font-bold text-gray-800">New Leave Request</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-sm text-gray-500">
                        Current Date & Time: <strong>{dayjs().format('YYYY-MM-DD HH:mm')}</strong>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Employee Name</label>
                        <input value={data.employeeName} disabled className="w-full rounded border bg-gray-100 px-3 py-2" />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Employee Code</label>
                        <input value={data.employeeCode} disabled className="w-full rounded border bg-gray-100 px-3 py-2" />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Remaining Leave</label>
                        <input value={data.remainingLeave} disabled className="w-full rounded border bg-gray-100 px-3 py-2" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Start Date & Time</label>
                            <input
                                type="datetime-local"
                                value={data.startDateTime}
                                onChange={(e) => setData('startDateTime', e.target.value)}
                                className="w-full rounded border px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">End Date & Time</label>
                            <input
                                type="datetime-local"
                                value={data.endDateTime}
                                onChange={(e) => setData('endDateTime', e.target.value)}
                                className="w-full rounded border px-3 py-2"
                            />
                        </div>
                    </div>

                    {validationError && <div className="mt-1 text-sm text-red-600">{validationError}</div>}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleDecline}
                            className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300"
                        >
                            Decline
                        </button>
                        <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
