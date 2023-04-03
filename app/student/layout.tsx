'use client';

import '/src/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-circular-progressbar/dist/styles.css';

import StudentHeader from '@/components/layout/StudentHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className='flex h-screen min-h-screen flex-col bg-white'>
        <StudentHeader />

        <div className='flex flex-1 flex-row overflow-y-hidden'>
          <main className='hideScroll flex-1 overflow-y-auto p-2 px-12 pb-10 text-xs'>
            <div>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
