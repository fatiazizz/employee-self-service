import { Head, Link } from '@inertiajs/react';
import { LeaveListTable } from '@/components/leave/LeaveListTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Leave Requests', href: '/leave' },
];

export default function LeaveList() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Leave Requests" />

      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Leave Requests
          </h1>
          <Link
            href="/leave-request/create"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + New Leave Request
          </Link>
        </div>

        <LeaveListTable />
      </div>
    </AppLayout>
  );
}
