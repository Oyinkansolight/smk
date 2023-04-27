import Link from 'next/link';
import React from 'react';
import Notificationarrow from '~/svg/notificationarrow.svg';

const Notification = ({ link }: { link: string }) => {
  return (
    <div className='notification  max-h-[400px] overflow-y-auto'>
      <div className='header pb-2 pt-6 border-b-2 mb-4 px-6'>
        <h1 className='text-[#016938] font-medium text-base '>Notification</h1>
      </div>
      {[1, 2, 3, 4, 5, 6, 7].map((item, idx) => (
        <div
          className='px-6 py-3 mb-6 space-y-2 group hover:bg-[#EDF3FE]'
          key={idx}
        >
          <h2 className='text-xs font-medium text-gray-600 group-hover:text-[#016938]'>
            School Creation
          </h2>
          <p className='text-[10px] text-[#848689]'>
            Avril Primary has created an account
          </p>
          <p className='text-[10px] text-[#67A588] group-hover:text-[#1EC572]'>
            2 hours ago
          </p>
        </div>
      ))}
      <div className='flex justify-end p-2'>
        <Link href={link}>
          <div className='text-[#1EC572] text-sm flex space-x-2 items-center'>
            <span>View all</span> <Notificationarrow className='h-3' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Notification;
