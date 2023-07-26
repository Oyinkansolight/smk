'use client';

import Button from '@/components/buttons/Button';
import PaginatedCounter from '@/components/layout/PaginatedCounter';
import { ACTIVITY_TYPES } from '@/components/views/teacher/create-class-activity-view';
import clsxm from '@/lib/clsxm';
import { useGetStudentSubmittedActivity } from '@/server/institution/lesson-note';
import moment from 'moment';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';


export default function Page() {
  const params = useSearchParams();
  const { data: submissions } = useGetStudentSubmittedActivity({
    classArmId: params?.get('classArmId'),
    subjectId: params?.get('subjectId'),
    type: params?.get('type') as (typeof ACTIVITY_TYPES)[number] | undefined,
    studentId: 'cae64147-24d8-49f1-aa33-02b6aea56054',
  });
  return (
    <div className='h-full layout'>
      <div className='text-3xl text-[#D4D5D7]'>
        {'Class Work > Submissions'}
      </div>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Submissions</div>
      </div>
      <div className='flex gap-8 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
        <Link href='/teacher/lesson-note/class-work/late-submissions'>
          <Button className='bg-[#E5002B] px-10 hover:bg-[#9e001d] text-xs py-3 active:bg-[#c9072a] justify-center'>
            View Late Submissions
          </Button>
        </Link>
      </div>
      <div className='h-4' />
      <div className='grid p-4 text-[#746D69] font-bold text-sm md:text-base grid-cols-5'>
        <div className='col-span-2'>Name</div>
        <div>Date Submitted</div>
        <div>Due Date</div>
        <div></div>
      </div>
      <div className='flex flex-col gap-2'>
        {submissions?.map((submission, i) => (
          <AssignmentListItem
            title={`${submission?.student?.lastName} ${submission?.student?.firstName}`}
            dateSubmitted={moment(submission.createdAt).format('MMMM DD')}
            dueDate={submission.activity.dueDate}
            key={i}
            id={i + 1}
          />
        ))}
      </div>
      <PaginatedCounter pageCount={10} currentPage={3} />
    </div>
  );
}

function AssignmentListItem({
  id,
  title,
  dateSubmitted,
  dueDate,
}: {
  id: number;
  title: string;
  dateSubmitted?: string;
  dueDate?: Date;
}) {
  return (
    <Link href='/teacher/lesson-note/class-work/submissions/grade'>
      <div
        className={clsxm(
          'border rounded bg-white p-4 grid grid-cols-5 items-center font-bold text-[#746D69]'
        )}
      >
        <div className='flex items-center col-span-2 gap-8'>
          <div>{id}.</div>
          <div className='relative rounded-full border h-16 w-16 bg-gray-300 md:block hidden '></div>
          <div>{title}</div>
        </div>
        <div>{dateSubmitted ? dateSubmitted : '-'}</div>
        <div>{moment(dueDate).format('MMMM DD')}</div>
        <div className='flex justify-end '>
          <Button
            disabled={!dateSubmitted}
            className='bg-[#1A8FE3] px-10 hover:bg-[#0c5d96] disabled:bg-[#BDBEBE] text-xs py-3 active:bg-[#126eb0] justify-center'
          >
            Grade
          </Button>
        </div>
      </div>
    </Link>
  );
}