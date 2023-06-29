'use client';

import TabBar from '@/components/layout/TabBar';
import GradeBookSettings from '@/components/views/account-settings/GradeBookSettings';
import Role from '@/components/views/super-admin/Account/Role';
import { useState } from 'react';
import { IoMdTrendingUp } from 'react-icons/io';
import { MdOutlineDateRange } from 'react-icons/md';

const Account = () => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <section className='md:px-[60px] px-5 py-6'>
      <h1 className='mt-5 mb-6 text-2xl font-bold'>Account and Settings</h1>

      <TabBar
        variant='primary'
        selected={tabIdx}
        onSelect={(i) => setTabIdx(i)}
        items={[
          // {
          //   icon: <RiDashboardFill className='h-5 w-5' />,
          //   label: 'Account Details',
          // },
          // {
          //   icon: <BsFilterLeft className='h-5 w-5' />,
          //   label: 'General Settings',
          // },
          {
            icon: <MdOutlineDateRange className='h-5 w-5' />,
            label: 'Grade Book Settings',
          },
          // {
          //   icon: <GiHamburgerMenu className='h-5 w-5' />,
          //   label: 'Institution Settings',
          // },
          // {
          //   icon: <GiHamburgerMenu className='h-5 w-5' />,
          //   label: 'School Settings',
          // },
          {
            icon: <IoMdTrendingUp className='h-5 w-5' />,
            label: ' Admin Role Settings',
          },
        ]}
      />

      {/* {tabIdx === 4 && <Schooltype />} */}

      {tabIdx === 0 && <GradeBookSettings />}
      {tabIdx === 1 && <Role />}
    </section>
  );
};

export default Account;
