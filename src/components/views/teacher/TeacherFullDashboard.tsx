'use client';

import { BasicCard } from '@/components/cards';
import ClockInTime from '@/components/views/teacher/ClockInTime';
import IncidentReport from '@/components/views/teacher/IncidentReport';
import TaskListView from '@/components/views/teacher/TaskListView';
import TeacherDashboardView from '@/components/views/teacher/TeacherDashboardView';
import TeacherTimeTableView from '@/components/views/teacher/TeacherTimeTableView';
import { DashboardOverview } from '@/types';
import { useState } from 'react';

interface TeacherFullDashboardProps {
  overviewData: DashboardOverview | undefined;
}

const TeacherFullDashboard = ({ overviewData }: TeacherFullDashboardProps) => {
  const [tabIdx, setTabIdx] = useState(0);

  const handleTabChange = (i: number) => setTabIdx(i);

  return (
    <div className='flex'>
      <div className='flex flex-1 flex-col gap-[31px] w-full'>
        <BasicCard className='flex w-full flex-col gap-8 !rounded-[4.5px] bg-white !px-[27px] !pb-[27px] !pt-[18px]'>
          <div className='flex w-full justify-end'>
            <ClockInTime />
          </div>
        </BasicCard>

        <div className='layout'>
          {tabIdx === 1 ? (
            <TaskListView />
          ) : tabIdx === 2 ? (
            <TeacherTimeTableView />
          ) : tabIdx === 5 ? (
            <IncidentReport />
          ) : (
            <TeacherDashboardView
              overviewData={overviewData}
              handleTabChange={handleTabChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherFullDashboard;
