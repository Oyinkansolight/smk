'use client';

import IncidentReport from '@/components/views/teacher/IncidentReport';
import TaskListView from '@/components/views/teacher/TaskListView';
import TeacherDashboardView from '@/components/views/teacher/TeacherDashboardView';
import TeacherTimeTableView from '@/components/views/teacher/TeacherTimeTableView';
import { useState } from 'react';

const TeacherFullDashboard = () => {
  const [tabIdx] = useState(0);
  // const { data: nextClassData } = useGetTeacherNextClass({
  //   day: moment().format('dddd') as GetTeacherNextClassParams['day'],
  //   sessionId: 1,
  //   teacherId: 1,
  //   termId: 1,
  //   weekId: 1,
  // });

  // const handleTabChange = (i: number) => setTabIdx(i);

  return (
    <div className='flex'>
      <div className='flex flex-1 flex-col gap-[31px] w-full'>
        <div className='layout'>
          {tabIdx === 1 ? (
            <TaskListView />
          ) : tabIdx === 2 ? (
            <TeacherTimeTableView />
          ) : tabIdx === 5 ? (
            <IncidentReport />
          ) : (
            <TeacherDashboardView
            // handleTabChange={handleTabChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherFullDashboard;
