import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Company from '~/svg/company.svg';
import Globe from '~/svg/globe.svg';
import Messenger from '~/svg/messenger.svg';
import Star from '~/svg/star.svg';
import Trend from '~/svg/trend_up.svg';

const Sidebar = () => {
  return (
    <aside className='order-first flex h-screen w-20 flex-col items-center overflow-y-auto border-r-2 bg-[#F7F8FA] py-8 rtl:border-l rtl:border-r-0'>
      <nav className='flex flex-1 flex-col space-y-6'>
        <Link href='/dashboard'>
          <Image
            width={45}
            height={45}
            className='w-auto'
            src='/images/compass.png'
            alt=''
          />
        </Link>

        <Link
          href='#'
          className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
        >
          <Star className='#C3CAD9' />
        </Link>

        <Link
          href='#'
          className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
        >
          <Messenger className='#C3CAD9' />
        </Link>

        <Link
          href='#'
          className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
        >
          <Trend className='#C3CAD9' />
        </Link>

        <Link
          href='#'
          className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
        >
          <Trend className='#C3CAD9' />
        </Link>

        <Link
          href='#'
          className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
        >
          <Globe className='#C3CAD9' />
        </Link>

        <Link
          href='#'
          className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
        >
          <Company className='#C3CAD9' />
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
