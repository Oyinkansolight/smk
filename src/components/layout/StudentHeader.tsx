import Pill from '@/components/buttons/Pill';
import { BasicSearch } from '@/components/search';
import { getFromLocalStorage } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import { userAgent } from 'next/server';
import * as React from 'react';
import { GoBell, GoThreeBars } from 'react-icons/go';
import Avatar from '~/svg/avatar.svg';
import Badge from '~/svg/eca.svg';

import AdminNotification from './AdminNotification';

interface StudentHeaderProps {
  toggleSidebar: () => void;
}

export default function StudentHeader({ toggleSidebar }: StudentHeaderProps) {
  const [isOpen, setisOpen] = React.useState(false);
  const { data, error, isLoading } = useGetProfile();

  return (
    <header className='sticky top-0 z-50 border-b-2 bg-white'>
      <div className='mx-auto flex h-20 items-center justify-between px-4'>
        <div className='flex w-full flex-row gap-28'>
          <div className='flex flex-row items-center gap-9'>
            <div
              onClick={toggleSidebar}
              className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
            >
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
                  {data?.email ? data?.email.split('@')[0] : data?.firstName}
                </div>
                <Pill
                  text={
                    data?.email
                      ? data?.email.split('@')[0]
                      : data?.firstName ?? '[NULL]'
                  }
                  variant='primary'
                />
              </div>
            </div>

            <button
              onClick={() => setisOpen(true)}
              className='focus:outline-nones relative flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
            >
              <GoBell className='fill-current text-[#C3CAD9]' />
              <div className='absolute -top-2 -right-2 h-[12px] w-[12px] rounded-full bg-[#E62E7B]'></div>
            </button>
            {isOpen && (
              <div className='absolute z-10 right-10 top-4'>
                <AdminNotification link='/student/all-notification' />
              </div>
            )}
            {isOpen && (
              <div
                className='bg-transparent fixed inset-0 z-[1]'
                onClick={() => setisOpen(false)}
              ></div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}