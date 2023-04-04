'use client';
import { duration } from 'moment';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { IoMdTrendingUp } from 'react-icons/io';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

import StudentProfile from '@/components/cards/StudentProfile';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import ReportCardView from '@/components/views/student.tsx/ReportCardView';
import StudentActivityHistory from '@/components/views/student.tsx/StudentActivityHistory';
import StudentDashboardView from '@/components/views/student.tsx/StudentDashboardView';
import StudentTaskListView from '@/components/views/student.tsx/StudentTaskListView';
import StudentTimeTableView from '@/components/views/student.tsx/StudentTimeTableView';

const Page = () => {
  const [tabIdx, setTabIdx] = useState(4);
  return (
    <div className='mt-4 flex gap-6'>
      <StudentProfile />
      <div className='flex max-h-[85vh] flex-1 flex-col gap-[31px] overflow-y-scroll rounded-xl border px-4'>
        <div className='flex w-full items-center'>
          <TabBar
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Dashboard',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Assignment List',
              },
              {
                icon: <RiCalendar2Fill className='h-5 w-5' />,
                label: 'Time Table',
              },
              {
                icon: <RiCalendar2Fill className='h-5 w-5' />,
                label: 'Subjects',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Report Card',
              },
              {
                icon: <IoMdTrendingUp className='h-5 w-5' />,
                label: 'Activity History',
              },
            ]}
            buttonActiveClassName='border-fun-green-500 text-fun-green-500'
          />
          <div className='h-full flex-1 border-b-2' />
          <div className='flex h-full items-center border-b-2'>
            <SearchInput placeholder='Search Tasks' />
          </div>
        </div>

        {tabIdx === 1 ? (
          <StudentTaskListView
            tasks={[
              { name: 'Math Assignment', progress: 12 },
              { name: 'French Assignment', progress: 12 },
              { name: 'Math Assignment', progress: 12 },
              { name: 'Science Assignment', progress: 12 },
            ]}
          />
        ) : tabIdx === 2 ? (
          <StudentTimeTableView />
        ) : tabIdx === 3 ? (
          <div></div>
        ) : tabIdx === 4 ? (
          <ReportCardView
            report={[
              { name: 'Mathematics', score: 58, date: new Date() },
              { name: 'Mathematics', score: 88, date: new Date() },
              { name: 'Mathematics', score: 45, date: new Date() },
              { name: 'Mathematics', score: 34, date: new Date() },
            ]}
          />
        ) : tabIdx === 5 ? (
          <StudentActivityHistory
            activities={[
              {
                activity: 'Class',
                date: new Date('2022-09-27 18:00:00.000'),
                duration: duration(3, 'h'),
                status: 'Completed',
              },
              {
                activity: 'Class',
                date: new Date('2022-09-27 18:00:00.000'),
                duration: duration(3, 'h'),
                status: 'Completed',
              },
              {
                activity: 'Class',
                date: new Date('2022-09-27 18:00:00.000'),
                duration: duration(3, 'h'),
                status: 'Completed',
              },
              {
                activity: 'Class',
                date: new Date('2022-09-27 18:00:00.000'),
                duration: duration(3, 'h'),
                status: 'Completed',
              },
            ]}
          />
        ) : (
          <StudentDashboardView />
        )}
      </div>
    </div>
  );
};

export default Page;
