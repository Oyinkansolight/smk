'use client';

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
import { getFromLocalStorage } from '@/lib/helper';
import {
  useCreateSubject,
  useGetSubjectAssignedToTeacher,
  useGetTeacherById,
} from '@/server/institution';
import { useGetAllClasses } from '@/server/institution/class';
import { Label } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import TeacherLibrary from 'app/teacher/library/page';
import { useSearchParams } from 'next/navigation';
// import router from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

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

  const { mutateAsync } = useCreateSubject();
  const [classes1, setClasses] = useState(new Set());
  const [classes2, setClasses1] = useState(new Set());
  const [classes3, setClasses2] = useState(new Set());
  const [classes4, setClasses3] = useState(new Set());

  const [d1, setD1] = useState<Label[]>([]);

  const [d2, setD2] = useState<Label[]>([]);

  const [d3, setD3] = useState<Label[]>([]);

  const [d4, setD4] = useState<Label[]>([]);

  const { data: classes } = useGetAllClasses();

  useEffect(() => {
    const m1: Label[] = [];
    const m2: Label[] = [];
    const m3: Label[] = [];
    const m4: Label[] = [];
    if (classes) {
      for (let i = 0; i < classes.length; i++) {
        const cl = classes[i];
        if (cl.institutionType?.toLocaleLowerCase()?.includes?.('eccde')) {
          m1.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        } else if (
          cl.institutionType?.toLocaleLowerCase()?.includes?.('primary')
        ) {
          m2.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        } else if (
          cl.institutionType?.toLocaleLowerCase()?.includes?.('secondary')
        ) {
          m3.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        } else if (
          cl.institutionType?.toLocaleLowerCase()?.includes?.('tertiary')
        ) {
          m4.push({ id: cl.id ?? i, value: cl.name ?? '[NULL]' });
        }
      }
      setD1(m1);
      setD2(m2);
      setD3(m3);
      setD4(m4);
    }
  }, [classes]);
  return (
    <div className='bg-[#EFF3F7] absolute pt-20 pb-5 inset-0 overflow-y-auto'>
      <div className='pt-14  px-6 w-full'>
        <div className='flex items-center space-x-2'>
          <button
            onClick={() => router.back()}
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
          <h2 className='text-[#848689] text-lg'>Add Subject</h2>
        </div>

        <div className='rounded-xl bg-white'>
          <div className='p-4 border-b'>
            <div className='flex space-x-2 items-center'>
              <div className=' bg-[#5754F7] text-[8px] font-normal grid place-content-center text-xs text-white w-4 h-4 rounded-full'>
                1
              </div>
              <h5 className='text-[#5754F7]'> General</h5>
            </div>
            <h6 className='text-gray-500'>
              Kindly enter the details of the Subject below.
            </h6>
          </div>

          <div className='p-4'>
            <div className='md:w-1/2 w-full'>
              <div className='rounded-md p-2 flex flex-col border-[#D0D5DD] bg-[#F5F5F5] border'>
                <h6 className='text-gray-400 text-[8px]'>Subject Name</h6>
                <input
                  type='text'
                  className='p-0 outline-none border-none bg-transparent w-full'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-xl mt-6 bg-white'>
          <div className='p-4 border-b'>
            <div className='flex space-x-2 items-center'>
              <div className=' bg-[#5754F7] text-[8px] font-normal grid place-content-center text-xs text-white w-4 h-4 rounded-full'>
                2
              </div>
              <h5 className='text-[#5754F7]'> Classes Applicable</h5>
            </div>
            <h6 className='text-gray-500'>
              Kindly enter the details of the Subject below.
            </h6>
          </div>

          <div className='p-4'>
            <div className='flex flex-col gap-5 mt-7 w-full'>
              <div className='w-full text-start font-bold'>
                <div>ECCDE School</div>
              </div>
              <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
                <div
                  onClick={() => {
                    const s = new Set(classes1);
                    for (let i = 0; i < d1.length; i++) {
                      s.add(i);
                    }
                    setClasses(s);
                  }}
                  className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                >
                  {Array.from(classes1.entries()).length === d1.length ? (
                    <AiFillCheckCircle
                      className={clsxm('h-5 w-5 text-fun-green-500')}
                    />
                  ) : (
                    <div
                      style={{ height: '20px', width: '20px' }}
                      className='h-5 w-5 rounded-full border-2'
                    >
                      <div>.</div>
                    </div>
                  )}
                  <div className='col-span-2'>Select All</div>
                </div>
                {d1?.map((v, i) => (
                  <div
                    onClick={() => {
                      if (classes1.has(i)) {
                        const s = new Set(classes1);
                        s.delete(i);
                        setClasses(s);
                      } else {
                        const s = new Set(classes1);
                        s.add(i);
                        setClasses(s);
                      }
                    }}
                    key={i}
                    className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                  >
                    {classes1.has(i) ? (
                      <AiFillCheckCircle
                        className={clsxm('h-5 w-5 text-fun-green-500')}
                      />
                    ) : (
                      <div className='h-5 w-5 rounded-full border-2' />
                    )}
                    <div className='col-span-2'>{v.value}</div>
                  </div>
                ))}
              </div>

              <div className='w-full text-start font-bold'>
                <div>Primary School</div>
              </div>
              <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
                <div
                  onClick={() => {
                    const s = new Set(classes1);
                    for (let i = 0; i < d2.length; i++) {
                      s.add(i);
                    }
                    setClasses1(s);
                  }}
                  className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                >
                  {Array.from(classes2.entries()).length === d2.length ? (
                    <AiFillCheckCircle
                      className={clsxm('h-5 w-5 text-fun-green-500')}
                    />
                  ) : (
                    <div className='h-5 w-5 rounded-full border-2' />
                  )}
                  <div className='col-span-2'>Select All</div>
                </div>
                {d2?.map((v, i) => (
                  <div
                    onClick={() => {
                      if (classes2.has(i)) {
                        const s = new Set(classes2);
                        s.delete(i);
                        setClasses1(s);
                      } else {
                        const s = new Set(classes2);
                        s.add(i);
                        setClasses1(s);
                      }
                    }}
                    key={i}
                    className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                  >
                    {classes2.has(i) ? (
                      <AiFillCheckCircle
                        className={clsxm('h-5 w-5 text-fun-green-500')}
                      />
                    ) : (
                      <div className='h-5 w-5 rounded-full border-2' />
                    )}
                    <div className='col-span-2'>{v.value}</div>
                  </div>
                ))}
              </div>

              <div className='w-full text-start font-bold'>
                <div>Secondary School</div>
              </div>
              <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
                <div
                  onClick={() => {
                    const s = new Set(classes1);
                    for (let i = 0; i < d3.length; i++) {
                      s.add(i);
                    }
                    setClasses2(s);
                  }}
                  className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                >
                  {Array.from(classes3.entries()).length === d3.length ? (
                    <AiFillCheckCircle
                      className={clsxm('h-5 w-5 text-fun-green-500')}
                    />
                  ) : (
                    <div className='h-5 w-5 rounded-full border-2' />
                  )}
                  <div className='col-span-2'>Select All</div>
                </div>
                {d3?.map((v, i) => (
                  <div
                    onClick={() => {
                      if (classes3.has(i)) {
                        const s = new Set(classes3);
                        s.delete(i);
                        setClasses2(s);
                      } else {
                        const s = new Set(classes3);
                        s.add(i);
                        setClasses2(s);
                      }
                    }}
                    key={i}
                    className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                  >
                    {classes3.has(i) ? (
                      <AiFillCheckCircle
                        className={clsxm('h-5 w-5 text-fun-green-500')}
                      />
                    ) : (
                      <div className='h-5 w-5 rounded-full border-2' />
                    )}
                    <div className='col-span-2'>{v.value}</div>
                  </div>
                ))}
              </div>

              <div className='w-full text-start font-bold'>
                <div>Tertiary School</div>
              </div>
              <div className='text-xs whitespace-nowrap grid w-full grid-cols-1 gap-y-2 gap-x-8 md:grid-cols-4 mt-[14px]'>
                <div
                  onClick={() => {
                    const s = new Set(classes1);
                    for (let i = 0; i < d4.length; i++) {
                      s.add(i);
                    }
                    setClasses3(s);
                  }}
                  className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                >
                  {Array.from(classes4.entries()).length === d4.length ? (
                    <AiFillCheckCircle
                      className={clsxm('h-5 w-5 text-fun-green-500')}
                    />
                  ) : (
                    <div className='h-5 w-5 rounded-full border-2' />
                  )}
                  <div className='col-span-2'>Select All</div>
                </div>
                {d4?.map((v, i) => (
                  <div
                    onClick={() => {
                      if (classes4.has(i)) {
                        const s = new Set(classes4);
                        s.delete(i);
                        setClasses3(s);
                      } else {
                        const s = new Set(classes4);
                        s.add(i);
                        setClasses3(s);
                      }
                    }}
                    key={i}
                    className='grid w-full justify-items-start grid-cols-3 cursor-pointer items-center gap-2'
                  >
                    {classes4.has(i) ? (
                      <AiFillCheckCircle
                        className={clsxm('h-5 w-5 text-fun-green-500')}
                      />
                    ) : (
                      <div className='h-5 w-5 rounded-full border-2' />
                    )}
                    <div className='col-span-2'>{v.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-xl mt-6 bg-white p-4 flex justify-end'>
          <button className='rounded-full p-2 text-white items-center bg-[#5754f7] flex space-x-2'>
            <span>Continue</span>
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
  );
};

export default SingleSubjectInstitutionType;
