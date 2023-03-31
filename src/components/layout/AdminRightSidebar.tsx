import React from 'react';

import {
  AdminSidebarInfoCardOne,
  AdminSidebarInfoCardThree,
  AdminSidebarInfoCardTwo,
  SidebarInfoCardOne,
} from '@/components/cards';

const AdminRightSidebar = () => {
  return (
    <aside className='hidden w-48 space-y-[18px] overflow-y-scroll border-l-2 px-[27px] py-[21.5px] sm:w-[397px] md:block'>
      <AdminSidebarInfoCardOne />
      <AdminSidebarInfoCardTwo />
      <AdminSidebarInfoCardThree />
      <SidebarInfoCardOne />
    </aside>
  );
};

export default AdminRightSidebar;
