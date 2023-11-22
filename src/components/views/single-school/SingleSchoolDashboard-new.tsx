/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import { SchoolProfileCard } from '@/components/cards';
import TabBar from '@/components/layout/TabBar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Table from '@/components/tables/TableComponent';
import InstitutionBioDetails from '@/components/views/admin/InstitutionBioDetails';
import StaffClassAttendanceReport from '@/components/views/admin/StaffClassAttendanceReport';
import StudentClassAttendanceReport from '@/components/views/admin/StudentClassAttendanceReport';
import SchoolCalendarView from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import SchoolDashboardView from '@/components/views/single-school/SchoolDashboardView';
import ActionNavigation from '@/components/views/single-teacher/Navigation';
import Stat from '@/components/views/single-teacher/Stat';
import Files from '@/components/views/super-admin/Library/Files';
import TaskListView from '@/components/views/teacher/TaskListView';
import clsxm from '@/lib/clsxm';
import {
  useGetSchoolById, // useGetStudentsListByInstitution,
  // useGetTeachersListByInstitution,
} from '@/server/institution';
import Cookies from 'js-cookie';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { BiTrendingUp } from 'react-icons/bi';
import { IoReorderThree } from 'react-icons/io5';
import { MdArrowBackIos, MdOutlineSort } from 'react-icons/md';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import Select from 'react-select';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const SingleSchoolDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridIdx, setGridIdx] = useState(0);
  const isGenericApp = Cookies.get('isGenericApp') === 'Y';

  const router = useRouter();
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const params = useSearchParams();
  const { data: school, isLoading } = useGetSchoolById({
    query: params?.get('id'),
  });
  // const instituteId = params?.get('id');
  // const { data: getInstitutionStudents } =
  //   useGetStudentsListByInstitution(instituteId);
  // const { data: getInstitutionStaffs } = useGetTeachersListByInstitution({
  //   instituteId,
  // });
  // console.log(getInstitutionStaffs?.data);
  const menu = [
    {
      value: '0',
      label: 'Total Student',
    },
    {
      value: 0,
      label: 'Class Teacher',
    },
    {
      value: 0,
      label: 'Total Class',
    },
    {
      value: 0,
      label: 'Total Subjects',
    },
    
  ];

  const navigation_menu = [
    {
      icon: '/svg/calendar_new.svg',
      title: 'Timetable',
      link: '/super-admin/all-staff#',
    },
    {
      icon: '/svg/student.svg',
      title: 'Student',
      link: '/super-admin/all-staff#',
    },
    {
      icon: '/svg/staff.svg',
      title: 'Teacher',
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
    // {
    //   icon: '/svg/attendance.svg',
    //   title: 'Attendance',
    //   link: '/super-admin/all-staff#',
    // },
    {
      icon: '/svg/permission.svg',
      title: 'Permission',
      link: '/super-admin/all-staff#',
    },
    {
      icon: '/svg/library.svg',
      title: 'Library',
      link: '/super-admin/all-staff#',
    },
  ];

  return (
    <section>
      {/* <div
        onClick={() => router.back()}
        className=' pl-8 mt-4 flex items-center gap-3 cursor-pointer'
      >
        <MdArrowBackIos className='text-blue-500' />
        <div>Back</div>
      </div>

      <div className='flex'>
        <SchoolProfileCard
          school={school}
          idx={gridIdx}
          setIdx={(v) => {
            setTabIdx(0);
            setGridIdx(v);
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
                    icon: <RiCalendar2Fill className='h-5 w-5' />,
                    label: 'Timetable',
                  },
                  {
                    icon: <MdOutlineSort className='h-5 w-5' />,
                    label: 'Subject',
                  },
                  {
                    icon: <IoReorderThree className='h-5 w-5' />,
                    label: 'Exam Report',
                  },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && <SchoolDashboardView school={school} />}
            {tabIdx === 1 && <SchoolCalendarView />}
            {tabIdx === 2 && <TaskListView />}
            {tabIdx === 3 && (
              <ExamReportView
                report={[
                  { name: 'Mathematics', score: 58, date: new Date() },
                  { name: 'Mathematics', score: 88, date: new Date() },
                  { name: 'Mathematics', score: 45, date: new Date() },
                  { name: 'Mathematics', score: 34, date: new Date() },
                ]}
              />
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
                  <Button
                    onClick={() => router.push('/admin/student/edit-history')}
                    disabled={isEditingBioDetails}
                    variant='ghost'
                    className='text-primary bg-white hover:bg-primary-100 border border-primary-500'
                  >
                    View Edit History
                  </Button>
                  <Button
                    disabled={isEditingBioDetails}
                    onClick={() => setIsEditingBioDetails(!isEditingBioDetails)}
                  >
                    Edit Account Details
                  </Button>
                </div>
                <div className='bg-white px-8'>
                  <InstitutionBioDetails
                    isEditing={isEditingBioDetails}
                    setIsEditing={setIsEditingBioDetails}
                    initInstitution={school}
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
                    label: 'Students',
                  },
                  {
                    icon: <BiTrendingUp className='h-5 w-5' />,
                    label: 'Attendance Report',
                  },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && (
              <div className='flex flex-col gap-4'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button>
                </div>
                {/* <CountCard
                  text='72 %'
                  title='Average Attendance Rate'
                  variant='basic'
                /> 
                <div className='bg-white rounded-md p-6'>
                  <div className='flex justify-between'>
                    <div className='text-[#6B7A99] text-xl font-bold'>
                      Student List
                    </div>
                    <Select
                      value={{ value: 'all', label: 'All Class Arms' }}
                      options={[{ value: 'all', label: 'All Class Arms' }]}
                    />
                  </div>
                  <Table
                    showFilter={false}
                    showSearch={false}
                    columns={studentListColumns}
                    // data={getInstitutionStudents}
                    data={[]}
                  />
                </div>
              </div>
            )}
            {tabIdx === 1 && (
              <div className='flex flex-col'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button>
                </div>
                <StudentClassAttendanceReport />
              </div>
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
                    label: 'Students',
                  },
                  {
                    icon: <BiTrendingUp className='h-5 w-5' />,
                    label: 'Attendance Report',
                  },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && (
              <div className='flex flex-col gap-4'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button>
                </div>
                {/* <CountCard
                  text='0%'
                  title='Average Attendance Rate'
                  variant='basic'
                /> 
                <div className='bg-white rounded-md p-6'>
                  <div className='flex justify-between'>
                    <div className='text-[#6B7A99] text-xl font-bold'>
                      Staff List
                    </div>
                    <Select
                      value={{ value: 'all', label: 'Filter' }}
                      options={[{ value: 'all', label: 'Filter' }]}
                    />
                  </div>
                  <Table
                    showFilter={false}
                    showSearch={false}
                    columns={staffListColumns}
                    // data={getInstitutionStaffs?.data}
                    data={[]}
                  />
                </div>
              </div>
            )}
            {tabIdx === 1 && (
              <div className='flex flex-col'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button>
                </div>
                <StaffClassAttendanceReport />
              </div>
            )}
          </div>
        )}
        {gridIdx === 4 && (
          <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
            <div className='flex w-full items-center justify-between'>
              <TabBar
                variant='primary'
                selected={tabIdx}
                onSelect={(i) => setTabIdx(i)}
                items={[
                  {
                    icon: <RiDashboardFill className='h-5 w-5' />,
                    label: isGenericApp ? 'Library' : 'Government Library',
                  },
                  {
                    icon: <BiTrendingUp className='h-5 w-5' />,
                    label: 'Institution Library',
                  },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && <Files variant='secondary' />}
            {tabIdx === 1 && <Files variant='secondary' />}
          </div>
        )}
      </div> */}

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
        <div className='my-5 rounded-t-lg w-full'>
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
                    {school?.user?.firstName ?? 'Loading...'}{' '}
                    {school?.user?.lastName ?? ''}
                  </h2>

                  <div
                    className={clsxm(
                      'bg-[#008F28]',
                      'flex items-center text-xs px-4 h-5 font-normal text-white max-w-max rounded-full capitalize'
                    )}
                  >
                    {school?.instituteType ?? 'N/A'}
                  </div>
                </div>
              </div>

              <div className='md:ml-0 ml-auto'>
                <span className='font-light text-[#475467] text-base mr-1'>
                  Date Added:
                </span>
                <span className='font-light text-[#000] text-base'>
                  {moment(school?.createdAt).format('LL')}
                </span>
              </div>
            </div>
          </div>
          <div className='bg-white space-y-4 p-5'>
            <div>
              <p>Email</p>
              <h4 className='font-normal'>{school?.user?.email ?? 'N/A'} </h4>
            </div>
            <div>
              <p>Phone No</p>
              <h4 className='font-normal'>
                {school?.user?.phoneNumber ?? 'N/A'}
              </h4>
            </div>
            <div>
              <p>Address</p>
              <h4 className='font-normal'>{school?.user?.address ?? 'N/A'}</h4>
            </div>
          </div>
          <div className='shadow-[0_10px_#eee2f8] rounded-b-2xl text-[#5754F7] text-base font-normal bg-white flex items-center justify-center border-t border-2-b border-b-[#E4E7EC] py-3 '>
            <Link href='/super-admin/all-school#'>Edit Profile</Link>
          </div>
        </div>

        <Stat menu={menu} />

        <ActionNavigation navigation_menu={navigation_menu} />
      </div>
    </section>
  );
};

export default SingleSchoolDashboard;
