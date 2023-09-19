'use client';

import { useState } from 'react';
import { BiUser } from 'react-icons/bi';

export default function Page() {
  const mockData = [
    {
      logo: 1,
      name: 'Avril Price School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
      mode: 'Profile Changes',
    },
    {
      logo: 2,
      name: 'Scaling Heights School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
      mode: 'Subject Created',
    },
    {
      logo: 3,
      name: 'Black Dash School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
      mode: 'Academic Session Created, Academic Calendar created, Class/Lecture Timetable created',
    },
    {
      logo: 4,
      name: 'Reaction Primary ',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
      mode: 'Academic Session Created, Academic Calendar created, Class/Lecture Timetable created',
    },
    {
      logo: 5,
      name: 'Victory International  School',
      numberOfStudent: '12,500',
      type: 'Primary',
      staff: '',
      location: 'Benin',
      mode: 'Academic Session Created, Academic Calendar created, Class/Lecture Timetable created',
    },
  ];

  const [eccede] = useState(mockData);
  return (
    <div className='h-full '>
      <div className='table-add-student mt-5 pb-4 pt-1 overflow-x-auto w-full'>
        <div className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-3'>Timestamp</div>
          <div className='col-span-3'>Administrator</div>
          <div className='col-span-6'>Changes Made</div>
        </div>
        {eccede.map((item, idx) => (
          <div
            className=' min-w-[800px] table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 bg-white  px-1 font-semibold'
            key={idx}
          >
            <div className='col-span-3 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              03/03/12 22:43
            </div>
            <div className='col-span-3 flex items-center gap-4'>
              <BiUser className='h-12 w-12' /> <div>James Omokwe</div>{' '}
            </div>
            <div className='col-span-6 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              {item.mode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
