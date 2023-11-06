'use client';

import TextTabBar from '@/components/layout/TextTabBar';
import AcademicCalendar from '@/components/views/teacher/AcademicCalendar';
import TimetableView from '@/components/views/teacher/TimetableView';
import { getFromLocalStorage } from '@/lib/helper';
import { useGetTeacherTimetable } from '@/server/Schedule';
import { useGetProfile } from '@/server/auth';
import { useGetSessionCalendar } from '@/server/institution/time-table';
import { useState } from 'react';

export default function Page() {
  const [idx, setIdx] = useState(0);

  const { data: profile } = useGetProfile();

  // const currentTerm = getFromSessionStorage('currentTerm') ?? '';
  const currentSessionId = getFromLocalStorage('currentSessionId') ?? '';
  // let currentTermInfo;

  // if (currentTerm) {
  //   currentTermInfo = JSON.parse(currentTerm);
  // }
  const { data: sessionCalendarData } = useGetSessionCalendar(currentSessionId ?? "");

  const { data, isLoading } = useGetTeacherTimetable({
    // sessionId: currentSessionId,
    // termId: currentTermInfo?.id,
    classId: profile?.userInfo?.staff?.managedClassArm?.class?.id,
    teacherId: profile?.userInfo?.staff?.id,
  });

  return (
    <div className='layout flex justify-center'>
      <div className='w-full max-w-5xl'>
        <div className='font-bold text-3xl my-14'>Timetable</div>
        <TextTabBar
          tabs={['Lecture Time table', 'Academic Calendar', 'Exam schedule']}
          selectedIdx={idx}
          onChange={setIdx}
        />
        {idx === 0 ? (
          <TimetableView data={data} isLoading={isLoading} />
        ) : idx === 1 ? (
          <AcademicCalendar sessionCalendarData={sessionCalendarData} />
        ) : (
          <AcademicCalendar sessionCalendarData={sessionCalendarData} />
        )}
      </div>
    </div>
  );
}
