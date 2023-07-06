'use client';

import { useGetStudentNextPeriod } from '@/server/government/student';
import Link from 'next/link';
import { RotatingLines } from 'react-loader-spinner';

export default function NextPeriod() {
  const { isLoading } = useGetStudentNextPeriod();

  const data = {
    startTime: '8:00',
    endTime: '9:00',
    subject: {
      name: 'Diction',
    },
  };

  return (
    <div>
      {!isLoading ? (
        <div>
          {data ? (
            <div className='flex gap-8 bg-[#F2F5FF] border-2 items-center p-4 rounded-lg'>
              <div className='h-28 w-28 rounded-lg bg-slate-400' />
              <div className='flex flex-col gap-3 flex-1'>
                <div className='text-[#3479EA] font-semibold text-sm leading-5'>
                  4th Period, {data.startTime} - {data.endTime}
                </div>
                <div className='text-[#615E83] font-bold text-2xl leading-7'>
                  {data.subject.name}
                </div>
                <div>
                  <div className='text-[#615E83] font-bold'>
                    <span className='text-[#333F4859]'>Time Left:</span> 32 Mins
                  </div>
                  <div className='w-full h-2 bg-[#DADADA] rounded-full overflow-hidden'>
                    <div className='w-20 h-full bg-[#FFC136]' />
                  </div>
                </div>
              </div>
              <Link
                href={`/student/period/subject?name=${data.subject.name}`}
                className='rounded-lg bg-[#3361FF] p-2 text-white text-sm font-bold max-w-[142px] max-h-[36px]'
              >
                Go To Period
              </Link>
            </div>
          ) : (
            <div>
              <h3>No Next Peeriod</h3>
            </div>
          )}
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
  );
}
