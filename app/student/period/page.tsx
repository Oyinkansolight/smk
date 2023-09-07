/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetTodaysPeriod } from '@/server/student';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner';
import Books from '~/svg/books.svg';
import Teacher from '~/svg/teacher.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

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

  const { isLoading, data } = useGetTodaysPeriod({
    classId: '85dcf853-87fa-4454-bb93-b3d5279cda18',
    day: 'Monday',
    weekid: '5d207bc4-753e-4832-904e-7fe105751508',
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
              {data?.data.map((item: any, i: number) => (
                <div
                  key={i}
                  className='h-[250px] relative w-full border-[#3361FF] border rounded-lg bg-[#F2F5FF] p-[10px]'
                >
                  <div className='flex justify-between items-center'>
                    <div>
                      <h1 className='font-bold text-base'> Subject Name </h1>
                      <p className='text-[#808080] text-[10px] '>
                        {item.startTime} - {item.endTime}
                      </p>
                    </div>
                    <div>
                      <Books className='h-8 w-8 ' />
                    </div>
                  </div>
                  <h1 className='font-bold mt-3 text-sm'>Topic:</h1>
                  <p className='text-[#808080] text-[10px] '>{item.theme}</p>
                  <h1 className='font-bold mt-3 text-sm'>Teacher:</h1>
                  <div className='flex text-[#808080] text-[10px] space-x-2 items-center'>
                    <Teacher className='h-8 w-8 ' /> <p> Babafemi Akanni</p>
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
