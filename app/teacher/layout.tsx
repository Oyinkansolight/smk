'use client';

import { BasicCard } from '@/components/cards';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ClockInTime from '@/components/views/teacher/ClockInTime';
import 'react-circular-progressbar/dist/styles.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import '/src/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className='flex h-screen min-h-screen flex-row bg-[#F7F8FA] relative'>
        <Sidebar />

        <div className='flex flex-1 flex-col overflow-y-hidden'>
          <Header />

          <main className='hideScroll flex-1 overflow-y-auto text-xs'>
            <BasicCard className='flex w-full flex-col gap-8 !rounded-[4.5px] bg-white !px-[27px] !pb-[27px] !pt-[18px]'>
              <div className='flex w-full justify-end'>
                <ClockInTime />
              </div>
            </BasicCard>
            <div>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}