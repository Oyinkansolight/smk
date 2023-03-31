'use client';
import { useState } from 'react';
import { RiDashboardFill } from 'react-icons/ri';

import StaffProfileCard from '@/components/cards/StaffProfile';
import TabBar from '@/components/layout/TabBar';
import TaskListView from '@/components/views/teacher/TaskListView';
import TeacherDashboardView from '@/components/views/teacher/TeacherDashboardView';

// const streamData = [
//     {
//         Raoul: 97,
//         Josiane: 95,
//         Marcel: 46,
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

const TeacherFullDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <div className='flex'>
      <StaffProfileCard />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <TabBar
          selected={tabIdx}
          onSelect={(i) => setTabIdx(i)}
          items={[
            {
              icon: <RiDashboardFill className='h-5 w-5' />,
              label: 'Dashboard',
            },
            {
              icon: <RiDashboardFill className='h-5 w-5' />,
              label: 'Class List',
            },
            {
              icon: <RiDashboardFill className='h-5 w-5' />,
              label: 'Time Table',
            },
            {
              icon: <RiDashboardFill className='h-5 w-5' />,
              label: 'Activity',
            },
          ]}
        />

        {tabIdx === 1 ? <TaskListView /> : <TeacherDashboardView />}
      </div>
    </div>
  );
};

export default TeacherFullDashboard;
