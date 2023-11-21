'use client';

import AddSingleSchool from '@/components/modal/addSchool';
import DashboardCounts from '@/components/sections/AdminNew/DashboardCounts';
import { useGlobalContext } from '@/hooks/useGlobalState';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SuperAdminCharts = dynamic(
  () => import('@/components/sections/superAdmin/SuperAdminCharts')
);

const Page = () => {
  const { setIsDataLoading } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleSetOpen = (value: boolean) => setIsOpen(value);

  return (
    <div className='layout flex flex-col gap-y-[27px] pt-6'>
      {isOpen && (
        <AddSingleSchool
          onClickHandler={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}

      <DashboardCounts handleSetOpen={handleSetOpen} />

      <SuperAdminCharts setIsDataLoading={setIsDataLoading} />
    </div>
  );
};

export default Page;
