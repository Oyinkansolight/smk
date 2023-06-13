'use client';

import TextTabBar from '@/components/layout/TextTabBar';
import AcademicCalendar from '@/components/views/teacher/AcademicCalendar';
import TimetableView from '@/components/views/teacher/TimetableView';
import { useState } from 'react';

export default function Page() {
  const [idx, setIdx] = useState(0);
  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-5xl'>
        <div className='font-bold text-3xl my-14'>Timetable</div>
        <TextTabBar
          tabs={['Lecture Time table', 'Academic Calendar', 'Exam schedule']}
          selectedIdx={idx}
          onChange={setIdx}
        />
        {idx === 0 ? (
          <TimetableView />
        ) : idx === 1 ? (
          <AcademicCalendar />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
