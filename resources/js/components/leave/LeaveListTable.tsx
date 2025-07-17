// components/leave/LeaveListTable.tsx

import { useEffect, useState } from 'react';

interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeCode: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
}

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export function LeaveListTable() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    // Simulated fetch (replace with real API call)
    setTimeout(() => {
      setLeaveRequests([
        {
          id: 1,
          employeeName: 'Ahmad Naderi',
          employeeCode: 'EMP001',
          startDate: '2025-07-10',
          endDate: '2025-07-12',
          days: 3,
          status: 'approved',
        },
        {
          id: 2,
          employeeName: 'Sara Mohammadi',
          employeeCode: 'EMP002',
          startDate: '2025-07-15',
          endDate: '2025-07-16',
          days: 2,
          status: 'pending',
        },
      ]);
    }, 500);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-xs text-gray-600 uppercase text-center">
          <tr>
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">End Date</th>
            <th className="px-4 py-3">Days</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req) => (
            <tr key={req.id} className="border-b text-center hover:bg-gray-50">
              <td className="px-4 py-3">{req.employeeName}</td>
              <td className="px-4 py-3">{req.employeeCode}</td>
              <td className="px-4 py-3">{req.startDate}</td>
              <td className="px-4 py-3">{req.endDate}</td>
              <td className="px-4 py-3">{req.days}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[req.status]}`}
                >
                  {req.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:underline text-xs">
                  View
                </button>
              </td>
            </tr>
          ))}
          {leaveRequests.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-400">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
