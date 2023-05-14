'use client';

import StaffProfileCard from '@/components/cards/StaffProfile';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import TaskListView from '@/components/views/teacher/TaskListView';
import TeacherDashboardView from '@/components/views/teacher/TeacherDashboardView';
import TeacherTimeTableView from '@/components/views/teacher/TeacherTimeTableView';
import { DashboardOverview } from '@/types';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { IoMdTrendingUp } from 'react-icons/io';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

interface TeacherFullDashboardProps {
  overviewData: DashboardOverview;
}

const TeacherFullDashboard = ({ overviewData }: TeacherFullDashboardProps) => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <div className='layout flex'>
      <StaffProfileCard />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Dashboard',
              },
              {
                icon: <BiListCheck className='h-7 w-7' />,
                label: 'Task List',
              },
              {
                icon: <RiCalendar2Fill className='h-5 w-5' />,
                label: 'Time Table',
              },
              {
                icon: <IoMdTrendingUp className='h-5 w-5' />,
                label: 'Activity',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 1 ? (
          <TaskListView />
        ) : tabIdx === 2 ? (
          <TeacherTimeTableView />
        ) : (
          <TeacherDashboardView overviewData={overviewData} />
        )}
      </div>
    </div>
  );
};

export default TeacherFullDashboard;
