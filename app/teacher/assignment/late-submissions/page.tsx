'use client';

import Button from '@/components/buttons/Button';
import PaginatedCounter from '@/components/layout/PaginatedCounter';
import ExtendDeadlineModal from '@/components/modals/extend-deadline-modal';
import clsxm from '@/lib/clsxm';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';
import ReactSelect from 'react-select';

export default function Page() {
  return (
    <div className='h-full layout'>
      <div className='text-3xl text-[#D4D5D7]'>
        {'Assignments > Late Submissions'}
      </div>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Overdue Submissions</div>
      </div>
      <div className='flex gap-8 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
        <ExtendDeadlineModal>
          <Button className='bg-[#1A8FE3] px-10 hover:bg-[#0c5d96] text-xs py-3 active:bg-[#126eb0] justify-center'>
            Extend Deadline
          </Button>
        </ExtendDeadlineModal>
      </div>
      <div className='h-4' />
      <div className='grid p-4 text-[#746D69] font-bold text-base grid-cols-4'>
        <div className='col-span-2'>Name</div>
        <div>Due Date</div>
        <div></div>
      </div>
      <div className='flex flex-col gap-2'>
        {Array(5)
          .fill(0)
          .map((v, i) => (
            <AssignmentListItem title='Ighosa Ahmed' key={i} id={i + 1} />
          ))}
      </div>
      <PaginatedCounter pageCount={10} currentPage={3} />
    </div>
  );
}

function AssignmentListItem({ id, title }: { id: number; title: string }) {
  return (
    <div
      className={clsxm(
        'border rounded bg-white p-4 grid grid-cols-4 items-center font-bold text-[#746D69]'
      )}
    >
      <div className='flex items-center col-span-2 gap-8'>
        <div>{id}.</div>
        <div className='relative rounded-full border h-16 w-16 bg-gray-300 '></div>
        <div>{title}</div>
      </div>
      <div>June 25, 2023</div>
      <div className='flex justify-end items-center gap-4'>
        <div>Priority</div>
        <ReactSelect
          className='w-[5rem]'
          options={Array(11)
            .fill(0)
            .map((v, i) => ({ label: i - 5 }))}
        />
      </div>
    </div>
  );
}
