'use client';

import { BasicCard } from '@/components/cards';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ClockInTime from '@/components/views/teacher/ClockInTime';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import '/src/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routeDetails = usePathname();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  if (open) {
    //auto close sidebar after 5 seconds
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }

  useEffect(() => {
    //* Used to Close Sidebar when navigating to another route.
    setOpen(false);
  }, [routeDetails]);

  return (
    <>
      <div className='flex h-screen min-h-screen flex-row bg-[#F7F8FA] relative'>
        <div className='flex flex-1 flex-col overflow-y-hidden'>
          <Header handleToggle={handleToggle} />

          <div className='flex flex-row overflow-y-auto overflow-hidden min-h-screen'>
            <Sidebar open={open} handleToggle={handleToggle} />
            <main className='hideScroll flex-1 overflow-y-auto text-xs'>
              <BasicCard className='flex w-full flex-col gap-8 !rounded-[4.5px] bg-white !px-[27px] !pb-[27px] !pt-[18px]'>
                <div className='flex w-full justify-end'>
                  <ClockInTime />
                </div>
              </BasicCard>

              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
