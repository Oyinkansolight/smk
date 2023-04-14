'use client';

import { SchoolProfileCard } from '@/components/cards';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import SchoolCalendarView from '@/components/views/single-school/SchoolCalendarView';
import SchoolDashboardView from '@/components/views/single-school/SchoolDashboardView';
import TaskListView from '@/components/views/teacher/TaskListView';
import { useState } from 'react';
import { IoMdTrendingUp } from 'react-icons/io';
import { IoReorderThree } from 'react-icons/io5';
import { MdOutlineSort } from 'react-icons/md';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

// const streamData = [
//     {
//         Raoul: 97,
//         Josiane: 95,
//         Marcel: 46,ßƒ
//         René: 22,
//         Paul: 97,
//         Jacques: 84,
//     },
//     {
//         Raoul: 32,
//         Josiane: 62,
//         Marcel: 131,
//         René: 132,
//         Paul: 160,
//         Jacques: 137,
//     },
//     {
//         Raoul: 43,
//         Josiane: 51,
//         Marcel: 88,
//         René: 95,
//         Paul: 117,
//         Jacques: 91,
//     },
//     {
//         Raoul: 26,
//         Josiane: 68,
//         Marcel: 182,
//         René: 147,
//         Paul: 115,
//         Jacques: 134,
//     },
//     {
//         Raoul: 92,
//         Josiane: 139,
//         Marcel: 70,
//         René: 142,
//         Paul: 49,
//         Jacques: 39,
//     },
//     {
//         Raoul: 51,
//         Josiane: 150,
//         Marcel: 92,
//         René: 151,
//         Paul: 67,
//         Jacques: 170,
//     },
//     {
//         Raoul: 193,
//         Josiane: 84,
//         Marcel: 139,
//         René: 147,
//         Paul: 143,
//         Jacques: 168,
//     },
//     {
//         Raoul: 185,
//         Josiane: 175,
//         Marcel: 136,
//         René: 113,
//         Paul: 136,
//         Jacques: 62,
//     },
//     {
//         Raoul: 43,
//         Josiane: 140,
//         Marcel: 98,
//         René: 65,
//         Paul: 127,
//         Jacques: 162,
//     },
// ];

const SingleSchoolDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <div className='flex'>
      <SchoolProfileCard />
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
                icon: <RiCalendar2Fill className='h-5 w-5' />,
                label: 'Calendar',
              },
              {
                icon: <MdOutlineSort className='h-5 w-5' />,
                label: 'Assessment',
              },
              {
                icon: <IoReorderThree className='h-5 w-5' />,
                label: 'Exam Report',
              },
              {
                icon: <IoMdTrendingUp className='h-5 w-5' />,
                label: 'Attendance Report',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <SchoolDashboardView />}
        {tabIdx === 1 && <SchoolCalendarView />}
        {tabIdx === 2 && <TaskListView />}
        {tabIdx === 3 && (
          <ExamReportView
            report={[
              { name: 'Mathematics', score: 58, date: new Date() },
              { name: 'Mathematics', score: 88, date: new Date() },
              { name: 'Mathematics', score: 45, date: new Date() },
              { name: 'Mathematics', score: 34, date: new Date() },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default SingleSchoolDashboard;
