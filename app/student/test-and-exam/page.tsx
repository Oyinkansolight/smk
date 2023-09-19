/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NextImage from '@/components/NextImage';
import TabBar from '@/components/layout/TabBar';
import { useGetAcademicSessions } from '@/server/dashboard';
import { useGetSubjectList } from '@/server/institution';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';

const Page = () => {
  const [page, setPage] = useState(0);
  const { data: allSession } = useGetAcademicSessions();
  const { data: allSubject } = useGetSubjectList();

  return (
    <div className='flex flex-col w-full px-4 gap-y-10'>
      <div className=''>
        <h1 className='text-xl font-medium mb-3 mt-6'>Test & Exam Practice</h1>

        <div className='border-t mb-4'>
          <TabBar
            variant='secondary'
            selected={page}
            onSelect={(i) => setPage(i)}
            items={[
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'CA 1',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'CA 2',
              },
              {
                icon: <BiListCheck className='h-5 w-5' />,
                label: 'Test and Exam',
              },
            ]}
          />
        </div>
        <div className='flex justify-end'>
          <div className='flex justify-end   text-gray-500'>
            <select
              name=''
              id=''
              className='p-2 bg-[#FFF6E7] border !text-xs rounded'
            >
              <option value=''> Session & Term</option>
              {(allSession?.data ?? []).map((v: any, i: number) => (
                <option key={i} value={v.id}>
                  {' '}
                  {v.session}{' '}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='my-4 flex justify-between items-center border-y py-4 border-black'>
          <div className='w-[250px] h-9 rounded-full border px-3 py-1 flex justify-center items-center'>
            <AiOutlineSearch size={20} />{' '}
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
                  {' '}
                  {v.name}{' '}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {page === 0 && (
        <div className='border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
          <h1 className='text-xl font-medium mb-3'>Your CA 1 Test</h1>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {[1, 2, 3].map((_, i) => (
              <Link
                href='/student/test-and-exam/subject?name=mathematics&type=CA 1 Test'
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
                  <p className='text-xs text-blue-500'>Mathematics</p>
                  <p className='text-xs text-[#615E83]'>CA 1 Test</p>
                  <div className='mt-4 text-[10px] flex justify-between items-center'>
                    <div>
                      <span>Test Date:</span>24-05-2023
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {page === 1 && (
        <div className='border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
          <h1 className='text-xl font-medium mb-3'>Your CA 2 Test</h1>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <Link
                href='/student/test-and-exam/subject?name=mathematics&type=CA 2 Test'
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
                  <p className='text-xs text-blue-500'>Mathematics</p>
                  <p className='text-xs text-[#615E83]'>CA 2 Test</p>
                  <div className='mt-4 text-[10px] flex justify-between items-center'>
                    <div>
                      <span>Test Date:</span>24-05-2023
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {page === 2 && (
        <div className='border border-[#D5D7D8] rounded-md p-3 bg-[#FAFAFA]'>
          <h1 className='text-xl font-medium mb-3'>Your Examination</h1>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {[3].map((_, i) => (
              <Link
                href='/student/test-and-exam/subject?name=mathematics&type=Exam'
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
                  <p className='text-xs text-blue-500'>Mathematics</p>
                  <p className='text-xs text-[#615E83]'>Examination</p>
                  <div className='mt-4 text-[10px] flex justify-between items-center'>
                    <div>
                      <span>Examination Date:</span>24-05-2023
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
