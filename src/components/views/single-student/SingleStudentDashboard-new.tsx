'use client';

import Button from '@/components/buttons/Button';
import StudentTeacherProfileCard from '@/components/cards/StudentTeacher';
import TabBar from '@/components/layout/TabBar';
import SchoolCalendarView from '@/components/views/admin/student/SingleStudentAttendanceTracker';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import StudentDashboardView from '@/components/views/single-student/StudentDashboardView';
import StudentLibrary from '@/components/views/single-student/StudentLibrary';
import ActionNavigation from '@/components/views/single-teacher/Navigation';
import Stat from '@/components/views/single-teacher/Stat';
import StudentBioDetailsAlt from '@/components/views/student.tsx/StudentBioDetailsAlt';
import SubjectList from '@/components/views/student.tsx/StudentSubjectList';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import { useGetStudentById } from '@/server/institution';
import { useGetClassArmInfo } from '@/server/institution/class';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleStudentDashboard = () => {
  const router = useRouter();

  const [tabIdx, setTabIdx] = useState(0);
  const [gridTabIdx, setGridTabIdx] = useState(0);
  const [url, setUrl] = useState(
    '/svg/student.svg'
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
  const menu = [
    {
      value: '0%',
      label: 'Average Attendance',
    },
    {
      value: 0,
      label: 'Total  Subjects',
    },

    {
      value: !classArmData
        ? 'N/A'
        : `${classArmData?.class.name} ${classArmData?.arm}`,
      label: 'Class Arm',
    },
  ];

  const navigation_menu = [
    {
      icon: '/svg/calendar_new.svg',
      title: 'Timetable',
      link: '/super-admin/all-student#',
    },
    {
      icon: '/svg/subject.svg',
      title: 'Subjects',
      link: '/super-admin/all-student#',
    },
    {
      icon: '/svg/report.svg',
      title: 'Exam Report',
      link: '/super-admin/all-student#',
    },
    {
      icon: '/svg/attendance.svg',
      title: 'Attendance',
      link: '/super-admin/all-student#',
    },
    {
      icon: '/svg/library.svg',
      title: 'Library',
      link: '/super-admin/all-student#',
    },
  ];

  return (
    <div className=''>
      {/* <StudentTeacherProfileCard
        image={url}
        name={`${(student?.user ?? [])[0]?.firstName ?? 'Loading...'} ${(student?.user ?? [])[0]?.lastName
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
              classArm={`${!isStudentLoading ? student?.class?.class.name : 'Loading...'
                }  ${!isStudentLoading ? student?.class?.arm : ''}`}
              studentAve={student?.readingProficiency}
              totalSubject={0}
            />
          )}
          {tabIdx === 1 && (
            <ExamReportView
              report={
                [
                  // { name: 'Mathematics', score: 58, date: new Date() },
                  // { name: 'Mathematics', score: 88, date: new Date() },
                  // { name: 'Mathematics', score: 45, date: new Date() },
                  // { name: 'Mathematics', score: 34, date: new Date() },
                ]
              }
            />
          )}
          {tabIdx === 2 && <SchoolCalendarView />}
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
    */}

      <div className='fixed inset-x-0 w-full h-[140px] transform z-[1] blend_bg_student' />

      <div className='pt-5 relative z-[2] w-full'>
        <button 
        
        onClick={() => router.back()}

        className='flex items-center space-x-2'>
          <Image
            src="/svg/rounded-back.svg"
            height={24}
            width={24}
            alt='Bg_Layout'
            className=''
          />
          <span className='text-[#808080] text-base'>Back</span>
        </button>
        <div className='mt-5 rounded-t-lg w-full'>
          <div className='rounded-t-lg bg-[#fff4df] p-4 w-full'>
            <div className='flex md:flex-row flex-col items-baseline justify-between'>
              <div className='flex space-x-4'>
                <Image
                  src={url}
                  height={24}
                  width={24}
                  alt='Bg_Layout'
                  className=''
                />
                <div className='space-y-2'>
                  <h2>
                    {student?.firstName ?? 'Loading...'}{' '}
                    {student?.lastName ?? ''}
                  </h2>

                  <div
                    className={clsxm(
                      'bg-[#008F28]',
                      'flex items-center text-xs px-4 h-5 font-normal text-white max-w-max rounded-full capitalize'
                    )}
                  >
                    {student?.institution?.instituteType ?? 'N/A'}
                  </div>
                </div>
              </div>

              <div className='md:ml-0 ml-auto'>
                <span className='font-light text-[#475467] text-base mr-1'>
                  Date Added:
                </span>
                <span className='font-light text-[#000] text-base'>
                  {moment((student?.user ?? [])[0]?.createdAt).format('LL')}
                </span>
              </div>
            </div>
          </div>
          <div className='bg-white space-y-4 p-5'>
            <div>
              <p>Email</p>
              <h4 className='font-normal'>
                {(student?.user ?? [])[0]?.email ?? 'N/A'}{' '}
              </h4>
            </div>
            <div>
              <p>Phone No</p>
              <h4 className='font-normal'>
                {(student?.user ?? [])[0]?.phoneNumber ?? 'N/A'}
              </h4>
            </div>
            <div>
              <p>Address</p>
              <h4 className='font-normal'>
                {(student?.user ?? [])[0]?.address ?? 'N/A'}
              </h4>
            </div>
          </div>
          <div className='shadow-[0_10px_#fff4df] text-[#5754F7] text-base font-normal rounded-b-lg bg-white flex items-center justify-center border-t border-2-b border-b-[#E4E7EC] py-3 '>
            <Link href='/super-admin/all-student#'>Edit Profile</Link>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-2 my-6'>
          <div className=' bg-[#f0ffff] rounded-lg space-y-2 px-2 py-3'>
            <h2 className='text-base'>
              {' '}
              {student?.institution?.instituteName ?? 'N/A'}{' '}
            </h2>
            <p className='text-[8px] text-gray-400'>Name of Institution</p>
          </div>
          <div className='bg-[#f0ffff] rounded-lg space-y-2 px-2 py-3'>
            <h2 className='text-base'> {student?.studentId ?? 'N/A'}</h2>
            <p className='text-[8px] text-gray-400'>student ID</p>
          </div>
        </div>

        <Stat menu={menu} />

        <ActionNavigation navigation_menu={navigation_menu} />
      </div>
    </div>
  );
};

export default SingleStudentDashboard;
