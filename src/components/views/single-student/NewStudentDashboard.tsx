'use client';

import StudentActionCard from '@/components/cards/StudentActionCard';
import NewStudentClock from '@/components/views/single-student/NewStudentClock';
import NewStudentSmallTimetable from '@/components/views/single-student/NewStudentSmallTimetable';
import NextPeriod from '@/components/views/single-student/NextPeriod';
import { useGetStudentOngoingPeriod } from '@/server/government/student';
import { RotatingLines } from 'react-loader-spinner';

export default function NewStudentDashboard() {
  const { data, isLoading } = useGetStudentOngoingPeriod();

  return (
    <div className='flex md:flex-row flex-col md:justify-between gap-8'>
      <div className='w-full flex flex-col gap-8 mt-8 px-7'>
        <div className='flex flex-col gap-2'>
          <div className='h3'>Hello, Johnny</div>
          <div className='text-sm text-[#888]'>
            Monitor your Period room and activities here
          </div>
          <div className='bg-black h-px mt-3' />
        </div>

        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='font-bold text-xl text-[#746D69] mb-[14px]'>
            Next Period
          </div>
          <NextPeriod />
        </div>

        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='h4 text-[#746D69]'>Your Actions</div>
          {!isLoading ? (
            <div className='flex flex-wrap gap-4 mt-2'>
              {(data ?? [1, 2]).map((v: unknown, i: number) => (
                <StudentActionCard
                  key={i}
                  ongoing={i === 0}
                  img='/images/sidebar-icons/Dashboard.png'
                  type='assignment'
                />
              ))}
            </div>
          ) : (
            <div className='flex justify-center'>
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
      </div>

      <div className='px-7 md:px-0  md:max-w-sm flex md:flex-col flex-row gap-8 md:pr-11 pt-[35px]'>
        <NewStudentClock />
        <div className='flex flex-col gap-y-[14px] p-4 rounded-xl border bg-[#FAFAFA] w-full max-w-[296px]'>
          <div className='font-bold text-xl '>Today's Timetable</div>
          <NewStudentSmallTimetable />
        </div>
      </div>
    </div>
  );
}
