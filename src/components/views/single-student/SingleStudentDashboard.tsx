'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
import TabBar from '@/components/layout/TabBar';
import SchoolCalendarView from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import StudentDashboardView from '@/components/views/single-student/StudentDashboardView';
import StudentLibrary from '@/components/views/single-student/StudentLibrary';
import StudentBioDetailsAlt from '@/components/views/student.tsx/StudentBioDetailsAlt';
import SubjectList from '@/components/views/student.tsx/StudentSubjectList';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import { useGetStudentById } from '@/server/institution';
import { useGetClassArmInfo } from '@/server/institution/class';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleStudentDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const [url, setUrl] = useState(
    'https://www.bu.edu/wll/files/2017/10/avatar.png'
  );
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const p = useSearchParams();

  const {
    data: student,
    // error: studentError,
    isLoading: isStudentLoading,
  } = useGetStudentById({
    id: p?.get('id'),
  });

  const getFileURL = async (path) => {
    let result = '';
    await getURL(path).then((v) => {
      result = v;
      setUrl(v);
    });
    return result;
  };

  useEffect(() => {
    getFileURL(student?.profileImg);
  }, [student]);

  const { data: classArmData } = useGetClassArmInfo(student?.class?.id);

  return (
    <div className='flex'>
      <StudentTeacherProfileCard
        image={url}
        name={`${(student?.user ?? [])[0]?.firstName ?? 'Loading...'} ${
          (student?.user ?? [])[0]?.lastName
        }`}
        school={student?.institution?.instituteName ?? 'Loading...'}
        id={student?.studentId ?? ''}
        student
        currentGridIdx={gridTabIdx}
        setGridIdx={(value) => {
          setTabIdx(0);
          setGridTabIdx(value);
        }}
      />
      {gridTabIdx === 0 && (
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
          </div>

          {tabIdx === 0 && (
            <StudentDashboardView
              schoolType='Secondary'
              classArm={`${
                !isStudentLoading
                  ? student?.class?.class?.name || 'N/A'
                  : 'Loading...'
              }  ${!isStudentLoading ? student?.class?.arm || 'N/A' : ''}`}
              studentAve={student?.readingProficiency}
              totalSubject={0}
            />
          )}
          {tabIdx === 1 && (
            <ExamReportView
              studentId={student?.id}
              classArmId={student?.class?.id}
            />
          )}
          {tabIdx === 2 && <SchoolCalendarView studentId={student?.id ?? ''} />}
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
                <StudentBioDetailsAlt
                  isEditing={isEditingBioDetails}
                  setIsEditing={setIsEditingBioDetails}
                  initStudent={student}
                />
              </div>
            </>
          )}
        </div>
      )}
      {gridTabIdx === 2 && (
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
              <SubjectList
                studentSubjectsList={classArmData?.subjects}
                teacher={student?.teacher ?? 'No Name'}
                managedClassArm={{
                  arm: ` ${student?.class?.class.name}  ${student?.class?.arm} `,
                }}
              />
            </>
          )}
        </div>
      )}
      {gridTabIdx === 3 && (
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

export default SingleStudentDashboard;
