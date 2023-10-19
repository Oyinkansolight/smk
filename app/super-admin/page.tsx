'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import AddSingleSchool from '@/components/modal/addSchool';
import DashboardCounts from '@/components/sections/superAdmin/DashboardCounts';
const SuperAdminCharts = dynamic(() => import('@/components/sections/superAdmin/SuperAdminCharts'));

const Page = () => {
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

      <SuperAdminCharts />
    </div>
  );
};

export default Page;
