'use client';

import { BasicSearch } from '@/components/search';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// import Back from '@/'
// import clsxm from '@/lib/clsxm';
import AvrilImage from '~/svg/avril.svg';

const AlltransferRequestStaff = () => {
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

  const [staffs, setstaffs] = useState(mockData);

  const handleSearch = (value: string) => {
    const result = mockData.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
    );
    setstaffs(result);
  };

  return (
    <section className='py-6'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Staff Transfer Request</h1>

      <div className='mb-6 flex justify-end '>
        <Link
          href='/super-admin/transfer-staff'
          className='w-max rounded border border-primary px-6 py-3 text-center text-xs text-primary '
        >
          Transfer Staff
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
          <div className='col-span-3'>Staff Name</div>
          <div className='col-span-3'>Previous School</div>
          <div className='col-span-2'>New School</div>
          <div className='col-span-2'>Performance level</div>
          <div className='col-span-2'>Location</div>
        </div>
        {staffs.map((item, idx) => (
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
      </div>
    </section>
  );
};

export default AlltransferRequestStaff;
