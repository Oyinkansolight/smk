import { APP_LOGOS } from '@/constant/assets';
import Cookies from 'js-cookie';
import Image from 'next/image';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isGenericApp = Cookies.get('isGenericApp');
  return (
    <html>
      <head />
      <body className='flex h-screen max-h-screen flex-col overflow-hidden'>
        <header className='flex h-[158px] flex-row items-center gap-x-[109px] bg-[#E8FFF7] px-16 text-3xl font-bold md:text-5xl'>
          {isGenericApp === 'N' && (
            <Image
              width={154}
              height={53}
              className=''
              alt={APP_LOGOS.APP_LOGO.alt}
              src={APP_LOGOS.APP_LOGO.asset}
            />
          )}
          Set up Account
        </header>

        <div className='mx-11 mt-[22px] h-full overflow-hidden rounded-lg border-x border-[#E5E5E5] px-5 py-8'>
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
