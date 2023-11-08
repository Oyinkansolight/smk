'use client';

import logger from '@/lib/logger';
import request from '@/server';
// Import the styles provided by the react-pdf-viewer packages
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useBattery } from '@uidotdev/usehooks';
import Cookies from 'js-cookie';
import { isNumber } from 'lodash';
import { useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toggle/style.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import '/src/styles/globals.css';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    loading: loadingBatteryCheck,
    level: batteryLevel,
    charging,
  } = useBattery();

  // const { data: isValidDevice } = useGetValidIMEI();
  // console.log(isValidDevice);

  const isValidDevice = true;
  useEffect(() => {
    if (!loadingBatteryCheck && isNumber(batteryLevel)) {
      const currentBattery = batteryLevel * 100;
      if (currentBattery <= 20 && !charging) {
        request.put(
          '/v1/utilities/update-batery-level',
          { battryLevel: currentBattery },
          {
            withCredentials: true,
          }
        ),
          logger(`Battery is low and currently ${currentBattery}%`);
      }

      if (currentBattery > 20) {
        logger(`Battery is currently ${currentBattery}%`);
      }
    }
  }, [batteryLevel, charging, loadingBatteryCheck]);

  // Set App to be generic and not tied to any company/institution
  Cookies.set('isGenericApp', 'N');

  if (isValidDevice) {
    return (
      <html>
        <head />
        <body>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
          <ToastContainer />
        </body>
      </html>
    );
  }

  // else {
  //   return (
  //     <div className='flex flex-col justify-center items-center h-screen'>
  //       <div className='text-2xl font-bold text-[#6B7A99]'>
  //         This device is not authorized to use this app.
  //       </div>
  //     </div>
  //   );
  // }
}
