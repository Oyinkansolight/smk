'use client';

import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import SchoolCalendarView from '@/components/views/single-school/SchoolCalendarView';
import ClassCalendarView from '@/components/views/super-admin/SingleSchoolCalendar/ClassCalendarView';
import Info from '@/components/views/super-admin/SingleSchoolCalendar/info';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleStudentDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <div className='flex'>
      <Info />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            variant='primary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Academic Calendar',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Class/Lecture Timetable',
              },
              {
                icon: <RiCalendar2Fill className='h-5 w-5' />,
                label: 'Exam Timetable',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <ClassCalendarView />}
        {tabIdx === 1 && <div>Content yet to be available</div>}
        {tabIdx === 2 && <ClassCalendarView />}
      </div>
    </div>
  );
};

export default SingleStudentDashboard;
