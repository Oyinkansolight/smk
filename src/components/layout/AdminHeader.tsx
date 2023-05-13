import Pill from '@/components/buttons/Pill';
import { BasicSearch } from '@/components/search';
import Image from 'next/image';
import * as React from 'react';
import { GoBell } from 'react-icons/go';

import AdminNotification from './AdminNotification';

export default function AdminHeader() {
  const [isOpen, setisOpen] = React.useState(false);
  return (
    <header className='sticky top-0 z-50 border-b-2 bg-[#F7F8FA]'>
      <div className='mx-auto flex h-20 items-center justify-between px-4'>
        <div className='flex w-full flex-row gap-28'>
          <div className='flex flex-row items-center gap-9'>
            <Image
              width={154}
              height={53}
              src='/images/edo_logo.png'
              alt=''
              className='hidden lg:block'
            />

            <div className='flex flex-row items-center justify-center gap-[15px]'>
              <Image width={40} height={40} src='/images/governor.png' alt='' />

              <div className='flex flex-col gap-2'>
                <div className='whitespace-nowrap text-xs font-bold text-[#333333]'>
                  Godwin Nogheghase Obaseki
                </div>
                <Pill text='Super Admin' variant='primary' />
              </div>
            </div>
          </div>
        </div>
        <nav className='w-full'>
          <div className='flex flex-row items-center gap-[48px] pr-10 relative'>
            <BasicSearch />

            <button
              onClick={() => setisOpen(true)}
              className='focus:outline-nones relative flex h-[45px] w-[55px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
            >
              <GoBell className='fill-current text-[#C3CAD9]' />
              <div className='absolute -top-2 -right-2 h-[12px] w-[12px] rounded-full bg-[#007AFF]'></div>
            </button>
            {isOpen && (
              <div className='absolute z-10 right-10 top-4'>
                <AdminNotification link='/super-admin/all-notification' />
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
