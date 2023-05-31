'use client';

import { BasicSearch } from '@/components/search';
import ROUTES from '@/constant/routes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// import Back from '@/'
// import clsxm from '@/lib/clsxm';

const AllClasses = () => {
  const mockData = [
    {
      id: 2458,
      name: '1A',
      grade: 'Primary',
    },
    {
      id: 3468,
      name: '2B',
      grade: 'ECCDE',
    },
    {
      id: 2458,
      name: '1A',
      grade: 'Secondary',
    },
    {
      id: 2458,
      name: '2A',
      grade: 'Tertiary',
    },
    {
      id: 1659,
      name: '1A',
      grade: 'Primary',
    },
    {
      id: 2458,
      name: '1A',
      grade: 'Secondary',
    },
    {
      id: 2458,
      name: '1A',
      grade: 'Primary',
    },
  ];

  const [staffs, setstaffs] = useState(mockData);

  const handleSearch = (value: string) => {
    const result = mockData.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
    );
    setstaffs(result);
  };

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <Link href={ROUTES.ADMIN}>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Classes</h1>

      <div className='mb-6 flex justify-end space-x-4 items-end'>
        <Link
          href='/admin/add-class'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Download Report
        </Link>
        <Link
          href='/admin/add-class'
          className='w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '
        >
          Add Class
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
          <div className='col-span-3'>Number</div>
          <div className='col-span-3'>Name</div>
          <div className='col-span-6'>Grade</div>
        </div>
        {staffs.map((item, idx) => (
          <div
            className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'
            key={idx}
          >
            <div className='col-span-3'>#{item.id} </div>
            <div className='col-span-3'>{item.name} </div>
            <div className='col-span-6'>{item.grade} </div>
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

export default AllClasses;
