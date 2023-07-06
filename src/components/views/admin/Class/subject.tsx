/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/tables/TableComponent';
import { TableColumn } from 'react-data-table-component';

/* eslint-disable @typescript-eslint/no-explicit-any */
const report = [
  {
    subject: 'Mathematics',
    attendancePerformance: '95%',
    name: 'Ibrahim Wilson',
  },
  {
    subject: 'Englsh',
    attendancePerformance: '75%',
    name: 'Akani Egbherve',
  },
  {
    subject: 'Social Studies',
    attendancePerformance: '51%',
    name: 'Norman Russell',
  },
  {
    subject: 'Diction',
    attendancePerformance: '55%',
    name: 'Regina Askiya',
  },
];

const columns: TableColumn<any>[] = [
  { name: 'Subject', cell: (row) => row.subject },
  {
    name: 'Attendance Performance',
    cell: (row) => row.attendancePerformance,
  },
  { name: 'Teacher', cell: (row) => <div>{row.name} </div> },
];

export default function ExamReportView() {
  return (
    <div className='flex flex-col gap-[22px]'>
      <div className='bg-white p-6 rounded border flex flex-col gap-5'>
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
