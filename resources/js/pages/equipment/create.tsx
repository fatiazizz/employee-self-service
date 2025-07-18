import AppLayout from '@/layouts/app-layout';
import api from '@/lib/axios';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Equipment Request', href: '/equipment-request' },
  { title: 'Create', href: '/equipment-request/create' },
];

// لیست تجهیزات قابل انتخاب
const equipmentOptions = [
  { label: 'Case', value: 'case' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Keyboard', value: 'keyboard' },
  { label: 'Printer', value: 'printer' },
  { label: 'Cartridge', value: 'cartridge' },
];

export default function CreateEquipment() {
  const { employee_name, employee_code, now } = usePage<any>().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    employeeName: employee_name,
    employeeCode: employee_code,
    requestDate: now,
    items: [] as string[],
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCheckboxChange = (item: string) => {
    const updatedItems = data.items.includes(item)
      ? data.items.filter(i => i !== item)
      : [...data.items, item];
    setData('items', updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data.items.length === 0) {
      setValidationError('Please select at least one equipment item.');
      return;
    }

    setValidationError(null);

    try {
      await api.post('/equipment-request/create', {
        items: data.items,
      });
      router.visit('/equipment-request');
    } catch (error: any) {
      setValidationError(error?.response?.data?.message || 'Failed to submit request.');
      console.error('Submit error:', error);
    }
  };

  const handleDecline = () => {
    reset();
    router.visit('/equipment-request');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="New Equipment Request" />
      <div className="mx-auto mt-6 w-full rounded bg-white p-6 shadow max-w-2xl">
        <h1 className="mb-4 text-xl font-bold text-gray-800">New Equipment Request</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-gray-500">
            Current Date & Time: <strong>{data.requestDate}</strong>
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
            <label className="mb-2 block text-sm font-medium">Select Equipment Items</label>
            <div className="grid grid-cols-2 gap-2">
              {equipmentOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={data.items.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="h-4 w-4"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {validationError && (
            <div className="text-sm text-red-600">{validationError}</div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleDecline}
              className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            >
              Decline
            </button>
            <button
              type="submit"
              disabled={processing}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
