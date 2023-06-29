'use client';

import StudentHeader from '@/components/layout/StudentHeader';
import StudentSidebar from '@/components/layout/StudentSidebar';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <html className='w-full h-full'>
      <head />
      <body className='flex h-screen min-h-screen w-screen flex-col bg-white'>
        <StudentHeader toggleSidebar={toggleSidebar} />

        <div className='flex flex-1 flex-row overflow-y-hidden'>
          <main className='hideScroll flex-1 overflow-y-auto p-2 px-12 pb-10 text-xs'>
            <div className='w-full h-full'>{children}</div>
          </main>

          <StudentSidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </body>
    </html>
  );
}
