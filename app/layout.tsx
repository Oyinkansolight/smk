'use client';

import 'react-circular-progressbar/dist/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useBattery } from "@uidotdev/usehooks";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toggle/style.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import '/src/styles/globals.css';
import { useEffect } from 'react';
import logger from '@/lib/logger';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: loadingBatteryCheck, level: batteryLevel, charging } =
    useBattery();

  useEffect(() => {
    if (!loadingBatteryCheck) {
      const currentBattery = batteryLevel * 100;
      if (currentBattery <= 10 && !charging) {
        logger(`Battery is low and currently ${currentBattery}%`)
      }

      if (currentBattery > 10) {
        logger(`Battery is currently ${currentBattery}%`)
      }
    }
  }, [batteryLevel, charging, loadingBatteryCheck])


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
