/* eslint-disable @typescript-eslint/no-explicit-any */
import moment, { Duration } from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NewStudentClock({
  handleClockIn,
  handleClockOut,
  clockInfo,
}: any) {
  const [clockedInTime, setClockedInTime] = useState<Duration | undefined>();

  useEffect(() => {
    setTimeout(() => {
      if (clockInfo?.isClockedIn && clockInfo?.clockInTime) {
        const duration = moment
          .duration(moment().diff(moment(clockInfo?.clockInTime)))
          .add(1, 'hour');
        setClockedInTime(duration);
      }
    }, 1000);
  }, [clockInfo?.clockInTime, clockInfo?.isClockedIn, clockedInTime]);

  return (
    <div className='flex  py-5 px-5 gap-5 flex-col text-center items-center rounded-lg border border-blue-500  w-[296px] h-[275px]'>
      {clockInfo?.isClockedIn ? (
        <div className='flex items-center flex-col space-y-4'>
          <div> Time Online:</div>
          <div>
            <span className='text-xl text-[#FB6340]'>
              {clockedInTime?.hours().toString().padStart(2, '0')}:
              {clockedInTime?.minutes().toString().padStart(2, '0')}:
              {clockedInTime?.seconds().toString().padStart(2, '0')}
            </span>
          </div>
          <div className='w-4' />
          <button
            onClick={handleClockOut}
            className='h-[40px] w-[120px] rounded-[3.2px] border border-[#007AFF] bg-white py-2 px-5 text-[#007AFF]'
          >
            Stop Clock
          </button>
        </div>
      ) : (
        <div className='flex flex-col items-center space-y-6 text-xs md:text-base'>
          <div>
            You are{' '}
            <span className='font-bold text-[#008146] mx-1'>Within</span>
            your clock area
          </div>
          <div>
            <Image
              src='/svg/clockinout.svg'
              width={200}
              height={40}
              alt='time'
            />
          </div>
          <button
            onClick={handleClockIn}
            className='rounded-sm bg-[#007AFF] py-2 px-5 mt-2 text-white'
          >
            Clock In
          </button>
        </div>
      )}
    </div>
  );
}
