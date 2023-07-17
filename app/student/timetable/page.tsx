'use client';

import TabBar from '@/components/layout/TabBar';
import ExamCalendar from '@/components/views/student.tsx/Examtimetable';
import Timetable from '@/components/views/student.tsx/Timetable';
import AcademicCalendar from '@/components/views/teacher/AcademicCalendar';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';

const Page = () => {
  const [page, setPage] = useState(0);

  return (
    <div className='px-4 py-6'>
      <h1 className='text-xl font-medium mb-3 mt-6'>Timetable</h1>

      <div className='w-full border-t '>
        <TabBar
          variant='secondary'
          selected={page}
          onSelect={(i) => setPage(i)}
          items={[
            {
              icon: <BiListCheck className='h-5 w-5' />,
              label: 'Class/Lecture Timetable',
            },
            {
              icon: <BiListCheck className='h-5 w-5' />,
              label: 'Academic Calendar',
            },
            {
              icon: <BiListCheck className='h-5 w-5' />,
              label: 'Test/Examination Timetable',
            },
          ]}
        />
      </div>
      <div className='flex justify-end py-4 border-b border-black mb-5  text-gray-500'>
        <select
          name=''
          id=''
          className='p-2 bg-[#FFF6E7] border !text-xs rounded'
        >
          <option value=''> Session & Term</option>
          <option value=''>2023/2024 First</option>
          <option value=''>2023/2024 Secomd</option>
          <option value=''>2023/2024 Third</option>
        </select>
      </div>

      {page === 0 && <Timetable />}
      {page === 1 && <AcademicCalendar sessionCalendarData={[]} />}
      {page === 2 && <ExamCalendar />}
    </div>
  );
};

export default Page;
