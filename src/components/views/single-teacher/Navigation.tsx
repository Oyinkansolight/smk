'use client';

import Image from 'next/image';
import Link from 'next/link';


const ActionNavigation = ({ navigation_menu }) => {
  return (
    <div className='rounded-xl bg-white shadow my-4'>
      <div className='border-b p-4'>
        <p className='text-base font-medium'>Choose an action</p>
      </div>
      <div className='grid md:grid-cols-2 gap-4 p-4 '>
        {navigation_menu.map((item) => {
          return (
            <div key={item.title} className='nav_box bg-[#F9F9FB] rounded-lg border flex flex-col items-center justify-center space-y-3 p-3'>
              <Image
                src={item.icon}
                height={24}
                width={24}
                alt='calendar_new'
                className=''
              />
              <p className='text-[#8C8D99] text-xl'>{item.title}</p>
              <Link href={item.link} className='text-[#5754F7] font-sm'>
                Click to view details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionNavigation;
