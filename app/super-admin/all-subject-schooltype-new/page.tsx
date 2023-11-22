'use client';

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
import Castle from '~/svg/castle.svg';

// import { BiListCheck } from 'react-icons/bi';
// import { IoMdTrendingUp } from 'react-icons/io';
// import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const SingleSubjectInstitutionType = () => {
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

  const instituteTypes = [
    { type: 'ECCDE', name: 'ECCDE Institution' },
    { type: 'Primary', name: 'Basic Institution' },
    { type: 'Secondary', name: 'Secondary Institution' },
    { type: 'Tertiary', name: 'Tertiary Institution' },
  ];

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
                  src='/svg/newbook.svg'
                  height={24}
                  width={24}
                  alt='Bg_Layout'
                  className=''
                />
                <div className='space-y-2'>
                  <h2>Mathematics</h2>
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

          <div className='shadow-[0_10px_#eee2f8] rounded-b-2xl text-[#5754F7] text-base font-normal bg-white flex items-center justify-center border-t border-2-b border-b-[#E4E7EC] py-3 '>
            <Link href='/super-admin/all-staff#'>Edit Name</Link>
          </div>
        </div>
        <div className='mt-8 bg-[#5754F7] flex p-1 rounded-full space-x-2'>
          <div className='w-3/5 border-r border-white pr-2'>
            <button className='bg-white w-full  rounded-full flex justify-between p-2 text-black text-xs'>
              <span>Select Academic Session</span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.64645 5.65967C3.84171 5.44678 4.15829 5.44678 4.35355 5.65967L7.64645 9.25C7.84171 9.4629 8.15829 9.4629 8.35355 9.25L11.6464 5.65968C11.8417 5.44678 12.1583 5.44678 12.3536 5.65968C12.5488 5.87257 12.5488 6.21775 12.3536 6.43065L9.06066 10.021C8.47487 10.6597 7.52513 10.6597 6.93934 10.021L3.64645 6.43065C3.45118 6.21775 3.45118 5.87257 3.64645 5.65967Z'
                    fill='#5754F7'
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className='w-2/5'>
            <button className='bg-white w-full  rounded-full flex justify-between p-2 text-black text-xs'>
              <span>Select Term</span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.64645 5.65967C3.84171 5.44678 4.15829 5.44678 4.35355 5.65967L7.64645 9.25C7.84171 9.4629 8.15829 9.4629 8.35355 9.25L11.6464 5.65968C11.8417 5.44678 12.1583 5.44678 12.3536 5.65968C12.5488 5.87257 12.5488 6.21775 12.3536 6.43065L9.06066 10.021C8.47487 10.6597 7.52513 10.6597 6.93934 10.021L3.64645 6.43065C3.45118 6.21775 3.45118 5.87257 3.64645 5.65967Z'
                    fill='#5754F7'
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className='my-4 bg-[#f0ffff] rounded-lg space-y-2 px-2 py-3 w-[200px]'>
          <h2 className='text-xl'> 3 </h2>
          <p className='text-xs text-gray-400'>Assigned Class</p>
        </div>

        <div className='rounded-xl bg-white'>
          <div className='p-4 border-b'>
            <h2 className='text-xl'>Choose Institution Type</h2>
          </div>

          <div className='p-4'>
            <div className='grid sm:grid-cols-2 gap-4'>
              {instituteTypes.map((item, idx) => (
                <div
                  key={idx}
                  className={clsxm(
                    item.type === 'ECCDE' && 'bg-[#FFFEF5] border-[#FFE664]',
                    item.type === 'Primary' && 'bg-[#FFF8F4] border-[#FFCAAB]',
                    item.type === 'Tertiary' && 'bg-[#F9FFFA] border-[#73ED95]',
                    item.type === 'Secondary' &&
                      'bg-[#FAFDFF] border-[#A4DEFF]',
                    'p-4 space-y-2 rounded-lg  border-[0.5px] border-b-[1.5px] flex flex-col justify-center items-center'
                  )}
                >
                  <Castle className='h-8 w-8' />
                  <Link
                    href='/super-admin/subject-new'
                    className={clsxm(
                      item.type === 'ECCDE' && ' text-[#D9B80E]',
                      item.type === 'Primary' && ' text-[#AC4407]',
                      item.type === 'Tertiary' && ' text-[#008F28]',
                      item.type === 'Secondary' && ' text-[#6699B6]',
                      'text-base font-medium '
                    )}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSubjectInstitutionType;
