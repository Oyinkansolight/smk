import * as React from 'react';
import { GoBell, GoThreeBars } from 'react-icons/go';

import { BasicSearch } from '@/components/search';

import Avatar from '~/svg/avatar.svg';
import Badge from '~/svg/badge_1.svg';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 border-b-2 bg-[#F7F8FA]'>
      <div className='mx-auto flex h-20 w-[95%] items-center justify-between'>
        <div className='flex flex-row gap-28'>
          <div className='flex flex-row items-center gap-9'>
            <div className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'>
              <GoThreeBars className='fill-current text-[#C3CAD9]' />
            </div>

            <div className='flex h-[55px] w-[55px] items-center justify-center rounded-full border'>
              <Badge className='h-[46px] w-[46px]' />
            </div>
          </div>

          <BasicSearch />
        </div>
        <nav>
          <div className='flex flex-row items-center gap-[27px] '>
            <div className='flex flex-row items-center gap-[18px]'>
              <Avatar />

              <div className='flex flex-col'>
                <div>Santos Igbhosa</div>
                <div className='text-[#C3CAD9]'>Admin</div>
              </div>
            </div>

            <div className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'>
              <GoBell className='fill-current text-[#C3CAD9]' />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
