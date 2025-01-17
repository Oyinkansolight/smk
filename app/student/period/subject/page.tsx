'use client';

import { useGetPeriodById } from '@/server/institution/period';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Page = () => {
  const router = useRouter();
  const queryString = useSearchParams();
  const periodId = queryString?.get('name');

  const { data, isLoading } = useGetPeriodById(periodId ? periodId : '');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='layout flex flex-col gap-5'>
      {!isLoading ? (
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
              <div>Period</div>

              <Image
                src='/svg/back_yellow.svg'
                width={10}
                height={10}
                alt='back'
                className='h-3 w-3 rotate-180'
              />

              <div className='text-[#3361FF]'>
                {data?.subject?.name ?? 'No_name'}
              </div>
            </div>

            <div className='text-xl font-bold '>
              {data?.subject?.name ?? 'No_name'}
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
              <div className='md:order-first order-last flex flex-col gap-[14px] bg-[#F9F9F9] rounded-[5px] px-5 pb-5 pt-[14px] md:w-[817px] w-full'>
                <div className='flex justify-end'>
                  <div className='bg-[#FFF6E7] mb-3 p-1 border border-[#EE9D50]'>
                    {formattedDate}
                  </div>
                </div>
                <div className='text-[#818181] font-semibold text-[14px] leading-5'>
                  Topic
                </div>
                <div className='text-[#746D69] font-bold text-2xl'>
                  {data?.title ?? 'No topic'}
                </div>
              </div>
              <div className='flex  md:flex-col flex-row gap-6 '>
                <div className='flex flex-col items-center justify-between min-w-[220px] w-full bg-[#F9F9F9] rounded border py-3'>
                  <div className='text-[#818181] text-[14px] font-semibold leading-5'>
                    Teacher
                  </div>
                  <div className='flex'>
                    <div className='h4 font-semibold'>
                      {' '}
                      {data?.teacher
                        ? data?.teacher[0]?.user.firstName
                        : 'No_name'}{' '}
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-center justify-between min-w-[220px] w-full bg-[#F9F9F9] rounded border py-3'>
                  <div className='text-[#818181] text-[14px] font-semibold leading-5'>
                    Attendance Status
                  </div>
                  <div className='h4 font-semibold text-[#9FE2C3]'>Present</div>
                </div>
              </div>
            </div>

            <div className='border border-[#D5D7D8] rounded-md grid grid-cols-2 gap-6 p-4 bg-[#FAFAFA]'>
              <Link
                href={`/student/period/note?name=${data?.id}`}
                className='h-[250px] w-full rounded-lg bg-[#FFFAED] grid place-content-center text-center'
              >
                <Image
                  src='/svg/lessonnote.svg'
                  width={180}
                  height={175}
                  alt='note'
                />
                <p className='text-[#B1B1B1] text-[32px] '>Lesson Note</p>
              </Link>
              <Link
                href={`/student/period/activity?name=${data?.id}&activityType=CLASS_WORK`}
                className='h-[250px] w-full rounded-lg bg-[#EFF6F7] grid place-content-center text-center'
              >
                <Image
                  src='/svg/classwork.svg'
                  width={180}
                  height={175}
                  alt='classwork'
                />
                <p className='text-[#B1B1B1] text-[32px] '>Class Work</p>
              </Link>
              <Link
                href={`/student/period/activity?name=${data?.id}&activityType=QUIZ`}
                className='h-[250px] w-full rounded-lg bg-[#F4EFF7] grid place-content-center text-center'
              >
                <Image
                  src='/svg/quiz.svg'
                  width={180}
                  height={175}
                  alt='quiz'
                />
                <p className='text-[#B1B1B1] text-[32px] '>Pop Quiz</p>
              </Link>
              <Link
                href={`/student/period/activity?name=${data?.id}&activityType=ASSIGNMENT`}
                className='h-[250px] w-full rounded-lg bg-[#F4EFF7] grid place-content-center text-center'
              >
                <Image
                  src='/images/sidebar-icons/Assignment.png'
                  width={180}
                  height={175}
                  alt='quiz'
                />
                <p className='text-[#B1B1B1] text-[32px] '>Assignment</p>
              </Link>


          

            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center py-20'>
          <RotatingLines
            width='100'
            visible={true}
            strokeWidth='5'
            strokeColor='#3361FF'
            animationDuration='0.75'
          />
        </div>
      )}
    </div>
  );
};

export default Page;
