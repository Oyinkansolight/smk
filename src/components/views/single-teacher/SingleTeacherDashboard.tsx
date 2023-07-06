'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
import TabBar from '@/components/layout/TabBar';
import SchoolCalendarView from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import StudentDashboardView from '@/components/views/single-school/SchoolDashboardView';
import TeacherBioDetails from '@/components/views/single-teacher/TeacherBioDetails';
import ExamTimetable from '@/components/views/student.tsx/Examtimetable';
import SubjectList from '@/components/views/student.tsx/StudentSubjectList';
import TaskListView from '@/components/views/teacher/TaskListView';
import clsxm from '@/lib/clsxm';
import { useGetTeacherById } from '@/server/institution';
import TeacherLibrary from 'app/teacher/library/page';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { IoMdTrendingUp } from 'react-icons/io';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleTeacherDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridIdx, setGridIdx] = useState(0);
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const p = useSearchParams();
  const {
    data: staff,
    // error: staffError,
    // isLoading: isStaffLoading,
  } = useGetTeacherById({
    id: p?.get('id'),
  });
  return (
    <div className='flex'>
      <StudentTeacherProfileCard
        image='/images/teacher_1.png'
        name={`${(staff?.user ?? [])[0]?.firstName} ${
          (staff?.user ?? [])[0]?.lastName
        }`}
        school={staff?.institution?.instituteName ?? '[NULL]'}
        id='#14241-EDO-12'
        student={false}
        currentGridIdx={gridIdx}
        setGridIdx={(value) => {
          setTabIdx(0);
          setGridIdx(value);
        }}
      />
      {gridIdx === 0 && (
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
                  label: 'Task List',
                },
                {
                  icon: <RiCalendar2Fill className='h-5 w-5' />,
                  label: 'Timetable',
                },
                {
                  icon: <IoMdTrendingUp className='h-5 w-5' />,
                  label: 'Activity',
                },
                {
                  icon: <RiCalendar2Fill className='h-5 w-5' />,
                  label: 'Attendance Tracker',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
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
          {tabIdx === 2 && <ExamTimetable />}
          {tabIdx === 3 && <SchoolCalendarView />}
          {tabIdx === 4 && <TaskListView />}
        </div>
      )}
      {gridIdx === 1 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Account Details',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <>
              <div
                className={clsxm(
                  'flex justify-end gap-5',
                  isEditingBioDetails && 'opacity-50'
                )}
              >
                <Button
                  onClick={() => router.push('/admin/student/edit-history')}
                  disabled={isEditingBioDetails}
                  variant='ghost'
                  className='text-secondary bg-white hover:bg-secondary-100 border border-secondary-500'
                >
                  View Edit History
                </Button>
                <Button
                  disabled={isEditingBioDetails}
                  onClick={() => setIsEditingBioDetails(!isEditingBioDetails)}
                  variant='secondary'
                >
                  Edit Account Details
                </Button>
              </div>
              <div className='bg-white px-8'>
                <TeacherBioDetails
                  isEditing={isEditingBioDetails}
                  setIsEditing={setIsEditingBioDetails}
                  initStaff={staff}
                />
              </div>
            </>
          )}
        </div>
      )}
      {gridIdx === 2 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Subject & Classes',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <>
              <div className='flex justify-end'>
                <Button
                  variant='ghost'
                  className='text-secondary bg-white hover:bg-secondary-100 border border-secondary-500'
                >
                  Download Report
                </Button>
              </div>
              <SubjectList studentSubjectsList={[]} />
            </>
          )}
        </div>
      )}
      {gridIdx === 3 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Library',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <>
              <TeacherLibrary />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleTeacherDashboard;
