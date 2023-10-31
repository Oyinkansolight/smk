/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NextImage from '@/components/NextImage';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import { useGetAcademicSessions } from '@/server/dashboard';
import { useGetSubjectList } from '@/server/institution';
import { useGetClassActivity } from '@/server/institution/period';
import Link from 'next/link';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';

const Page = () => {
  const { data: allSession } = useGetAcademicSessions();
  const { data: allSubject } = useGetSubjectList();
  const [subjectId, setSubjectId] = useState('');
  const currentTerm = getFromSessionStorage('currentTerm') ?? '';
  const currentSessionId = getFromLocalStorage('currentSessionId') ?? '';
  let currentTermInfo;
  if (currentTerm) {
    currentTermInfo = JSON.parse(currentTerm);
  }
  const userData = getFromSessionStorage('user');
  // allSubject && setSubjectId(allSubject[0]);

  let user;
  if (userData) {
    user = JSON.parse(userData);
  }

  const { data: activities, isLoading: activitiesLoading } =
    useGetClassActivity({
      subjectId,
      typeOfActivity: 'ASSIGNMENT',
      classArmId: user?.currentStudentInfo?.class.id ?? '',
    });

  return (
    <div className='flex flex-col w-full px-4 gap-y-10'>
      <div className=''>
        <h1 className='text-xl font-medium mb-3 mt-6'>Assignments</h1>
        <div className='flex justify-end'>
          <div className='flex justify-end   text-gray-500'>
            <select
              onChange={(e) => {
                setSubjectId(e.target.value);
              }}
              name=''
              id=''
              className='p-2 bg-[#FFF6E7] border !text-xs rounded'
            >
              <option value=''> Session & Term</option>
              {(allSession?.data ?? []).map((v: any, i: number) => (
                <option key={i} value={v.id}>
                  {v.session}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='my-4 flex justify-between items-center border-y py-4 border-black'>
          <div className='w-[250px] h-9 rounded-full border px-3 py-1 flex justify-center items-center'>
            <AiOutlineSearch size={20} />
            <input
              type='text'
              placeholder='Search....'
              className='w-full h-7 !outline-none border-none'
            />
          </div>
          <div className='flex justify-end   text-gray-500'>
            <select
              name=''
              id=''
              className='p-2 bg-[#FFF6E7] border !text-xs rounded'
            >
              <option value=''>Subject</option>
              {(allSubject ?? []).map((v: any, i: number) => (
                <option key={i} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
        <h1 className='text-xl font-medium mb-3'>Pending Assignments</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {[1, 2, 3].map((_, i) => (
            <Link
              href='/student/assignment/subject?name=mathematics'
              key={i}
              className='rounded-xl bg-white border p-3 flex space-x-4'
            >
              <NextImage
                width={57}
                height={54}
                alt='Assignment Icon'
                src='/images/sidebar-icons/Assignment.png'
              />
              <div className='flex-1 flex flex-col'>
                <p className='text-xs text-blue-500'>
                  Mathematics - 4th Period
                </p>
                <p className='text-xs text-[#615E83]'>
                  Introduction to prime numbers
                </p>
                <div className='mt-4 text-[10px] flex justify-between items-center'>
                  <div>
                    <span>Due Date:</span>24-05-2023
                  </div>
                  <div className='rounded bg-[#E5A500] text-white p-1'>
                    Overdue
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className='mt-5 border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
        <h1 className='text-xl font-medium mb-3'>Completed Assignments</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className='rounded-xl bg-white border p-3 flex space-x-4'
            >
              <NextImage
                width={57}
                height={54}
                alt='Assignment Icon'
                src='/images/sidebar-icons/Assignment.png'
              />
              <div className='flex-1 flex flex-col'>
                <p className='text-xs text-blue-500'>English - 5th Period</p>
                <p className='text-xs text-[#615E83]'>Introduction to vowels</p>
                <div className='mt-4 text-[10px] flex justify-between items-center'>
                  <div>
                    <span>Due Date:</span>24-05-2023
                  </div>
                  <div className='rounded bg-[#E5A500] text-white p-1'>
                    Overdue
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
