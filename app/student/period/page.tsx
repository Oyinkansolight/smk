'use client';

import { useGetProfile } from '@/server/auth';
import { useGetSessionTerms } from '@/server/government/terms';
import { useGetTodaysPeriod } from '@/server/student';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner';
import Alarm from '~/svg/alarm.svg';
import Books from '~/svg/books.svg';
import Teacher from '~/svg/teacher.svg';
import Tick from '~/svg/tick.svg';


const Page = () => {
  // const [isEdit, setIsEdit] = useState(false);
  // const [editContent, seteditContent] = useState(false);
  // const [editAction, seteditAction] = useState(false);
  // function handleModal() {
  //   setIsEdit(!isEdit);
  //   seteditAction(true);
  // }
  // function handleEditModal() {
  //   seteditContent(!editContent);
  // }

  useEffect(() => {
    // const sessionInfo = JSON.parse(
    //   sessionStorage.getItem('currentSession') || '{}'
    // );
  }, []);
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.id,
  });
  const { isLoading } = useGetTodaysPeriod({
    sessionId: profile?.currentSession?.id,
    classId: 1,
    termId: (terms?.data ?? [])[0].id,
    day: 'Wednesday',
    weekid: 1,
  });

  return (
    <div className='flex gapx-4 gap-y-10'>
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

        <div className='rounded p-4 border bg-[#FAFAFA]'>
          <h1 className='text-xl font-medium mb-3 mt-6'>Today’s Periods</h1>

          {!isLoading ? (
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-6'>
              <div className='h-[250px] w-full rounded-lg bg-[#F3F3F3] grid place-content-center text-center'>
                <h1 className='font-bold text-base'>Assembly</h1>
                <p className='text-[#808080] text-[10px] '>
                  07:00 AM - 08:30 am
                </p>
              </div>

              <div className='h-[250px] w-full rounded-lg bg-[#F3F3F3] grid place-content-center text-center'>
                <h1 className='font-bold text-base'>Mental Mathematics</h1>
                <p className='text-[#808080] text-[10px] '>
                  07:00 AM - 08:30 am
                </p>
              </div>
              <div className='h-[250px] w-full border-[#8BC8A7] border rounded-lg bg-[#F9FCFF] p-[10px]'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-base'>Mathematics</h1>
                    <p className='text-[#808080] text-[10px] '>
                      07:00 AM - 08:30 am
                    </p>
                  </div>
                  <div>
                    <Tick className='h-8 w-8 ' />
                  </div>
                </div>
                <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                <p className='text-[#808080] text-[10px] '>
                  Introduction to Prime Numbers
                </p>
                <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                  <Teacher className='h-8 w-8 ' /> <p> Babafemi Akanni</p>{' '}
                </div>

                <div className='flex justify-center mt-14'>
                  <Link
                    href='/student/period/subject?name=Mathematics'
                    className='bg-[#A4C9B8] font-medium text-white px-2 py-1 rounded-2xl'
                  >
                    Period Ended
                  </Link>
                </div>
              </div>

              <div className='h-[250px] w-full border-[#3361FF] border rounded-lg bg-[#F2F5FF] p-[10px]'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-base'>English</h1>
                    <p className='text-[#808080] text-[10px] '>
                      07:00 AM - 08:30 am
                    </p>
                  </div>
                  <div>
                    <Books className='h-8 w-8 ' />
                  </div>
                </div>
                <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                <p className='text-[#808080] text-[10px] '>
                  Introduction to Prime Numbers
                </p>
                <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                  <Teacher className='h-8 w-8 ' /> <p> Babafemi Akanni</p>{' '}
                </div>

                <div className='flex justify-center mt-14'>
                  <Link
                    href='/student/period/subject?name=English'
                    className='bg-[#3361FF] font-medium text-white px-2 py-1 rounded-2xl'
                  >
                    Go to Period
                  </Link>
                </div>
              </div>

              <div className='h-[250px] w-full border-[#F8E3CB] border rounded-lg bg-[#FFFCF8] p-[10px]'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-base'>English</h1>
                    <p className='text-[#808080] text-[10px] '>
                      07:00 AM - 08:30 am
                    </p>
                  </div>
                  <div>
                    <Tick className='h-8 w-8 ' />
                  </div>
                </div>
                <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                <p className='text-[#808080] text-[10px] '>
                  Introduction to Prime Numbers
                </p>
                <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                  <Teacher className='h-8 w-8 ' /> <p> Babafemi Akanni</p>{' '}
                </div>

                <div className='flex justify-center mt-14'>
                  <button className='bg-[#D9D9D9] font-medium text-white px-2 py-1 rounded-2xl'>
                    Go to Period
                  </button>
                </div>
              </div>

              <div className='h-[250px] w-full border-[#F8E3CB] border rounded-lg bg-[#FFFCF8] p-[10px]'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-base'>English</h1>
                    <p className='text-[#808080] text-[10px] '>
                      07:00 AM - 08:30 am
                    </p>
                  </div>
                  <div>
                    <Alarm className='h-8 w-8 ' />
                  </div>
                </div>
                <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                <p className='text-[#808080] text-[10px] '>
                  Introduction to Prime Numbers
                </p>
                <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                  <Teacher className='h-8 w-8 ' /> <p> Babafemi Akanni</p>{' '}
                </div>

                <div className='flex justify-center mt-14'>
                  <button className='bg-[#D9D9D9] font-medium text-white px-2 py-1 rounded-2xl'>
                    Go to Period
                  </button>
                </div>
              </div>

              <div className='h-[250px] w-full border-[#F8E3CB] border rounded-lg bg-[#FFFCF8] p-[10px]'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-base'>English</h1>
                    <p className='text-[#808080] text-[10px] '>
                      07:00 AM - 08:30 am
                    </p>
                  </div>
                  <div>
                    <Alarm className='h-8 w-8 ' />
                  </div>
                </div>
                <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                <p className='text-[#808080] text-[10px] '>
                  Introduction to Prime Numbers
                </p>
                <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                  <Teacher className='h-8 w-8 ' /> <p> Babafemi Akanni</p>{' '}
                </div>

                <div className='flex justify-center mt-14'>
                  <button className='bg-[#D9D9D9] font-medium text-white px-2 py-1 rounded-2xl'>
                    Go to Period
                  </button>
                </div>
              </div>

              <div className='h-[250px] w-full border-[#F8E3CB] border rounded-lg bg-[#FFFCF8] p-[10px]'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-base'>English</h1>
                    <p className='text-[#808080] text-[10px] '>
                      07:00 AM - 08:30 am
                    </p>
                  </div>
                  <div>
                    <Alarm className='h-8 w-8 ' />
                  </div>
                </div>
                <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                <p className='text-[#808080] text-[10px] '>
                  Introduction to Prime Numbers
                </p>
                <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                  <Teacher className='h-8 w-8 ' /> <p> Babafemi Akanni</p>{' '}
                </div>

                <div className='flex justify-center mt-14'>
                  <button className='bg-[#D9D9D9] font-medium text-white px-2 py-1 rounded-2xl'>
                    Go to Period
                  </button>
                </div>
              </div>
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