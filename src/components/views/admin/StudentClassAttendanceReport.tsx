/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from '@/components/buttons/BackButton';
import ScoreStatus from '@/components/profile/ScoreStatus';
import Table from '@/components/tables/TableComponent';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { BsArrowRightCircle } from 'react-icons/bs';
import ReactSelect from 'react-select';

const columns: TableColumn<any>[] = [
  { name: 'Student Name', cell: (row) => row.name },
  { name: 'Average Score', cell: (row) => <div>{row.score} %</div> },
  { name: 'Status', cell: (row) => <ScoreStatus score={row.score} /> },
  { name: 'Date', cell: (row) => row.date },
];

export default function StudentClassAttendanceReport() {
  const [showReport, setShowReport] = useState(false);
  const ListItem = ({ title }: { title: string }) => {
    return (
      <div
        onClick={() => setShowReport(true)}
        className='flex cursor-pointer text-[#6B7A99] font-bold justify-between rounded border shadow-sm border-[#E3E3E3] items-center p-2 '
      >
        <div>{title}</div>
        <BsArrowRightCircle
          className={clsxm(
            'h-[27px] w-[27px] text-[#C3CAD9] transition-transform duration-300'
          )}
        />
      </div>
    );
  };
  return showReport ? (
    <div className='bg-white p-6 rounded border flex flex-col gap-5'>
      <div className='flex items-start gap-3'>
        <BackButton onClick={() => setShowReport(false)} />
        <div className='flex-1' />
        <ReactSelect options={[{ value: 'student', label: 'Student' }]} />
        <ReactSelect options={[{ value: 'class', label: 'All Class Arm' }]} />
        <input
          type='date'
          className='border border-gray-300 rounded text-sm'
          placeholder=''
        />
      </div>
      <div className='rounded bg-[#F8FDFF] p-5 flex items-center justify-between'>
        <div className='text-[#5A5A5A]'>
          Class: <span className='font-bold text-black'>Primary 1</span>
        </div>
        <div className='flex flex-col'>
          <div className='text-xl font-bold'>72%</div>
          <div>Average Performance</div>
        </div>
      </div>
      <Table
        showFilter={false}
        showSearch={false}
        columns={columns}
        data={[{ name: 'Adejoke James', score: 55, date: '03/03/12' }]}
      />
    </div>
  ) : (
    <div className='bg-white rounded-md p-6 border'>
      <div className='flex'>
        <div className='text-[#6B7A99] text-xl font-bold'>Attendance List</div>
      </div>
      <div className='h-px bg-gray-200 my-4' />
      <div className='flex flex-col gap-2'>
        {Array(6)
          .fill(0)
          .map((v, i) => (
            <ListItem key={i} title={`Primary ${i + 1}`} />
          ))}
        <ListItem title='SSS 1 - Science Class' />
        <ListItem title='SSS 1 - Social Science Class' />
        <ListItem title='SSS 2 - Science Class' />
      </div>
    </div>
  );
}
