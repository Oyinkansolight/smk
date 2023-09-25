'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import AddSingleSchool from '@/components/modal/addSchool';
import DataGenerator from '@/components/views/admin/DataGenerator';
import DashboardCounts from '@/components/sections/superAdmin/DashboardCounts';
const SuperAdminCharts = dynamic(() => import('@/components/sections/superAdmin/SuperAdminCharts'));

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);


  const handleSetOpen = (value: boolean) => setIsOpen(value);

  return (
    <div className='layout flex flex-col gap-[27px] px-4 pt-6'>
      <div className='flex h1 mb-7'>Welcome</div>

      {isOpen && (
        <AddSingleSchool
          onClickHandler={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}

      <DashboardCounts handleSetOpen={handleSetOpen} />

      <DataGenerator />


      <SuperAdminCharts />
    </div>
  );
};

export default Page;
