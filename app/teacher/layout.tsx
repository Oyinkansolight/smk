'use client';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
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
      <body className='flex h-screen min-h-screen flex-row bg-[#F7F8FA]'>
        <Sidebar />

        <div className='flex flex-1 flex-col overflow-y-hidden'>
          <Header />

          <main className='hideScroll flex-1 overflow-y-auto text-xs'>
            <div>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
