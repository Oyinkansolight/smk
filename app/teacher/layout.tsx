'use client';

import '/src/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-circular-progressbar/dist/styles.css';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        </div>
      </div>
    </html>
  );
}
