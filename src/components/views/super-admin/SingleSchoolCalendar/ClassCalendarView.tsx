/* eslint-disable @typescript-eslint/no-explicit-any */
import NextImage from '@/components/NextImage';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentDashboardView() {
  const params = useSearchParams();
  const [currentPath, setCurrentPath] = useState<any>(params);

  useEffect(() => {
    setCurrentPath(params);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='-mt-[10px] flex flex-row items-center justify-between'>
        <div className='text-[#6B7A99] font-bold text-xl'> Primary School</div>
        <div className='flex flex-row gap-x-7'>
          <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
            <option value='Manage Widgets'>Filter</option>
          </select>

          <Button
            variant='outline'
            className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
          >
            Download Report
          </Button>
        </div>
      </div>

      <div className='bg-white rounded-md grid grid-cols-3 gap-10 px-6 py-10'>
        <div className='bg-[#F8FDFF] rounded pr-10 pl-5 py-4'>
          <div className='flex justify-between items-center'>
            <div className='text-sm'>First Term Calendar</div>
            <div>
              <NextImage
                src='/svg/calendar_mini.svg'
                width={52}
                height={99}
                alt='calendar_mini'
              />
            </div>
          </div>
          <Link
            href={
              '/super-admin/school-calendar-content/' + currentPath + '&term=1'
            }
            className='mt-14 text-primary'
          >
            View
          </Link>
        </div>
        <div className='bg-[#FDF8FF] rounded pr-10 pl-5 py-4'>
          <div className='flex justify-between items-center'>
            <div className='text-sm'>Second Term Calendar</div>
            <div>
              <NextImage
                src='/svg/calendar_mini.svg'
                width={52}
                height={99}
                alt='calendar_mini'
              />
            </div>
          </div>
          <Link
            href={
              '/super-admin/school-calendar-content/' + currentPath + '&term=2'
            }
            className='mt-14 text-primary'
          >
            View
          </Link>
        </div>
        <div className='bg-[#FFFCF8] rounded pr-10 pl-5 py-4'>
          <div className='flex justify-between items-center'>
            <div className='text-sm'>Third Term Calendar</div>
            <div>
              <NextImage
                src='/svg/calendar_mini.svg'
                width={52}
                height={99}
                alt='calendar_mini'
              />
            </div>
          </div>
          <Link
            href={
              '/super-admin/school-calendar-content/' + currentPath + '&term=3'
            }
            className='mt-14 text-primary'
          >
            View
          </Link>
        </div>
      </div>
    </>
  );
}
