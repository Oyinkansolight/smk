'use client';

import SubjectPeriodManager from '@/components/cards/SubjectPeriodManager';
import FormInput from '@/components/input/NewForm';
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

  const currentSessionId: string =
    getFromLocalStorage('currentSessionId') ?? '';
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const [currentView, setCurrentView] = useState(0);

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
    <div>
      {currentView === 0 && (
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
                <span className='text-gray-300'>Subject Page</span>/
                <span className='text-gray-300'>
                  ECCDE Institution Subjects
                </span>
                /<span className='text-blue-500'>ECCDE 1</span>
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
                <div className='rounded-2xl border flex space-x-2 items-center bg-gray-200/10 py-5 px-3 w-full'>
                  <span className='text-gray-400 text-xs'>Class:</span>{' '}
                  <h4> ECCDE 1</h4>
                </div>
              </div>

              <div className='p-4'>
                <div className='w-1/2'>
                  <BasicSearch />
                </div>

                <div className='grid sm:grid-cols-2 gap-4 items-start my-4'>
                  {[1, 2, 3].map((item, idx) => (
                    <SubjectPeriodManager
                      idx={idx}
                      key={idx}
                      setCurrentView={setCurrentView}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 1 && (
        <div className='bg-[#EFF3F7]  pb-5  overflow-y-auto'>
          <div className='pt-4  px-6 w-full'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => {
                  setCurrentView(0);
                }}
                className='flex items-center space-x-2'
              >
                <Image
                  src='/svg/rounded-back.svg'
                  height={20}
                  width={20}
                  alt='back '
                  className=''
                />
                <span className='text-[#808080] text-base'>Back</span>
              </button>
            </div>
            <div className='my-5'>
              <h2 className='text-[#848689] text-lg'>Edit Week 1</h2>
            </div>

            <div className='mt-6 rounded-xl bg-white'>
              <div className='p-4 border-b'>
                <div className='flex space-x-2 items-center'>
                  <div className=' bg-[#5754F7] text-[8px] font-normal grid place-content-center text-xs text-white w-4 h-4 rounded-full'>
                    1
                  </div>
                  <h5 className='text-[#5754F7]'> Period 1</h5>
                </div>
                <h6 className='text-gray-500 mt-2'>
                  Kindly enter the details of the parent below.˝{' '}
                </h6>
              </div>

              <div className='p-4'>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <FormInput
                    label='Time Slot - Monday'
                    type='time'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                  <FormInput
                    label='Select File to add *'
                    type='file'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                  <FormInput
                    label='Topic/Sub-Theme'
                    type='text'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                  <FormInput
                    label='Title of Period *'
                    type='text'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                </div>
              </div>
            </div>

            <div className='mt-6 rounded-xl bg-white'>
              <div className='p-4 border-b'>
                <div className='flex space-x-2 items-center'>
                  <div className=' bg-[#5754F7] text-[8px] font-normal grid place-content-center text-xs text-white w-4 h-4 rounded-full'>
                    2
                  </div>
                  <h5 className='text-[#5754F7]'> Period 2</h5>
                </div>
                <h6 className='text-gray-500 mt-2'>
                  Kindly enter the details of the parent below.˝{' '}
                </h6>
              </div>

              <div className='p-4'>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <FormInput
                    label='Time Slot - Monday'
                    type='time'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                  <FormInput
                    label='Select File to add *'
                    type='file'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                  <FormInput
                    label='Topic/Sub-Theme'
                    type='text'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                  <FormInput
                    label='Title of Period *'
                    type='text'
                    placeholder=''
                    containerClassName='rounded-md py-[2px] px-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'
                  />
                </div>
              </div>
            </div>

            <div className='rounded-xl mt-6 bg-white p-4 flex justify-end'>
              <button className='rounded-full px-2 py-1 text-white items-center bg-[#5754f7] flex space-x-2'>
                <span>Save & Continue</span>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18.0891 10.5893C18.4145 10.2639 18.4145 9.73622 18.0891 9.41078L14.7558 6.07745C14.4303 5.75201 13.9027 5.75201 13.5772 6.07745C13.2518 6.40289 13.2518 6.93053 13.5772 7.25596L15.488 9.16671L2.49984 9.16671C2.0396 9.16671 1.6665 9.5398 1.6665 10C1.6665 10.4603 2.0396 10.8334 2.49984 10.8334L15.488 10.8334L13.5772 12.7441C13.2518 13.0696 13.2518 13.5972 13.5772 13.9226C13.9027 14.2481 14.4303 14.2481 14.7558 13.9226L18.0891 10.5893Z'
                    fill='white'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSubjectInstitutionType;
