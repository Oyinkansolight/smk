import Image from 'next/image';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body className='flex h-screen max-h-screen flex-col overflow-hidden'>
        <header className='flex h-[158px] flex-row items-center gap-x-[109px] bg-[#E8FFF7] px-16 text-3xl font-bold md:text-5xl'>
          <Image
            width={154}
            height={53}
            className=''
            src='/images/edo_logo.png'
            alt=''
          />
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
