'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
import TabBar from '@/components/layout/TabBar';
import EmptyView from '@/components/misc/EmptyView';
import StudentDashboardView from '@/components/views/single-teacher/StudentDashboardView';
import TeacherBioDetails from '@/components/views/single-teacher/TeacherBioDetails';
import SubjectList from '@/components/views/student.tsx/StudentSubjectList';
import TeachersAttendanceView from '@/components/views/teacher/AttendanceLog';
import TimetableView from '@/components/views/teacher/TimetableView';
import clsxm from '@/lib/clsxm';
import { getFromLocalStorage } from '@/lib/helper';
import { useGetTeacherTimetable } from '@/server/Schedule';
import {
  useGetSubjectAssignedToTeacher,
  useGetTeacherById,
} from '@/server/institution';
import TeacherLibrary from 'app/teacher/library/page';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleTeacherDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridIdx, setGridIdx] = useState(0);
  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const p = useSearchParams();
  const {
    data: staff,
    // error: staffError,
    // isLoading: isStaffLoading,
  } = useGetTeacherById({
    id: p?.get('id'),
  });

  const teacherName = `${(staff?.user ?? {})?.firstName} ${
    (staff?.user ?? {})?.lastName
  }`;

  const { data: studentSubjectsList } = useGetSubjectAssignedToTeacher(
    p?.get('id'),
    currentSessionId
  );
  const { data: teacherTimeTable, isLoading: isTTLoading } =
    useGetTeacherTimetable({
      // sessionId: currentSessionId,
      // termId: currentTermInfo?.id,
      classId: staff?.managedClassArm?.class?.id,
      teacherId: p?.get('id') ?? '',
    });

  return (
    <div className='flex'>
      <StudentTeacherProfileCard
        image='/images/teacher_1.png'
        name={`${(staff?.user ?? {})?.firstName || 'Loading...'} ${
          (staff?.user ?? {})?.lastName || ''
        }`}
        school={staff?.institution?.instituteName ?? '[NULL]'}
        id={staff?.uniqueId ?? staff?.staffId}
        student={false}
        currentGridIdx={gridIdx}
        setGridIdx={(value) => {
          setTabIdx(0);
          setGridIdx(value);
          setIsEditingBioDetails(false);
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
                // {
                //   icon: <BiListCheck className='h-5 w-5' />,
                //   label: 'Task List',
                // },
                {
                  icon: <RiCalendar2Fill className='h-5 w-5' />,
                  label: 'Timetable',
                },
                // {
                //   icon: <IoMdTrendingUp className='h-5 w-5' />,
                //   label: 'Activity',
                // },
                {
                  icon: <RiCalendar2Fill className='h-5 w-5' />,
                  label: 'Attendance Tracker',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
          </div>

          {tabIdx === 0 && (
            <StudentDashboardView
              classCount={staff ? staff.classes.length : 0}
              subjectCount={staff ? staff.subjects.length : 0}
              managedClass={staff ? staff.managedClassArm : {}}
            />
          )}

          {tabIdx === 1 && (
            <div>
              {teacherTimeTable?.length > 0 ? (
                <TimetableView
                  data={teacherTimeTable}
                  isLoading={isTTLoading}
                />
              ) : (
                <EmptyView
                  label='Timetable Not Available Yet'
                  useStandardHeight
                />
              )}
            </div>
          )}
          {tabIdx === 2 && (
            <TeachersAttendanceView userId={staff?.user?.id ?? ''} />
          )}
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
                {/* <Button
                  onClick={() => router.push('/admin/student/edit-history')}
                  disabled={isEditingBioDetails}
                  variant='ghost'
                  className='text-secondary bg-white hover:bg-secondary-100 border border-secondary-500'
                >
                  View Edit History
                </Button> */}
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
              {/* <div className='flex justify-end'>
                <Button
                  variant='ghost'
                  className='text-secondary bg-white hover:bg-secondary-100 border border-secondary-500'
                >
                  Download Report
                </Button>
              </div> */}
              <SubjectList
                studentSubjectsList={studentSubjectsList}
                managedClassArm={staff.managedClassArm}
                teacher={teacherName}
              />
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
