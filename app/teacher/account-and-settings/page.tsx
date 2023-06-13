'use client';

import { BigAvatar } from '@/components/profile/BigAvatar';

const profileDetails = [
  { title: 'Full Name', value: 'SANTOS IGBOSA' },
  { title: 'Gender', value: 'Male' },
  { title: 'Staff Id Number', value: 'PRI-1224' },
  { title: 'Marital Status', value: 'Single' },
  { title: 'Date of Birth', value: '10-OCT-2008' },
  { title: 'Nationality', value: 'Nigerian' },
  { title: 'Religion', value: 'CHRISTIANITY' },
];

const contactDetails = [
  { title: 'Email', value: 'santosigbhosa5$@gmail.com' },
  { title: 'Address', value: '90, Wuraola House, Allen, Lagos State' },
  { title: 'Phone Number', value: '09020022002' },
];

export default function Page() {
  return (
    <div className='layout flex flex-col gap-8 my-5'>
      <div className='text-2xl font-bold'>Account And Settings</div>
      <BigAvatar src='/images/teacher_1.png' />
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='font-bold text-xl'>Staff Profile Details</div>
          <div className='text-blue-500 cursor-pointer'>Request Edit</div>
        </div>
        <div className='h-px bg-gray-300' />
        <div className='p-8 bg-white rounded-lg grid gap-5 grid-cols-3'>
          {profileDetails.map((v, i) => (
            <div key={i}>
              <div className='text-[#B1B1B1]'>{v.title}</div>
              <div className='text-lg'>{v.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='font-bold text-xl'>Staff Contact Details</div>
          <div className='text-blue-500 cursor-pointer'>Request Edit</div>
        </div>
        <div className='h-px bg-gray-300' />
        <div className='p-8 bg-white rounded-lg grid gap-5 grid-cols-3'>
          {contactDetails.map((v, i) => (
            <div key={i}>
              <div className='text-[#B1B1B1]'>{v.title}</div>
              <div className='text-lg'>{v.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
