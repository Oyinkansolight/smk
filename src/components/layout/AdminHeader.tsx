import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import { useGetProfile } from '@/server/auth';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoBell } from 'react-icons/go';

import AdminNotification from './AdminNotification';

interface AdminHeaderProps {
  handleToggle: () => void;
}

export default function AdminHeader({ handleToggle }: AdminHeaderProps) {
  const { data } = useGetProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(
    'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
  );
  React.useEffect(() => {
    const getFileURL = async (path) => {
      let result = '';
      await getURL(path).then((v) => {
        result = v;
        setUrl(v);
      });
      return result;
    };
    getFileURL(data?.userInfo?.profileImg);
  }, [data?.userInfo?.profileImg]);

  return (
    <header className='sticky top-0 z-50 border-b-2 bg-white'>
      <div className='layout mx-auto flex py-7 min-h-[5rem] h-auto items-center lg:justify-between'>
        <div className='flex w-full flex-row gap-28'>
          <div className='flex flex-row items-center gap-9'>
            <div
              onClick={handleToggle}
              className={clsxm(
                'flex w-16 h-16 justify-center items-center cursor-pointer bg-[#5754F7] p-4 rounded-full'
              )}
            >
              <GiHamburgerMenu className='fill-current text-[#C3CAD9]' />
            </div>
            {/* {isGenericApp === 'Y' && (
              <div className='hidden lg:block w-[54px] h-4' />
            )}

            {isGenericApp === 'N' && (
              <Image
                width={154}
                height={53}
                className='block'
                alt={APP_LOGOS.APP_LOGO.alt}
                src={APP_LOGOS.APP_LOGO.asset}
              />
            )} */}

            {/* <div className='flex flex-row items-center justify-center gap-[15px]'>
              <Image
                width={40}
                height={40}
                alt='Profile Picture'
                src={
                  (data?.userInfo?.firstName ?? '') ===
                  ('Godwin Nogheghase Obaseki' as string)
                    ? '/images/governor.png'
                    : '/images/avatar.png'
                }
              />

              <div className='flex flex-col gap-2'>
                <div className='whitespace-nowrap text-xs font-bold text-[#333333]'>
                  {data?.userInfo?.email
                    ? data?.userInfo?.email.split('@')[0]
                    : data?.userInfo?.firstName}
                </div>
                <Pill
                  text={data?.userInfo?.type ?? 'User Role'}
                  variant='primary'
                />
              </div>
            </div> */}
          </div>
        </div>
        <nav className='w-full'>
          <div className='flex flex-row items-center justify-end gap-3'>
            <button
              onClick={() => setIsOpen(true)}
              className='focus:outline-none relative flex w-16 h-16 items-center justify-center rounded-full bg-[#F4F6FF] shadow-sm transition-colors duration-200 hover:bg-gray-200'
            >
              <GoBell className='fill-current text-[#5754F7] h-10 w-10' />
              <div className='absolute -top-2 -right-2 h-[12px] w-[12px] rounded-full bg-[#5754F7]'></div>
            </button>

            <Image
              width={64}
              height={64}
              alt='Profile Picture'
              className='rounded-full'
              src={url}
            />
          </div>

          {isOpen && (
            <div className='absolute z-10 right-10 top-4'>
              <AdminNotification link='/super-admin/all-notification' />
            </div>
          )}
          {isOpen && (
            <div
              className='bg-transparent fixed inset-0 z-[1]'
              onClick={() => setIsOpen(false)}
            ></div>
          )}
        </nav>
      </div>
    </header>
  );
}
