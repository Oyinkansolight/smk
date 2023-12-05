'use client';

import EmptyView from '@/components/misc/EmptyView';
import { BasicSearch } from '@/components/search';
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
import { getFromSessionStorage } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import { useGetSingleParent } from '@/server/institution';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import TeacherLibrary from 'app/teacher/library/page';
// import router from 'next/router';
import { useState } from 'react';

// import { BiListCheck } from 'react-icons/bi';
// import { IoMdTrendingUp } from 'react-icons/io';
// import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleTeacherDashboard = () => {
  const router = useRouter();
  const { data: profile } = useGetProfile();

  const [tabIdx, setTabIdx] = useState(0);
  const [gridIdx, setGridIdx] = useState(0);
  const user = getFromSessionStorage('user') ?? '';
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const userProfile = JSON.parse(user);
  const {
    data: parentDetail,
    // error: staffError,
    // isLoading: isStaffLoading,
  } = useGetSingleParent({
    id: userProfile?.id,
  });

  console.log(parentDetail);

  // const navigation_menu = [
  //   {
  //     icon: '/svg/calendar_new.svg',
  //     title: 'Timetable',
  //     link: '/super-admin/all-staff#',
  //   },
  //   {
  //     icon: '/svg/subject.svg',
  //     title: 'Subjects',
  //     link: '/super-admin/all-staff#',
  //   },
  //   {
  //     icon: '/svg/report.svg',
  //     title: 'Exam Report',
  //     link: '/super-admin/all-staff#',
  //   },
  //   {
  //     icon: '/svg/attendance.svg',
  //     title: 'Attendance',
  //     link: '/super-admin/all-staff#',
  //   },
  //   {
  //     icon: '/svg/library.svg',
  //     title: 'Library',
  //     link: '/super-admin/all-staff#',
  //   },
  // ];

  return (
    <div className=''>
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
                  <h2>Allyson Stairs</h2>

                  <div
                    className={clsxm(
                      'bg-[#008F28]',
                      'flex items-center text-xs px-4 h-5 font-normal text-white max-w-max rounded-full capitalize'
                    )}
                  >
                    Secondary
                  </div>
                </div>
              </div>

              <div className='md:ml-0 ml-auto'>
                <span className='font-light text-[#475467] text-base mr-1'>
                  Date Added:
                </span>
                <span className='font-light text-[#000] text-base'>
                  {moment().format('LL')}
                </span>
              </div>
            </div>
          </div>
          <div className='bg-white space-y-4 p-5'>
            <div>
              <p>Email</p>
              <h4 className='font-normal'>Scalingheight@mail.com </h4>
            </div>
            <div>
              <p>Phone No</p>
              <h4 className='font-normal'>081010101010</h4>
            </div>
            <div>
              <p>Address</p>
              <h4 className='font-normal'>
                Beside A Building, Phase 1 Zone, Benin, Edo
              </h4>
            </div>
          </div>
          <div className='shadow-[0_10px_#eee2f8] rounded-b-2xl text-[#5754F7] text-base font-normal bg-white flex items-center justify-center border-t border-2-b border-b-[#E4E7EC] py-3 '>
            <Link href='/super-admin/all-staff#'>Edit Profile</Link>
          </div>
        </div>
        <div className=' gap-2 my-6'>
          <div className='w-[200px] bg-[#f0ffff] rounded-lg space-y-2 px-2 py-3'>
            <h2 className='text-base'> 3</h2>
            <p className='text-[8px] text-gray-400'>Total Student</p>
          </div>
        </div>

        <div className='my-6 rounded-md border p-4'>
          <div className='border-y py-4 w-full flex justify-end'>
            <Link
              href='/parent/link-student'
              className='rounded-full p-2 text-white items-center bg-[#5754f7] flex space-x-2'
            >
              Link Student
            </Link>
          </div>

          <div className='mb-5 flex sm:flex-row flex-col sm:justify-between justify-start  sm:items-end'>
            <div className='space-y-3'>
              <h2 className='text-[#8C8C8C] text-base font-normal'>
                List of all parent student
              </h2>
              <BasicSearch />
            </div>
            <div className='sm:mt-0 mt-2 flex space-x-2 pb-4'>
              <button className='bg-black  rounded-lg flex space-x-2 p-2 text-white'>
                <span>Filter by institution</span>
                <span>
                  <svg
                    width='17'
                    height='16'
                    viewBox='0 0 17 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M4.2651 5.65967C4.46036 5.44678 4.77694 5.44678 4.97221 5.65967L8.2651 9.25C8.46036 9.4629 8.77694 9.4629 8.97221 9.25L12.2651 5.65968C12.4604 5.44678 12.7769 5.44678 12.9722 5.65968C13.1675 5.87257 13.1675 6.21775 12.9722 6.43065L9.67931 10.021C9.09353 10.6597 8.14378 10.6597 7.55799 10.021L4.2651 6.43065C4.06984 6.21775 4.06984 5.87257 4.2651 5.65967Z'
                      fill='#D9D9D9'
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <EmptyView label='No Linked Student' useStandardHeight />
        </div>
      </div>
    </div>
  );
};

export default SingleTeacherDashboard;
