'use client';

import StudentActionCard from '@/components/cards/StudentActionCard';
import NewStudentClock from '@/components/views/single-student/NewStudentClock';
import NewStudentSmallTimetable from '@/components/views/single-student/NewStudentSmallTimetable';
import NextPeriod from '@/components/views/single-student/NextPeriod';
import { getFromSessionStorage } from '@/lib/helper';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useGetStudentOngoingPeriod } from '@/server/government/student';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetClockInfo } from '@/server/institution/clock-in-clock-out';
import { useGetTodaysPeriod } from '@/server/student';
import { useClockIn, useClockOut } from '@/server/teacher';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

export default function NewStudentDashboard() {
  const userData = getFromSessionStorage('user');
  let user;

  if (userData) {
    user = JSON.parse(userData);
  }
  const { data, isLoading } = useGetStudentOngoingPeriod({
    studentId: user?.currentStudentInfo.id,
    weekId: '5d207bc4-753e-4832-904e-7fe105751508',
  });
  const { isLoading: loading, data: todaysPeriod } = useGetTodaysPeriod({
    classId: '85dcf853-87fa-4454-bb93-b3d5279cda18',
    day: 'Monday',
    weekid: '5d207bc4-753e-4832-904e-7fe105751508',
  });

  const clockIn = useClockIn();
  const clockOut = useClockOut();
  const { data: clockInfo } = useGetClockInfo();
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0].id,
  });
  const handleClockIn = async () => {
    try {
      const res = await clockIn.mutateAsync({
        sessionId: profile?.currentSession?.[0]?.id ?? 0,
        termId: (terms?.data ?? [])[0].id,
      });
      toast.success(res.data.data.message);
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };

  const handleClockOut = async () => {
    try {
      const res = await clockOut.mutateAsync({
        clockOutTime: `${new Date().toISOString()}`,
      });
      toast.success(res.data.data.message);
    } catch (error) {
      toast.error(getErrMsg(error));
    }
  };
  return (
    <div className='flex md:flex-row flex-col md:justify-between gap-8'>
      <div className='w-full flex flex-col gap-8 mt-8 px-7'>
        <div className='flex flex-col gap-2'>
          <div className='h3'>Hello, {user?.name ?? ''}</div>
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
            weekId='5d207bc4-753e-4832-904e-7fe105751508'
          />
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
        <NewStudentClock
          handleClockIn={handleClockIn}
          handleClockOut={handleClockOut}
          clockInfo={clockInfo}
        />
        <div className='flex flex-col gap-y-[14px] p-4 rounded-xl border bg-[#FAFAFA] w-full max-w-[296px]'>
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
