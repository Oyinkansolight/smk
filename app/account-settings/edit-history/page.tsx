'use client';

import { MdArrowBackIos } from 'react-icons/md';

const Page = () => {
  return (
    <div className='h-full px-12'>
      <div className='cursor-pointer flex items-center'>
        <MdArrowBackIos className='text-[#42BBFF]' />
        <div>Dashboard</div>
      </div>
      <div className='text-3xl font-bold py-8'>Manage Access Roles</div>
      <div className='flex h-full'></div>
    </div>
  );
};

export default Page;
