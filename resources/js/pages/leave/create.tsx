import { useForm, Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import dayjs from 'dayjs';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Leave Request', href: '/leave-request' },
  { title: 'Create', href: '/leave-request/create' },
];

export default function CreateLeave() {
  const now = dayjs().format('YYYY-MM-DDTHH:mm'); // datetime-local format

  const { data, setData, post, processing, errors, reset } = useForm({
    employeeName: 'Ahmad Naderi',
    employeeCode: 'EMP001',
    remainingLeave: 0,
    startDateTime: now,
    endDateTime: now,
    totalDays: 0,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/user/leave-remaining')
      .then((res) => {
        const hours = res.data.remaining_hours ?? 0;
        setData('remainingLeave', hours / 24); // تبدیل ساعت به روز
      })
      .catch(() => setData('remainingLeave', 0));
  }, []);

  const calculateDays = () => {
    const start = dayjs(data.startDateTime);
    const end = dayjs(data.endDateTime);
    const diff = end.diff(start, 'hour') / 24;
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = calculateDays();

    if (total > data.remainingLeave) {
      setValidationError('Requested leave exceeds remaining leave balance.');
      return;
    }

    setValidationError(null);
    setData('totalDays', total);

    post('/api/leave-requests', {
      data: {
        start_at: data.startDateTime,
        end_at: data.endDateTime,
      },
      onSuccess: () => {
        router.visit('/leave-request');
      },
    });
  };

  const handleDecline = () => {
    reset();
    router.visit('/leave-request'); // بازگشت به صفحه لیست
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="New Leave Request" />
      <div className="w-full mx-auto mt-6 bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold text-gray-800 mb-4">New Leave Request</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-gray-500">
            Current Date & Time: <strong>{dayjs().format('YYYY-MM-DD HH:mm')}</strong>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employee Name</label>
            <input
              value={data.employeeName}
              disabled
              className="w-full bg-gray-100 px-3 py-2 rounded border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employee Code</label>
            <input
              value={data.employeeCode}
              disabled
              className="w-full bg-gray-100 px-3 py-2 rounded border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remaining Leave</label>
            <input
              value={data.remainingLeave}
              disabled
              className="w-full bg-gray-100 px-3 py-2 rounded border"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                value={data.startDateTime}
                onChange={(e) => setData('startDateTime', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                value={data.endDateTime}
                onChange={(e) => setData('endDateTime', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {validationError && (
            <div className="text-red-600 text-sm mt-1">{validationError}</div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleDecline}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Decline
            </button>
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
