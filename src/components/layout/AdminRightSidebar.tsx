import {
  AdminSidebarInfoCardThree,
  SidebarInfoCardOne,
} from '@/components/cards';
import { useGetDashboardOverview } from '@/server/dashboard';
import React from 'react';

const AdminRightSidebar = () => {
  const { data } = useGetDashboardOverview();

  return (
    <aside className='hidden w-48 space-y-[18px] overflow-y-scroll border-l-2 px-[27px] py-[21.5px] sm:w-[397px] lg:block'>
      {/* <AdminSidebarInfoCardOne />
      <AdminSidebarInfoCardTwo /> */}
      <AdminSidebarInfoCardThree data={data} />
      <SidebarInfoCardOne />
    </aside>
  );
};

export default AdminRightSidebar;
