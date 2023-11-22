'use client';

import ActionNavigation from '@/components/views/single-teacher/Navigation';
import clsxm from '@/lib/clsxm';
// import Button from '@/components/buttons/Button';
// import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
// import TabBar from '@/components/layout/TabBar';
// import SchoolCalendarView from '@/components/views/admin/student/SingleStudentAttendanceTracker';
// import ExamReportView from '@/components/views/single-school/ExamReportView';
// import StudentDashboardView from '@/components/views/single-teacher/StudentDashboardView';
// import TeacherBioDetails from '@/components/views/single-teacher/TeacherBioDetails';
// import ExamTimetable from '@/components/views/student.tsx/Examtimetable';
// import SubjectList from '@/components/views/student.tsx/StudentSubjectList';
// import TaskListView from '@/components/views/teacher/TaskListView';
// import clsxm from '@/lib/clsxm';
// import Staff from '~/svg/staff.svg';
import { getFromLocalStorage } from '@/lib/helper';
import {
  useGetSubjectAssignedToTeacher,
  useGetTeacherById,
} from '@/server/institution';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import TeacherLibrary from 'app/teacher/library/page';
import { useSearchParams } from 'next/navigation';
// import router from 'next/router';
import { useState } from 'react';

import Stat from './Stat';

// import { BiListCheck } from 'react-icons/bi';
// import { IoMdTrendingUp } from 'react-icons/io';
// import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleTeacherDashboard = () => {
  const router = useRouter();

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

  const { data: studentSubjectsList, isLoading } =
    useGetSubjectAssignedToTeacher(p?.get('id'), currentSessionId);

  const menu = [
    {
      value: '0%',
      label: 'Average',
    },
    {
      value: 0,
      label: 'Assigned Class',
    },
    {
      value: !isLoading ? studentSubjectsList?.length : 0,
      label: 'Subjects',
    },
    {
      value: staff?.managedClassArm ?? 'N/A',
      label: 'Class Teacher',
    },
  ];

  const navigation_menu = [
    {
      icon: '/svg/calendar_new.svg',
      title: 'Timetable',
      link: '/super-admin/all-staff#',
    },
    {
      icon: '/svg/subject.svg',
      title: 'Subjects',
      link: '/super-admin/all-staff#',
    },
    {
      icon: '/svg/report.svg',
      title: 'Exam Report',
      link: '/super-admin/all-staff#',
    },
    {
      icon: '/svg/attendance.svg',
      title: 'Attendance',
      link: '/super-admin/all-staff#',
    },
    {
      icon: '/svg/library.svg',
      title: 'Library',
      link: '/super-admin/all-staff#',
    },
  ];

  return (
    <div className=''>
      {/* <StudentTeacherProfileCard
        image='/images/teacher_1.png'
        name={`${(staff?.user ?? {})?.firstName} ${
          (staff?.user ?? {})?.lastName
        }`}
        school={staff?.institution?.instituteName ?? '[NULL]'}
        id={staff?.oracleNumber ?? staff?.staffId}
        student={false}
        currentGridIdx={gridIdx}
        setGridIdx={(value) => {
          setTabIdx(0);
          setGridIdx(value);
        }}
      /> */}
      {/* {gridIdx === 0 && (
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

          {tabIdx === 0 && (
            <StudentDashboardView
              classCount={staff ? staff.classes.length : 0}
              subjectCount={staff ? staff.subjects.length : 0}
              managedClass={staff ? staff.managedClassArm : {}}
            />
          )}
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
          {tabIdx === 2 && <ExamTimetable isClassTimeTable={true} />}
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
      )} */}

      <div className='fixed inset-x-0 w-full h-[140px] transform z-[1] blend_bg' />

      <div className='pt-5 relative z-[2] w-full'>
        <button
          onClick={() => router.back()}
          className='flex items-center space-x-2'
        >
          <Image
            src='/svg/rounded-back.svg'
            height={24}
            width={24}
            alt='Bg_Layout'
            className=''
          />
          <span className='text-[#808080] text-base'>Back</span>
        </button>
        <div className='mt-5 rounded-t-lg w-full'>
          <div className='rounded-t-lg bg-[#F4E7FF] p-4 w-full'>
            <div className='flex md:flex-row flex-col items-baseline justify-between'>
              <div className='flex space-x-4'>
                <Image
                  src='/svg/staff.svg'
                  height={24}
                  width={24}
                  alt='Bg_Layout'
                  className=''
                />
                <div className='space-y-2'>
                  <h2>
                    {staff?.user?.firstName ?? 'Loading...'}{' '}
                    {staff?.user?.lastName ?? ''}
                  </h2>

                  <div
                    className={clsxm(
                      'bg-[#008F28]',
                      'flex items-center text-xs px-4 h-5 font-normal text-white max-w-max rounded-full capitalize'
                    )}
                  >
                    {staff?.institution?.instituteType ?? 'N/A'}
                  </div>
                </div>
              </div>

              <div className='md:ml-0 ml-auto'>
                <span className='font-light text-[#475467] text-base mr-1'>
                  Date Added:
                </span>
                <span className='font-light text-[#000] text-base'>
                  {moment(staff?.createdAt).format('LL')}
                </span>
              </div>
            </div>
          </div>
          <div className='bg-white space-y-4 p-5'>
            <div>
              <p>Email</p>
              <h4 className='font-normal'>{staff?.user?.email ?? 'N/A'} </h4>
            </div>
            <div>
              <p>Phone No</p>
              <h4 className='font-normal'>
                {staff?.user?.phoneNumber ?? 'N/A'}
              </h4>
            </div>
            <div>
              <p>Address</p>
              <h4 className='font-normal'>{staff?.user?.address ?? 'N/A'}</h4>
            </div>
          </div>
          <div className='shadow-[0_10px_#eee2f8] rounded-b-2xl text-[#5754F7] text-base font-normal bg-white flex items-center justify-center border-t border-2-b border-b-[#E4E7EC] py-3 '>
            <Link href='/super-admin/all-staff#'>Edit Profile</Link>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-2 my-6'>
          <div className=' bg-[#f0ffff] rounded-lg space-y-2 px-2 py-3'>
            <h2 className='text-base'>
              {' '}
              {staff?.institution?.instituteName ?? 'N/A'}{' '}
            </h2>
            <p className='text-[8px] text-gray-400'>Name of Institution</p>
          </div>
          <div className='bg-[#f0ffff] rounded-lg space-y-2 px-2 py-3'>
            <h2 className='text-base'>
              {' '}
              {staff?.oracleNumber ?? staff?.staffId}{' '}
            </h2>
            <p className='text-[8px] text-gray-400'>Staff ID</p>
          </div>
        </div>

        <Stat menu={menu} />

        <ActionNavigation navigation_menu={navigation_menu} />
      </div>
    </div>
  );
};

export default SingleTeacherDashboard;
