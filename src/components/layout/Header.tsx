import Pill from '@/components/buttons/Pill';
import { getURL } from '@/firebase/init';
import clsxm from '@/lib/clsxm';
import { useGetProfile } from '@/server/auth';
import Image from 'next/image';
import * as React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoBell } from 'react-icons/go';
import Avatar from '~/svg/avatar.svg';

import AdminNotification from './AdminNotification';

interface HeaderProps {
  handleToggle?: () => void;
}

export default function Header({ handleToggle }: HeaderProps) {
  const [isOpen, setisOpen] = React.useState(false);
  const { data } = useGetProfile();
  const [url, setUrl] = React.useState(
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
    <header className='sticky top-0 z-50 border-b-2 bg-[#F7F8FA]'>
      <div className='mx-auto flex h-20 items-center justify-between px-4'>
        <div>
          {' '}
          {handleToggle && (
            <div
              onClick={handleToggle}
              className={clsxm(
                'flex w-12 justify-center cursor-pointer bg-secondary-50 bg-opacity-30 p-4 rounded-full my-12'
              )}
            >
              <GiHamburgerMenu />
            </div>
          )}
        </div>

        {/* <div className='flex w-full flex-row gap-28 ml-20'>
          <BasicSearch />
        </div> */}
        <nav>
          <div className='flex flex-row items-center gap-[27px] px-10'>
            <div className='flex flex-row items-center gap-[18px]'>
              {url ? (
                <Image
                  width={64}
                  height={64}
                  alt='Profile Picture'
                  className='rounded-full'
                  src={url}
                />
              ) : (
                <Avatar className='h-10 w-10' />
              )}

              <div className='flex flex-col gap-2'>
                <div className='whitespace-nowrap uppercase text-xs font-bold text-[#6B7A99]'>
                  {data?.userInfo?.email
                    ? data?.userInfo?.email?.split('@')[0]
                    : data?.userInfo?.firstName}
                </div>
                <Pill
                  text={data?.userInfo?.type ?? 'User Role'}
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
