'use client';

import NewHeader from '@/components/layout/NewHeader';
import dynamic from 'next/dynamic';
const NewStudentSidebar = dynamic(
  () => import('@/components/layout/NewStudentSideBar'),
  { ssr: false }
);
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
      <div className='flex h-screen min-h-screen flex-col'>
        <NewHeader />
        <div className='flex flex-1 flex-row overflow-y-hidden'>
          <NewStudentSidebar />
          <main className='hideScroll flex-1 overflow-y-auto p-2 text-xs h-[100vh]'>
            <div className='ml-20'>{children}</div>
          </main>
        </div>
      </div>
    </html>
  );
}
