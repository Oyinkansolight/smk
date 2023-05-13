import {
  AdminSidebarInfoCardOne,
  AdminSidebarInfoCardThree,
  AdminSidebarInfoCardTwo,
  SidebarInfoCardOne,
} from '@/components/cards';
import React from 'react';

const AdminRightSidebar = () => {
  return (
    <aside className='hidden w-48 space-y-[18px] overflow-y-scroll border-l-2 px-[27px] py-[21.5px] sm:w-[397px] lg:block'>
      <AdminSidebarInfoCardOne />
      <AdminSidebarInfoCardTwo />
      <AdminSidebarInfoCardThree />
      <SidebarInfoCardOne />
    </aside>
  );
};

export default AdminRightSidebar;
