'use client';

import Header from '@/components/layout/Header';
import RightSidebar from '@/components/layout/RightSidebar';
import Sidebar from '@/components/layout/Sidebar';
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
        <Header />

        <div className='flex flex-1 flex-row overflow-y-hidden'>
          <main className='hideScroll flex-1 overflow-y-auto p-2 text-xs'>
            <div>{children}</div>
          </main>

          <Sidebar />

          {routeDetails === '/admin' && <RightSidebar />}
        </div>
      </div>
    </html>
  );
}
