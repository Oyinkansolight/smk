import Pill from '@/components/buttons/Pill';
import { BasicSearch } from '@/components/search';
import { getFromLocalStorage } from '@/lib/helper';
import * as React from 'react';
import { GoBell } from 'react-icons/go';
import Avatar from '~/svg/avatar.svg';

import AdminNotification from './AdminNotification';

export default function Header() {
  const [isOpen, setisOpen] = React.useState(false);
  const userData = getFromLocalStorage('user');
  let user;

  if (userData) {
    user = JSON.parse(userData);
  }

  return (
    <header className='sticky top-0 z-50 border-b-2 bg-[#F7F8FA]'>
      <div className='mx-auto flex h-20 items-center justify-between px-4'>
        <div className='flex w-full flex-row gap-28'>
          <BasicSearch />
        </div>
        <nav>
          <div className='flex flex-row items-center gap-[27px] px-10'>
            <div className='flex flex-row items-center gap-[18px]'>
              <Avatar className='h-10 w-10' />

              <div className='flex flex-col gap-2'>
                <div className='whitespace-nowrap text-xs font-bold text-[#6B7A99]'>
                  {user?.name === 'null null'
                    ? user?.email.split('@')[0]
                    : user?.name}
                </div>
                <Pill text={user?.role ?? 'User Role'} variant='primary' />
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
                <AdminNotification link='/admin/all-notification' />
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
