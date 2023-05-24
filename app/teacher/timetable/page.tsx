'use client';

import TextTabBar from '@/components/layout/TextTabBar';
import TimetableView from '@/components/views/teacher/TimetableView';
import { useState } from 'react';

export default function Page() {
  const [idx, setIdx] = useState(0);
  return (
    <div className='flex justify-center'>
      <div>
        <div className='font-bold text-3xl my-14'>Timetable</div>
        <TextTabBar
          tabs={['Lecture Time table', 'Academic Calendar', 'Exam schedule']}
          selectedIdx={idx}
          onChange={setIdx}
        />
        <TimetableView />
      </div>
    </div>
  );
}
