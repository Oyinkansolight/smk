'use client';

import SubjectProfileCard from '@/components/cards/SubjectProfile';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import CurriculumView from '@/components/views/single-subject/CurriculumView';
import TaskListView from '@/components/views/single-subject/TaskListView';
import { useState } from 'react';
import { RiDashboardFill } from 'react-icons/ri';

const SingleSubjectDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    // max-width: 68.75rem;
    // @apply mx-auto w-11/12;
    <div className='w-11/12 max-w-7xl mx-auto flex overflow-y-scroll'>
      <SubjectProfileCard name='Mathematics' />
      <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
        <div className='flex w-full items-center justify-between'>
          <TabBar
            variant='primary'
            selected={tabIdx}
            onSelect={(i) => setTabIdx(i)}
            items={[
              {
                icon: <RiDashboardFill className='h-5 w-5' />,
                label: 'Subject Classes',
              },
            ]}
          />

          <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

          <div className='h-full border-b-[2px] border-[#EDEFF2]'>
            <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
          </div>
        </div>

        {tabIdx === 0 && <TaskListView />}
        {tabIdx === 1 && <CurriculumView />}
        {/* {tabIdx === 0 && <StudentDashboardView />}
        {tabIdx === 1 &&
          <ExamReportView
            report={[
              { name: 'Mathematics', score: 58, date: new Date() },
              { name: 'Mathematics', score: 88, date: new Date() },
              { name: 'Mathematics', score: 45, date: new Date() },
              { name: 'Mathematics', score: 34, date: new Date() },
            ]} />
        }
        {tabIdx === 2 && <SchoolCalendarView />} */}
      </div>
    </div>
  );
};

export default SingleSubjectDashboard;
