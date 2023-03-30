import React from 'react';

import {
  SidebarInfoCardOne,
  SidebarInfoCardThree,
  SidebarInfoCardTwo,
} from '@/components/cards';

const RightSidebar = () => {
  return (
    <aside className='hidden w-48 space-y-[18px] overflow-y-scroll border-l-2 px-[27px] py-[21.5px] sm:w-[397px] md:block'>
      <SidebarInfoCardOne />
      <SidebarInfoCardTwo />
      <SidebarInfoCardThree />
    </aside>
  );
};

export default RightSidebar;
