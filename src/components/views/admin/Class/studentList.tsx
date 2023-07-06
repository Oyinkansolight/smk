/* eslint-disable @typescript-eslint/no-explicit-any */
import PaymentStatus from '@/components/profile/PaymentStatus';
import Table from '@/components/tables/TableComponent';
import Link from 'next/link';
import { TableColumn } from 'react-data-table-component';

/* eslint-disable @typescript-eslint/no-explicit-any */
const report = [
  {
    number: '#234',
    status: 'Completed',
    academicPerformance: '95%',
    attendancePerformance: '95%',
    name: 'Ibrahim Wilson',
  },
  {
    number: '#235',
    status: 'Pending',
    academicPerformance: '42%',
    attendancePerformance: '75%',
    name: 'Akani Egbherve',
  },
  {
    number: '#236',
    status: 'Pending',
    academicPerformance: '45%',
    attendancePerformance: '51%',
    name: 'Norman Russell',
  },
  {
    number: '#237',
    status: 'Due',
    academicPerformance: '35%',
    attendancePerformance: '55%',
    name: 'Regina Askiya',
  },
];

const columns: TableColumn<any>[] = [
  { name: 'Number', cell: (row) => row.number },
  {
    name: 'Payment Status',
    cell: (row) => <PaymentStatus status={row.status} />,
  },
  { name: 'Name', cell: (row) => <div>{row.name} </div> },

  {
    name: 'Academic Performance',
    cell: (row) => row.academicPerformance,
  },
  {
    name: 'Attendance Performance',
    cell: (row) => row.attendancePerformance,
  },
];

export default function ExamReportView() {
  return (
    <div className='flex flex-col gap-[22px]'>
      <div className='bg-white p-6 rounded border flex flex-col gap-5'>
        <div className='rounded px-5 flex items-center justify-end'>
          <Link
            href='/admin/add-student'
            className='w-max rounded border border-secondary px-6 py-3 text-center text-xs text-[#007AFF] '
          >
            Add Student
          </Link>
        </div>
        <Table
          showFilter={false}
          showSearch={false}
          columns={columns}
          data={report}
        />
      </div>
    </div>
  );
}
