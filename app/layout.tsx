import '/src/styles/globals.css';

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
          <main className='flex-1 overflow-y-auto p-2 text-xs'>
            <div>{children}</div>
          </main>

          <Sidebar />

          <aside className='w-24 bg-indigo-50 p-2 sm:w-32'>
            <ul className='text-xs underline'>
              <li>
                <a
                  href='/ui/avatar'
                  className='block rounded py-2 px-2 hover:bg-indigo-50'
                >
                  Avatar
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </html>
  );
}
