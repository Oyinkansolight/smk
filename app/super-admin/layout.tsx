/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import AdminHeader from '@/components/layout/AdminHeader';
import AdminSidebar from '@/components/layout/AdminSidebar';
import ControlledModal from '@/components/modal/ControlledModal';
import { MyGlobalContext } from '@/hooks/useGlobalState';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { AiOutlineClose } from 'react-icons/ai';
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
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [maxLoadingCount, setMaxLoadingCount] = useState(0);

  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    //* Used to Close Sidebar when navigating to another route.
    setOpen(false);
  }, [routeDetails]);

  return (
    <>
      <div className='flex h-screen min-h-screen flex-col bg-[#EFF3F7]'>
        <MyGlobalContext.Provider
          value={{
            isDataLoading,
            setIsDataLoading,
            loadingCount,
            setLoadingCount,
            maxLoadingCount,
            setMaxLoadingCount,
          }}
        >
          <AdminHeader handleToggle={handleToggle} />
          {isDataLoading && (
            <div className='h-1.5 w-full bg-blue-100 overflow-hidden'>
              <div className='progress w-full h-full bb-[#007AFF] left-right' />
            </div>
          )}
          <div className='flex flex-1 flex-row overflow-y-hidden h-[100vh]'>
            <div className='hideScroll flex-1 overflow-y-auto p-2 text-xs'>
              <div className='layout'>{children}</div>
            </div>

            {/* <AdminSidebar open={open} handleToggle={handleToggle} /> */}
            {/* {routeDetails === '/super-admin' && <AdminRightSidebar />} */}
            {/* <div>{children}</div>
          </div> */}
          </div>

          <ControlledModal
            isOpen={open}
            closeIcon={false}
            toggleModal={handleToggle}
            className='w-screen h-[95vh] !overflow-y-auto px-14 py-12 lg:py-6'
            content={
              <div className='relative'>
                <div
                  onClick={handleToggle}
                  className='flex flex-row items-center gap-1 text-[#808080] absolute -top-10 right-2 md:right-10 lg:right-[30%] cursor-pointer'
                >
                  Close
                  <AiOutlineClose className='fill-current' />
                </div>
                <AdminSidebar open={open} handleToggle={handleToggle} />
              </div>
            }
          />
        </MyGlobalContext.Provider>
      </div>
    </>
  );
}
