import * as React from 'react';
import { GoBell, GoThreeBars } from 'react-icons/go';

import Pill from '@/components/buttons/Pill';
import { BasicSearch } from '@/components/search';

import Avatar from '~/svg/avatar.svg';
import Badge from '~/svg/eca.svg';

export default function StudentHeader() {
  return (
    <header className='sticky top-0 z-50 border-b-2 bg-white'>
      <div className='mx-auto flex h-20 items-center justify-between px-4'>
        <div className='flex w-full flex-row gap-28'>
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
          <div className='flex flex-row items-center gap-[27px] px-10'>
            <div className='flex flex-row items-center gap-[18px]'>
              <Avatar className='h-10 w-10' />

              <div className='flex flex-col gap-2'>
                <div className='whitespace-nowrap text-xs font-bold text-[#6B7A99]'>
                  Santos Igbhosa
                </div>
                <Pill text='Student' variant='primary' />
              </div>
            </div>

            <div className='focus:outline-nones relative flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'>
              <GoBell className='fill-current text-[#C3CAD9]' />
              <div className='absolute -top-2 -right-2 h-[12px] w-[12px] rounded-full bg-[#E62E7B]'></div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}