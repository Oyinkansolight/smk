'use client';

import { BasicSearch } from '@/components/search';
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import TeacherLibrary from 'app/teacher/library/page';
import { useSearchParams } from 'next/navigation';
// import router from 'next/router';
import { useState } from 'react';

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

  const widths = ['w-1/4', 'w-1/2', 'w-3/4'];

  return (
    <div className=''>
      <div className='fixed inset-x-0 w-full h-[140px] transform z-[1] blend_bg' />

      <div className='pt-5 relative z-[2] w-full'>
        <div className='flex items-center space-x-2'>
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

          <div className='rounded-full py-1 px-2 bg-slate-100'>
            <span className='text-gray-300'>Subject Page</span> /{' '}
            <span className='text-blue-500'>ECCDE Institution Subjects</span>
          </div>
        </div>
        <div className='mt-5 rounded-t-lg w-full'>
          <div className='rounded-xl bg-[#F8F8FF] border p-4 w-full'>
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

              <div className='md:ml-0 ml-auto flex space-x-4'>
                <div>
                  <span className='font-light text-[#475467] text-xs mr-1'>
                    Academic Session
                  </span>
                  <span className='font-light text-[#000] text-base'>
                    2020/2021
                  </span>
                </div>
                <div>
                  <span className='font-light text-[#475467] text-xs mr-1'>
                    Term
                  </span>
                  <span className='font-light text-[#000] text-base'>
                    1st Term
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-xl bg-white mt-6'>
          <div className='p-4 border-b'>
            <h2 className='text-xl'>ECCDE Institution Subjects</h2>
            <span className='text-[8px] text-gray-400'>
              This is the list of classes in this institution type that the
              subjects are available.
            </span>
          </div>

          <div className='border-b px-4 pt-4 space-x-2'>
            <button className='text-[#5754F7] bg-[#F4F2FF] border-[#5754F7] border-t border-x rounded-t p-2'>
              Subject Classes
            </button>
            <button className='text-gray-400'>Text and Exam Question</button>
          </div>

          <div className='p-4'>
            <div className='w-1/2'>
              <BasicSearch />
            </div>

            <div className='grid sm:grid-cols-2 gap-4 my-4'>
              {[1, 2, 3].map((item, idx) => (
                <div
                  key={idx}
                  className='rounded-3xl shadow-md p-4 bg-[#F8F8FF]'
                >
                  <div className='flex justify-between'>
                    <h4 className='text-[#6B7A99]'>ECCDE {item}</h4>
                    <div>
                      <Image
                        src='/svg/subjectarrow.svg'
                        height={24}
                        width={24}
                        alt='Bg_Layout'
                        className=''
                      />
                    </div>
                  </div>
                  <div className='mt-6'>
                    <div className='w-full rounded-full bg-[#FFFAF3] border-[#E5A500] border-[1.5px]'>
                      <div
                        className={`${
                          widths[item - 1]
                        } text-center rounded-full h-fit bg-[#E5A500] text-white`}
                      >
                        {25 * item}%
                      </div>
                    </div>
                  </div>
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
