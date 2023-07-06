/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from '@/components/buttons/BackButton';
import ScoreStatus from '@/components/profile/ScoreStatus';
import Table from '@/components/tables/TableComponent';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { BsArrowRightCircle } from 'react-icons/bs';

const columns: TableColumn<any>[] = [
  { name: 'Subject', cell: (row) => row.name },
  {
    name: 'Status',
    cell: (row) => <ScoreStatus score={row.score} />,
  },
  { name: 'Average Score', cell: (row) => <div>{row.score} %</div> },

  { name: 'Date', cell: (row) => (row.date as Date).toDateString() },
];

export default function ExamReportView({
  report,
}: {
  report: { name: string; score: number; date: Date }[];
}) {
  const [show, setShow] = useState(false);
  const ListItem = ({ title }: { title: string }) => {
    return (
      <div
        onClick={() => setShow(true)}
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
  return show ? (
    <div className='flex flex-col gap-[22px]'>
      <div className='bg-white p-6 rounded border flex flex-col gap-5'>
        <div className='flex items-start gap-3'>
          <BackButton onClick={() => setShow(false)} />
          <div className='flex-1' />
        </div>
        <div className='rounded bg-[#F8FDFF] p-5 flex items-center justify-between'>
          <div className='text-[#5A5A5A]'>
            Class: <span className='font-bold text-black'>Primary 1</span>
          </div>
          <div className='flex flex-col'>
            <div className='text-xl font-bold'>72%</div>
            <div>Student Average</div>
          </div>
        </div>
        <Table
          showFilter={false}
          showSearch={false}
          columns={columns}
          data={report}
        />
      </div>
    </div>
  ) : (
    <div className='bg-white rounded-md p-6 border'>
      <div className='flex'>
        <div className='text-[#6B7A99] text-xl font-bold'>Exam Report</div>
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
