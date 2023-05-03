'use client';

import { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import User1 from '~/svg/user1.svg';

const Page = () => {
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

  const [eccede, seteccede] = useState(mockData);
  return (
    <div className='h-full px-12'>
      <div className='cursor-pointer flex items-center'>
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Back</div>
      </div>
      <div className='text-3xl font-bold py-8'>
        Account Details Change History
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1'>
        <div className='table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-6'>Administrator</div>
          <div className='col-span-6'>Timestamp</div>
        </div>
        {eccede.map((item, idx) => (
          <div
            className='grid grid-cols-12 gap-4 border-b items-center  text-[#8898AA] p-3 px-1'
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

        <div className='my-4 flex items-center justify-end space-x-3 pr-10'>
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
    </div>
  );
};

export default Page;