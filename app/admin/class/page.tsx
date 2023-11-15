'use client';

import StudentTeacherProfileCard from '@/components/cards/Classprofile';
import TabBar from '@/components/layout/TabBar';
import StudentList from '@/components/views/admin/Class/studentList';
import SingleStudentAttendanceTracker from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import StudentLibrary from '@/components/views/single-student/StudentLibrary';
import SubjectList from '@/components/views/student.tsx/ClassSubjectList';
import ExamTimetable from '@/components/views/student.tsx/Examtimetable';
import { useGetClassArmInfo } from '@/server/institution/class';
// import { useGetClassArmStudents } from '@/server/institution/class-arm';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const Page = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const p = useSearchParams();
  const classArmId = p?.get('id');

  const { data: classArmInfo } = useGetClassArmInfo(classArmId);

  return (
    <div className='flex md:flex-row flex-col'>
      <StudentTeacherProfileCard
        image={classArmInfo?.arm.charAt(0) ?? ''}
        name={`${classArmInfo?.class?.name ?? 'Loading...'} ${
          classArmInfo?.arm ?? ''
        }`}
        classTeacher={`${classArmInfo?.teacher?.user?.firstName ?? ''} ${
          classArmInfo?.teacher?.user?.lastName ?? ''
        }`}
        school=''
        id=''
        student={false}
        showAcademicYear
        currentGridIdx={gridTabIdx}
        setGridIdx={(v) => {
          setGridTabIdx(v);
          setTabIdx(0);
        }}
      />
      {gridTabIdx === 0 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='secondary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'TimeTable',
                },
                {
                  icon: <BiListCheck className='h-5 w-5' />,
                  label: 'Student List',
                },
                {
                  icon: <AiFillFolder className='h-5 w-5' />,
                  label: 'Subject',
                },
                {
                  icon: <RiCalendar2Fill className='h-5 w-5' />,
                  label: 'Attendance Tracker',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <div className='bg-[#fff] p-2 rounded'>
              {classArmInfo && (
                <ExamTimetable
                  isClassTimeTable={true}
                  classId={classArmInfo?.class?.id}
                />
              )}
            </div>
          )}
          {tabIdx === 1 && <StudentList classArmId={classArmId} />}
          {tabIdx === 2 && (
            <SubjectList studentSubjectsList={classArmInfo?.subjects} />
          )}
          {tabIdx === 3 && <SingleStudentAttendanceTracker />}
        </div>
      )}

      {gridTabIdx === 1 && (
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
              <StudentLibrary />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
