'use client';

import AdminHeader from '@/components/layout/AdminHeader';
import AdminSidebar from '@/components/layout/AdminSidebar';
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

  useEffect(() => {
    //* Used to Close Sidebar when navigating to another route.
    setOpen(false);
  }, [routeDetails])


  return (
    <html>
      <head />
      <body className='flex h-screen min-h-screen flex-col bg-[#F7F8FA]'>
        <AdminHeader />

        <div className='flex flex-1 flex-row overflow-y-hidden'>
          <div className='hideScroll flex-1 overflow-y-auto p-2 text-xs'>
            <div className='ml-20'>{children}</div>
          </div>

          <AdminSidebar open={open} handleToggle={handleToggle} />
          {/* {routeDetails === '/super-admin' && <AdminRightSidebar />} */}
        </div>
      </body>
    </html>
  );
}
