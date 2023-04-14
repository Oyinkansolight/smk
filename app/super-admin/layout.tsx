'use client';

import AdminHeader from '@/components/layout/AdminHeader';
import AdminRightSidebar from '@/components/layout/AdminRightSidebar';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { usePathname } from 'next/navigation';
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

  return (
    <html>
      <head />
      <div className='flex h-screen min-h-screen flex-col bg-[#F7F8FA]'>
        <AdminHeader />

        <div className='flex flex-1 flex-row overflow-y-hidden'>
          <main className='hideScroll flex-1 overflow-y-auto p-2 text-xs'>
            <div>{children}</div>
          </main>

          <AdminSidebar />
          {routeDetails === '/super-admin' && <AdminRightSidebar />}
        </div>
      </div>
    </html>
  );
}
