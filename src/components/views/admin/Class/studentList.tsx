/* eslint-disable @typescript-eslint/no-explicit-any */
import OnlineStatus from '@/components/profile/OnlineStatus';
import PaymentStatus from '@/components/profile/PaymentStatus';
import Table from '@/components/tables/TableComponent';
import logger from '@/lib/logger';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
import Link from 'next/link';
import { TableColumn } from 'react-data-table-component';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Iprop {
  classArmId: string | null | undefined  ;
}
// const report = [
//   {
//     number: '#234',
//     status: 'Completed',
//     academicPerformance: '95%',
//     attendancePerformance: '95%',
//     name: 'Ibrahim Wilson',
//   },
//   {
//     number: '#235',
//     status: 'Pending',
//     academicPerformance: '42%',
//     attendancePerformance: '75%',
//     name: 'Akani Egbherve',
//   },
//   {
//     number: '#236',
//     status: 'Pending',
//     academicPerformance: '45%',
//     attendancePerformance: '51%',
//     name: 'Norman Russell',
//   },
//   {
//     number: '#237',
//     status: 'Due',
//     academicPerformance: '35%',
//     attendancePerformance: '55%',
//     name: 'Regina Askiya',
//   },
// ];

// const columns: TableColumn<any>[] = [
//   { name: 'Number', cell: (row) => row.number },
//   {
//     name: 'Payment Status',
//     cell: (row) => <PaymentStatus status={row.status} />,
//   },
//   { name: 'Name', cell: (row) => <div>{row.name} </div> },

//   {
//     name: 'Academic Performance',
//     cell: (row) => row.academicPerformance,
//   },
//   {
//     name: 'Attendance Performance',
//     cell: (row) => row.attendancePerformance,
//   },
// ];

const studentListColumns: TableColumn<any>[] = [
  { name: 'Number', cell: (row) => <div className='truncate'> {row.id}</div> },
  { name: 'Status', cell: () => <OnlineStatus status='online' /> },
  {
    name: 'Name',
    cell: (row) => (
      <div>
        {row.user[0].firstName} {row.user[0].lastName}
      </div>
    ),
  },
  {
    name: 'Academic Performance',
    cell: () => <div>{0}%</div>,
  },
  {
    name: 'Attendance Rate',
    cell: () => (
      <div className='text-gray-500 font-bold text-center'>{0}%</div>
    ),
  },
];

export default function StudentList({ classArmId }: Iprop) {
  const { data: getInstitutionStudents } = useGetClassArmStudents({
    classArmId: classArmId,
  });
  
  logger(getInstitutionStudents)


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
          columns={studentListColumns}
          // data={getInstitutionStudents}
          data={[]}
        />
      </div>
    </div>
  );
}
