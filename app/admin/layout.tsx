'use client';

import Header from '@/components/layout/Header';
import InstituteSidebar from '@/components/layout/InstituteSidebar';
import { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import '/src/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const routeDetails = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='flex h-screen min-h-screen flex-col bg-[#F7F8FA]'>
        <Header />

        <div className='flex flex-1 flex-row'>
          <main className='hideScroll flex-1 overflow-y-auto p-2 text-xs h-[100vh]'>
            <div className='ml-20'>{children}</div>
          </main>

          <InstituteSidebar setOpen={setOpen} open={open} />
          {open && (
            <div
              className='z-[4] inset-0 fixed'
              onClick={() => {
                setOpen(false);
              }}
            ></div>
          )}
          {/* {routeDetails === '/admin' && <RightSidebar />} */}
        </div>
      </div>
    </>
  );
}
