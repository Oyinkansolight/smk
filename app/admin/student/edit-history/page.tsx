'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import User1 from '~/svg/user1.svg';

export default function Page() {
  const mockData = [
    {
      logo: 1,
      name: 'Avril Price School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 2,
      name: 'Scaling Heights School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 3,
      name: 'Black Dash School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 4,
      name: 'Reaction Primary ',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
    {
      logo: 5,
      name: 'Victory International  School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
    },
  ];

  const [eccede] = useState(mockData);
  return (
    <div className='h-full px-12'>
      <Link href='/admin/student' className='cursor-pointer flex items-center'>
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </Link>
      <div className='text-3xl font-bold py-8'>
        Account Details Change History
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-6'>Administrator</div>
          <div className='col-span-6'>Timestamp</div>
        </div>
        {eccede.map((item, idx) => (
          <div
            className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 bg-white py-4 px-1 font-semibold'
            key={idx}
          >
            <div className='col-span-6 flex items-center gap-4'>
              <User1 className='h-12 w-12' /> <div>James Omokwe</div>{' '}
            </div>
            <div className='col-span-6 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              03/03/12 22:43
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}
