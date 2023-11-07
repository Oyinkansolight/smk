'use client';

import AssignmentQuestionView from '@/components/cards/AssignmentQuestionView';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  // Get the URL query string
  const queryString = useSearchParams();
  const [title, settitle] = useState<string | null>('');
  const [type, settype] = useState<string | null>('');

  useEffect(() => {
    // Create a URLSearchParams object with the query string
    const searchParams = new URLSearchParams(queryString ?? '');

    // Extract the values of subject name parameters
    const subjectName = searchParams.get('name');
    const typename = searchParams.get('type');
    settitle(subjectName);
    settype(typename);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='layout flex flex-col gap-5'>
      <div className='flex flex-row gap-8 justify-between'>
        <div className='flex flex-col gap-5 w-full'>
          <button
            onClick={() => router.back()}
            className='flex items-center space-x-4'
          >
            <Image
              src='/svg/back_yellow.svg'
              width={10}
              height={10}
              alt='back'
              className='h-3 w-3'
            />
            <h3 className='text-[14px] font-bold'>Back</h3>
          </button>

          <div className='flex gap-x-4 font-semibold items-center text-lg leading-5 border border-[#eee] px-[10px] py-[3.5px] rounded w-fit text-[#C4C4C4]'>
            <div>Assignment</div>

            <Image
              src='/svg/back_yellow.svg'
              width={10}
              height={10}
              alt='back'
              className='h-3 w-3 rotate-180'
            />

            <div className='text-[#3361FF]'>{title}</div>
          </div>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='md:order-first order-last flex flex-col gap-[14px] bg-[#F9F9F9] rounded-[5px] px-5 pb-5 pt-[14px] md:w-[817px] w-full'>
              <div className='grid sm:grid-cols-2 gap-5 text-[#746D69]'>
                <div className='space-y-4'>
                  <p className='text-[8px]'>Subject:</p>
                  <h1 className='text-base font-bold'>Mathematics</h1>
                </div>

                <div className='space-y-4'>
                  <p className='text-[8px]'>Type:</p>
                  <h1 className='text-base font-bold'>{type}</h1>
                </div>
              </div>
              <div className='bg-[#3361FF]/10 p-4 rounded-md grid sm:grid-cols-2  gap-5 text-[#746D69]'>
                <div className='space-y-4'>
                  <p className='text-[8px]'>Date:</p>
                  <h1 className='text-base font-bold'>24th March, 2023</h1>
                </div>

                <div className='space-y-4'>
                  <p className='text-[8px]'>Score:</p>
                  <h1 className='text-base font-bold'>
                    <span className='text-blue-500'>10</span>/15
                  </h1>
                </div>
              </div>
            </div>
            <div className='flex md:flex-col flex-row gap-6 '>
              <div className='flex flex-col items-center justify-between min-w-[220px] w-full bg-[#F9F9F9] rounded border py-3'>
                <div className='text-[#818181] text-[14px] font-semibold leading-5'>
                  Teacher
                </div>
                <div className='flex'>
                  <div className='h4 font-semibold'>Santos Igbhosa</div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-[14px] bg-[#FAFAFA] py-[14px] px-5 rounded-[5px]'>
            <div className='h3'>{type}</div>
            <div className='flex flex-col gap-[14px]'>
              {/* <AssignmentQuestionView
                question='1. What is 2 + 2?'
                options={['4', '6', '5', '7']}
              />
              <AssignmentQuestionView
                question='2. What is 2 + 2?'
                options={['4', '6', '5', '7']}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
