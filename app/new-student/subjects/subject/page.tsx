'use client';

import SearchInput from '@/components/input/SearchInput';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter();
  return (
    <div className='layout flex flex-col gap-5'>
      <div
        onClick={() => router.back()}
        className='flex items-center space-x-4'>
        <Image
          src='/svg/back_yellow.svg'
          width={10}
          height={10}
          alt='back'
          className='h-3 w-3'
        />
        <h3 className='text-[14px] font-bold'>Back</h3>
      </div>

      <div className='flex gap-x-4 font-semibold items-center text-lg leading-5 border border-[#eee] px-[10px] py-[3.5px] rounded w-fit'>
        <div className='text-[#C4C4C4]'>Subjects</div>

        <Image
          src='/svg/back_yellow.svg'
          width={10}
          height={10}
          alt='back'
          className='h-3 w-3 rotate-180'
        />

        <div className='text-[#3361FF]'>Mathematics</div>
      </div>

      <div className='text-[32px] font-bold'>Mathematics</div>

      <hr />

      <AllWeek />

    </div>
  )
}

function AllWeek() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row justify-between'>
        <SearchInput placeholder='Search' className='w-full max-w-[343px]' />

        <select className='w-full max-w-[220px] h-[40px] border border-[#333333] rounded-lg text-[#A7A7A7] bg-[#FFF6E7] font-bold text-[14px] leading-4'>
          <option value=''>All Weeks</option>
          <option value=''>Week 1</option>
          <option value=''>Week 2</option>
          <option value=''>Week 3</option>
        </select>
      </div>

      <hr />

      <div className='flex flex-col gap-[10px] bg-[#FAFAFA] px-5 py-[14px]'>
        <div className='text-2xl font-bold'>Week 1 - Theme</div>

        <div className='flex flex-wrap gap-x-[33px] gap-y-[26px]'>
          <SinglePeriod />
          <SinglePeriod />
          <SinglePeriod />
          <SinglePeriod />
          <SinglePeriod />
          <SinglePeriod />
        </div>
      </div>

      <div className='flex flex-col gap-[10px] bg-[#FAFAFA] px-5 py-[14px]'>
        <div className='text-2xl font-bold'>Week 2 - Theme</div>

        <div className='flex flex-wrap gap-x-[33px] gap-y-[26px] relative opacity-25 cursor-not-allowed'>
          <div className='text-[#007AFF] font-bold text-2xl absolute top-1/2 inset-x-[40%] whitespace-nowrap'>Not yet active</div>
          <SinglePeriod />
          <SinglePeriod />
          <SinglePeriod />
          <SinglePeriod />
        </div>
      </div>
    </div>
  );
}


function SinglePeriod() {
  const router = useRouter();
  return (
    <div className='flex flex-col bg-white px-[13px] py-6 w-full max-w-[240px] h-[262px] justify-between'>
      <div className='flex'>
        <div className='flex-1' />
        <div className='flex items-center justify-center w-[109px] h-[24px] rounded text-white capitalize bg-[#08643A]'>
          Period Ended
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='text-[#808080] font-semibold text-[14px] leading-5'>Period 1</div>
        <div className='font-semibold text-lg leading-5'>Introduction to prime Numbers</div>

        <div className='flex items-center justify-center bg-[#F0FFF9] text-[#08643A] text-[14px] leading-[18px] rounded-2xl max-w-[231px] w-full h-[50px]'>
          Completed
        </div>
      </div>

      <div
        onClick={() => router.push('/new-student/subjects/subject/period')}
        className='text-[#3361FF] text-xs font-semibold cursor-pointer text-center'>
        View
      </div>
    </div>
  );
}
export default Page