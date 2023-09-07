'use client';

import GenericLoader from '@/components/layout/Loader';
import TabBar from '@/components/layout/TabBar';
import GradeBookSettings from '@/components/views/account-settings/GradeBookSettings';
import Role from '@/components/views/super-admin/Account/Role';
import Schooltype from '@/components/views/super-admin/Account/Schooltype';
import { useGetProfile } from '@/server/auth';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdTrendingUp } from 'react-icons/io';
import { MdOutlineDateRange } from 'react-icons/md';

const Account = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const { data: profile, isLoading: isLoadingProfile } = useGetProfile();

  if (isLoadingProfile) {
    return <GenericLoader />;
  }

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
          {
            icon: <GiHamburgerMenu className='h-5 w-5' />,
            label: 'Institution Settings',
          },
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


      {tabIdx === 0 && <GradeBookSettings profile={profile} />}
      {tabIdx === 1 && <Schooltype />}
      {tabIdx === 2 && <Role />}
    </section>
  );
};

export default Account;
