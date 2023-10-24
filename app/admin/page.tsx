'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useGetProfile } from '@/server/auth';
import Button from '@/components/buttons/Button';
import DashboardCounts from '@/components/sections/admin/DashboardCounts';
const AdminCharts = dynamic(() => import('@/components/sections/admin/AdminCharts'));

const Page = () => {
  const { data: institutionProfile } = useGetProfile();
  const institutionName = institutionProfile?.userInfo?.esiAdmin?.instituteName ?? '';

  return (
    <div className='layout flex flex-col gap-[31px] px-4 pt-6'>
      <div className='font-bold text-4xl truncate sm:max-w-[450px] md:max-w-max'>
        Welcome, {institutionName}
      </div>
      <div className='flex justify-end'>
        <Link href='/admin/add-student'>
          <Button variant='secondary'>Add Student +</Button>
        </Link>
      </div>
      <div className='bg-white p-[20px] rounded-[10px]'>
        <div className='text-[#333333] font-bold text-lg sm:text-2xl mb-5'>
          Your Dashboard Statistics
        </div>
        <DashboardCounts />
      </div>

      <div className='p-[20px] bg-white'>
        <AdminCharts institutionId={institutionProfile?.userInfo?.esiAdmin?.id} />
      </div>
    </div>
  );
};

export default Page;
