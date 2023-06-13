'use client';

import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import SmallTeacherSubjectListItem from '@/components/views/teacher/SmallTeacherSubjectListItem';
import { useGetInstituteClass } from '@/server/institution/class';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function Page() {
  const router = useRouter();
  const { data } = useGetInstituteClass('');
  const [idx, setIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className='px-8 layout'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {'Classes > Mathematics'}
      </div>
      <TextTabBar
        tabs={[
          'All',
          'Primary 1',
          'Primary 2',
          'Primary 3',
          'Primary 4',
          'Primary 5',
          'Primary 6',
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      />
      <div className='flex justify-end'>
        <div className='flex items-center font-bold my-5 gap-3'>
          <IoChevronBack className='text-blue-500 h-5 w-5' /> <div>Week 3</div>{' '}
          <IoChevronForward className='text-blue-500 h-5 w-5' />
        </div>
      </div>
      <div className=''>
        <div className='font-bold py-8 text-4xl'>Mathematics</div>
        <div className='flex flex-col  gap-4'>
          {data ? (
            data.map((v, i) => (
              <SmallTeacherSubjectListItem
                onClick={() => router.push('/teacher/classes/subject-task')}
                key={i}
                cl={v.name}
                time='12:00 PM - 01:00 PM'
              />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
      <PaginatedCounter
        currentPage={currentPage}
        onChange={setCurrentPage}
        pageCount={6}
      />
    </div>
  );
}
