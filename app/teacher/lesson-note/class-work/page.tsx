'use client';

import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiChevronDown, BiChevronRight, BiSortUp } from 'react-icons/bi';


export default function Page() {
  const [idx, setIdx] = useState(0);
  const Assignment = [
    'Thermodynamics',
    'Friction',
    'Acceleration',
    'Kinetic Energy',
    'Mass',
  ];

  return (
    <div className='h-full layout'>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Class Work</div>
      </div>
      <TextTabBar
        tabs={[
          'All',
          ...Array(3)
            .fill(0)
            .map((v, i) => `SSS ${i + 1}`),
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      />
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
      </div>
      <div className='h-4' />
      <div className='grid p-4 text-[#746D69] font-bold md:text-base text-sm grid-cols-6'>
        <div className='col-span-2'>Title</div>
        <div>Subject</div>
        <div>Class</div>
        <div>Date Assigned</div>
        <div>Date Due</div>
      </div>
      <div className='flex flex-col gap-2'>
        {Assignment.map((title, i) => (
          <LessonTaskListItem
            isDue={i === 0 || i === 1}
            isOfflineSubmission={i === 4}
            title={title}
            subject='Physics'
            key={i}
          />
        ))}
      </div>
      <PaginatedCounter pageCount={5} currentPage={2} />
    </div>
  );
}

export function LessonTaskListItem({
  isDue,
  title,
  subject,
  isOfflineSubmission,
}: {
  isDue: boolean;
  isOfflineSubmission?: boolean;
  title: string;
  subject: string;
}) {
  return (
    <Link
      href={
        isOfflineSubmission
          ? '/teacher/lesson-note/class-work/offline-submissions'
          : '/teacher/lesson-note/class-work/submissions'
      }
    >
      <div
        className={clsxm(
          'border rounded bg-white p-4 grid grid-cols-6 items-center font-bold text-[#746D69]',
          isDue && 'border-red-500'
        )}
      >
        <div className='flex items-center col-span-2 gap-4'>
          <div className='relative rounded-full border md:block hidden h-16 w-16 '>
            <Image
              alt='book-stack'
              className='absolute inset-2'
              src='/images/book_stack.png'
              fill
            />
          </div>
          <div>{title}</div>
          {isOfflineSubmission && (
            <div className='font-normal bg-[#A5A5A5] text-white text-sm py-[1px] px-3 rounded'>
              Offline
            </div>
          )}
        </div>
        <div>{subject}</div>
        <div>SSS 1</div>
        <div>July 3</div>
        <div className='flex justify-between items-center'>
          <div className={clsxm(isDue && 'text-red-500')}>July 28</div>
          <BiChevronRight className='h-10 w-10' />
        </div>
      </div>
    </Link>
  );
}