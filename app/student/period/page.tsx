'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFromSessionStorage, time24Converter } from '@/lib/helper';
import { useGetTodaysPeriod } from '@/server/student';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { RotatingLines } from 'react-loader-spinner';
import Books from '~/svg/books.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

const Page = () => {
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
  // const currentSessionId = getFromLocalStorage('currentSessionId');
  const currentTerm = getFromSessionStorage('currentTerm');
  const currentWeek = getFromSessionStorage('currentWeek');
  let user;
  let currentTermInfo;
  let currentWeekInfo;

  if (userData && currentTerm && currentWeek) {
    user = JSON.parse(userData);
    currentTermInfo = JSON.parse(currentTerm);
    currentWeekInfo = JSON.parse(currentWeek);
  }
  // useEffect(() => {
  //   const sessionInfo = JSON.parse(
  //     sessionStorage.getItem('currentSession') || '{}'
  //   );
  // }, []);

  const { isLoading, data } = useGetTodaysPeriod({
    classId: user?.currentStudentInfo.class.class.id,
    day: currentDay,
    weekid: currentWeekInfo?.id,
  });

  return (
    <div className='flex gap x-4 gap-y-10'>
      <div className='w-full px-4'>
        <div className='mb-4 flex justify-between items-center border-b border-black'>
          <h1 className='text-xl font-medium mb-3 mt-6'>Periods</h1>

          <div className='w-[250px] h-9 rounded-full border px-3 py-1 flex justify-center items-center'>
            <AiOutlineSearch size={20} />{' '}
            <input
              type='text'
              placeholder='Search....'
              className='w-full h-7 !outline-none border-none'
            />
          </div>
        </div>

        <div className='rounded px-4  pt-4 pb-20 border bg-[#FAFAFA] overflow-y-auto'>
          <h1 className='text-xl font-medium mb-3 mt-6'>Today’s Periods</h1>

          {!isLoading ? (
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-6'>
              {data?.data.map((item: any, i: number) => (
                <div
                  key={i}
                  className='h-[250px] relative w-full border-[#3361FF] border rounded-lg bg-[#F2F5FF] p-[10px]'
                >
                  <div className='flex justify-between items-center'>
                    <div>
                      <h1 className='font-bold text-base'>
                        {' '}
                        {item?.subject
                          ? item?.subject?.name
                          : item.eventName}{' '}
                      </h1>
                      <p className='text-[#808080] text-[10px] '>
                        {time24Converter(item.startTime)} -{' '}
                        {time24Converter(item.endTime)}
                      </p>
                    </div>
                    <div>
                      <Books className='h-8 w-8 ' />
                    </div>
                  </div>
                  <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                  <p className='text-[#808080] text-[10px] '>
                    {item?.theme ?? 'N/A'}
                  </p>
                  <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                  <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                    <BiUser className='h-8 w-8' />{' '}
                    <p>
                      {' '}
                      {item?.teacher.filter(
                        (teacher) =>
                          teacher?.employmentDetails?.schoolName ===
                          user?.currentStudentInfo?.institution?.instituteName
                      )[0]?.user?.firstName ?? 'N/A'}
                    </p>
                  </div>

                  <div className='flex justify-center absolute bottom-4 w-full'>
                    <Link
                      href={`/student/period/subject?name=${item.id}`}
                      className='bg-[#3361FF] font-medium text-white px-2 py-1 rounded-2xl'
                    >
                      Go to Period
                    </Link>
                  </div>
                </div>
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
    </div>
  );
};

export default Page;
