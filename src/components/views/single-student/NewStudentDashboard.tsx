'use client';

import NewStudentSmallTimetable from '@/components/views/single-student/NewStudentSmallTimetable';
import NextPeriod from '@/components/views/single-student/NextPeriod';
import { getFromSessionStorage } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import { useGetStudentOngoingPeriod } from '@/server/government/student';
import { useGetTodaysPeriod } from '@/server/student';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function NewStudentDashboard() {
  //fetch profile info
  useGetProfile();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // Returns a number from 0 (Sunday) to 6 (Saturday)
  const currentDay = daysOfWeek[currentDayIndex];
  const userData = getFromSessionStorage('user');
  const currentTerm = getFromSessionStorage('currentTerm') ?? '';
  const currentWeek = getFromSessionStorage('currentWeek') ?? '';
  let user;
  // let currentTermInfo;
  let currentWeekInfo;

  if (userData && currentTerm && currentWeek) {
    user = JSON.parse(userData);
    // currentTermInfo = JSON.parse(currentTerm);
    currentWeekInfo = JSON.parse(currentWeek) ?? {};
  }
  const { data: ongoingPeriod, isLoading } = useGetStudentOngoingPeriod({
    studentId: user?.currentStudentInfo.id ?? '',
    weekId: currentWeekInfo?.id ?? '',
  });

  const { isLoading: loading, data: todaysPeriod } = useGetTodaysPeriod({
    classId: user?.currentStudentInfo?.class?.class?.id,
    day: currentDay,
    weekid: currentWeekInfo?.id ?? '',
  });

  // const clockIn = useClockIn();
  // const clockOut = useClockOut();
  // const { data: clockInfo } = useGetClockInfo();
  // const { data: terms } = useGetSessionTerms({
  //   sessionId: profile?.currentSession?.[0].id,
  // });

  // const handleClockIn = async () => {
  //   try {
  //     const res = await clockIn.mutateAsync({
  //       sessionId: profile?.currentSession?.[0]?.id ?? 0,
  //       termId: (terms?.data ?? [])[0].id,
  //     });
  //     toast.success(res.data.data.message);
  //   } catch (error) {
  //     toast.error(getErrMsg(error));
  //   }
  // };

  // const handleClockOut = async () => {
  //   try {
  //     const res = await clockOut.mutateAsync({
  //       clockOutTime: `${new Date().toISOString()}`,
  //     });
  //     toast.success(res.data.data.message);
  //   } catch (error) {
  //     toast.error(getErrMsg(error));
  //   }
  // };

  // ===========================================================

  const [time, setTime] = useState(0);
  // const [intervalId, setIntervalId] = useState(null);
  const [pageLoadTime, setPageLoadTime] = useState(Date.now());
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setTime(Date.now() - pageLoadTime);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, pageLoadTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
      if (!document.hidden) {
        const pageLoadTime = Date.now() - time;
        setPageLoadTime(pageLoadTime);
        localStorage.setItem('pageLoadTime', `${(time / 60000).toFixed(2)}`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [time]);

  return (
    <div className='flex md:flex-row flex-col md:justify-between gap-8'>
      <div className='w-full flex flex-col gap-8 mt-8 px-7'>
        <div className='flex flex-col gap-2'>
          <div className='h3'> {user?.name ?? ''}</div>
          <div className='text-sm text-[#888]'>
            Monitor your Period room and activities here
          </div>
          <div className='bg-black h-px mt-3' />
        </div>

        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='font-bold text-xl text-[#746D69] mb-[14px]'>
            Next Period
          </div>
          <NextPeriod
            studentId={user?.currentStudentInfo.id}
            weekId={currentWeekInfo?.id ?? ''}
          />
        </div>

        <div className='p-4 rounded-xl border bg-[#FAFAFA]'>
          <div className='h4 text-[#746D69]'>Your Actions</div>
          {!isLoading && ongoingPeriod && (
            <div className='flex flex-wrap gap-4 mt-2'>
              <div className='h-[250px] max-w-[250px] relative w-full flex flex-col space-y-4 items-center border rounded-lg bg-[#fff] p-[10px]'>
                <div className='bg-[#BB7101] rounded-md py-1 px-3 text-base font-bold text-white'>
                  1 Ongoing Period
                </div>

                <div>
                  <Image
                    src='/images/sidebar-icons/Classes.png'
                    height={76}
                    width={76}
                    alt='period'
                  />
                </div>

                <h1 className='text-lg'>Periods</h1>

                <Link
                  href={`/student/period/subject?name=${ongoingPeriod.id}`}
                  className='border border-[#3361FF] bg-[#fff] font-medium  text-lg  px-4 py-1 rounded-lg'
                >
                  View
                </Link>

                {/* <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-base'>
                      {' '}
                      {ongoingPeriod?.subject?.name}{' '}
                    </h1>
                    <p className='text-[#808080] text-[10px] '>
                      {time24Converter(ongoingPeriod.startTime)} -{' '}
                      {time24Converter(ongoingPeriod.endTime)}
                    </p>
                  </div>
                  <div>
                    <Books className='h-8 w-8 ' />
                  </div>
                </div>
                <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                <p className='text-[#808080] text-[10px] '>
                  {ongoingPeriod.theme}
                </p>
                <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                  <BiUser className='h-8 w-8' />{' '}
                  <p> {ongoingPeriod?.teacher[0]?.user?.firstName ?? ''}</p>
                </div> */}

                <div className='flex justify-center absolute bottom-4 w-full'></div>
              </div>
            </div>
          )}
          {isLoading && (
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
        {/* <NewStudentClock
          handleClockIn={handleClockIn}
          handleClockOut={handleClockOut}
          clockInfo={clockInfo}
        /> */}
        <div className='flex flex-col gap-y-[14px] p-4 rounded-xl border bg-[#FAFAFA] w-full md:w-[300px]'>
          <div className='font-bold text-xl '>Today's Timetable</div>
          <NewStudentSmallTimetable
            loading={loading}
            todaysPeriod={todaysPeriod?.data}
          />
        </div>
      </div>
    </div>
  );
}
