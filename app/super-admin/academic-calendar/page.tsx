/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AddSession from '@/components/modal/AddSession';
import { BasicSearch } from '@/components/search';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AcadamicCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  function handleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && <AddSession onClickHandler={handleModal} />}
      <Link href='/super-admin'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Dashboard</h3>
        </div>
      </Link>

      <h1 className='mt-5 text-2xl font-bold'>Academic Timetable</h1>
      <h1 className='mt-1 mb-6 text-sm text-[#888888] font-normal'>
        View and edit calendars and timetable
      </h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Sessions Available</p>
          <h1 className='font-semibold text-2xl'>{4}</h1>
        </div>
        <button
          onClick={handleModal}
          className='w-max rounded border border-primary px-6 py-3 text-center text-xs text-primary '
        >
          Add Session
        </button>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          <select name='' className='border-none bg-transparent outline-none'>
            <option value=''>Filter</option>
          </select>
          <BasicSearch
            handleSearch={() => {
              console.log('Test');
            }}
          />
        </div>
      </div>

      <div className='table-add-student bg-white mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className='min-w-[800px] table-header grid grid-cols-5 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='text-center'>Academic Session</div>
          <div className='text-center'>School</div>
          <div className='text-center'>Start Date</div>
          <div className='text-center'>End Date</div>
          <div className='text-center'>Status</div>
        </div>

        {[1, 2, 3, 4, 5].map((x) => (
          <Link
            href='/super-admin/school-calendar'
            className=' min-w-[800px] grid grid-cols-5 gap-4 border-b items-center  text-[#8898AA] p-3 px-1'
            key={x}
          >
            <div className='text-center text-black'>
              Academic Year 2021/2022
            </div>
            <div className='text-center  items-center'>Primary</div>
            <div className='text-center'>23 September, 2021 </div>
            <div className='text-center'> 13 June, 2022 </div>
            <div className=' text-center  items-center'>Completed</div>
          </Link>
        ))}

        <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border bg-[#008146] p-2 text-white'>
            1
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            2
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            3
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcadamicCalendar;
