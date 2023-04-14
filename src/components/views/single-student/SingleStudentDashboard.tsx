'use client';

import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import SchoolCalendarView from '@/components/views/single-school/SchoolCalendarView';
import StudentDashboardView from '@/components/views/single-school/SchoolDashboardView';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleStudentDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <div className='flex'>
      <StudentTeacherProfileCard
        image='/images/test_student.png'
        name='Akani Egbherve'
        school='Avril Price School'
        id=''
        student
      />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            variant='primary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Dashboard',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Report Card',
              },
              {
                icon: <RiCalendar2Fill className='h-5 w-5' />,
                label: 'Attendance Tracker',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <StudentDashboardView />}
        {tabIdx === 1 && (
          <ExamReportView
            report={[
              { name: 'Mathematics', score: 58, date: new Date() },
              { name: 'Mathematics', score: 88, date: new Date() },
              { name: 'Mathematics', score: 45, date: new Date() },
              { name: 'Mathematics', score: 34, date: new Date() },
            ]}
          />
        )}
        {tabIdx === 2 && <SchoolCalendarView />}
      </div>
    </div>
  );
};

export default SingleStudentDashboard;
