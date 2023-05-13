'use client';

import { BasicSearch } from '@/components/search';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// import Back from '@/'
// import clsxm from '@/lib/clsxm';
import AvrilImage from '~/svg/avril.svg';

const AlltransferRequest = () => {
  const mockData = [
    {
      name: 'James Omokwe',
      new_school: 'Tertiary Girls College',
      old_school: 'Scaling Heights School',
      performance: '89%',
      location: 'Benin',
    },
    {
      name: 'James Omokwe',
      new_school: 'Tertiary Girls College',
      old_school: 'Scaling Heights School',
      performance: '89%',
      location: 'Benin',
    },
    {
      name: 'James Omokwe',
      new_school: 'Tertiary Girls College',
      old_school: 'Scaling Heights School',
      performance: '89%',
      location: 'Benin',
    },
    {
      name: 'James Omokwe',
      new_school: 'Tertiary Girls College',
      old_school: 'Scaling Heights School',
      performance: '89%',
      location: 'Benin',
    },
    {
      name: 'James Omokwe',
      new_school: 'Tertiary Girls College',
      old_school: 'Scaling Heights School',
      performance: '89%',
      location: 'Benin',
    },
    {
      name: 'James Omokwe',
      new_school: 'Tertiary Girls College',
      old_school: 'Scaling Heights School',
      performance: '89%',
      location: 'Benin',
    },
  ];

  const [student, setstudent] = useState(mockData);

  const handleSearch = (value: string) => {
    const result = mockData.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
    );
    setstudent(result);
  };

  return (
    <section className='md:px-[60px] px-5 py-6'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Student Transfer Request</h1>

      <div className='mb-6 flex justify-end '>
        <Link
          href='/super-admin/transfer-student'
          className='w-max rounded border border-primary px-6 py-3 text-center text-xs text-primary '
        >
          Transfer Student
        </Link>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          <select name='' className='border-none bg-transparent outline-none'>
            <option value=''>Filter</option>
          </select>
          <BasicSearch handleSearch={handleSearch} />
        </div>
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-3'>Student Name</div>
          <div className='col-span-3'>Previous School</div>
          <div className='col-span-2'>New School</div>
          <div className='col-span-2'>Performance level</div>
          <div className='col-span-2'>Location</div>
        </div>
        {student.map((item, idx) => (
          <div
            className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'
            key={idx}
          >
            <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              <AvrilImage alt='avril' className='h-8 w-8 rounded-full' />
              <Link href='/super-admin/teacher'>
                <h2 className='text-sm font-medium'>{item.name}</h2>
              </Link>{' '}
            </div>
            <div className='col-span-3'>{item.old_school} </div>
            <div className='col-span-2'>{item.new_school} </div>
            <div className='col-span-2 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              <h2 className='text-sm font-medium'>{item.performance}</h2>
            </div>{' '}
            <div className='col-span-2'> {item.location} </div>
          </div>
        ))}

        <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            {' '}
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

export default AlltransferRequest;
