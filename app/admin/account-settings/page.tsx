'use client';

import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import AccountSettings from '@/components/sections/admin/AccountSettings';
import GeneralSettingsView from '@/components/views/account-settings/GeneralSettingsView';
import { useState } from 'react';
import { IoMdTrendingUp } from 'react-icons/io';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import { VscListSelection } from 'react-icons/vsc';

const Page = () => {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <div className='px-20'>
      <div className='text-3xl font-bold'>Account Settings</div>
      <div className='flex w-full items-end justify-between'>
        <TabBar
          variant='secondary'
          selected={tabIdx}
          onSelect={(i) => setTabIdx(i)}
          items={[
            {
              icon: <RiDashboardFill className='h-5 w-5' />,
              label: 'Account Details',
            },
            {
              icon: <VscListSelection className='h-5 w-5' />,
              label: 'General Settings',
            },
            {
              icon: <RiCalendar2Fill className='h-5 w-5' />,
              label: 'Academic Calender Settings',
            },
            {
              icon: <IoMdTrendingUp className='h-5 w-5' />,
              label: 'Notifications',
            },
            {
              icon: <RiCalendar2Fill className='h-5 w-5' />,
              label: 'Admin Role Settings',
            },
          ]}
        />

        <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

        <div className='h-20 border-b-[2px] flex items-center border-[#EDEFF2]'>
          <SearchInput placeholder='Search Tasks' />
        </div>
      </div>

      <div>
        {tabIdx === 0 ? (
          <GeneralSettingsView />
        ) : tabIdx === 4 ? (
          <AccountSettings />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Page;
