'use client';

import GenericLoader from '@/components/layout/Loader';
import TabBar from '@/components/layout/TabBar';
import GradeBookSettings from '@/components/views/account-settings/GradeBookSettings';
import Role from '@/components/views/account-settings/YourRoles';
import AccountDetails from '@/components/views/account-settings/AccountDetails';
import EditHistory from '@/components/views/account-settings/EditHistory';
import Schooltype from '@/components/views/super-admin/Account/Schooltype';
import { useGetProfile } from '@/server/auth';
import { useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
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
          {
            icon: <BsFilterLeft className='h-5 w-5' />,
            label: 'Account Details',
          },
          {
            icon: <MdOutlineDateRange className='h-5 w-5' />,
            label: 'Grade Book Settings',
          },
          {
            icon: <GiHamburgerMenu className='h-5 w-5' />,
            label: 'Institution Settings',
          },
          {
            icon: <IoMdTrendingUp className='h-5 w-5' />,
            label: 'Your Roles & Permissions',
          },

          {
            icon: <IoMdTrendingUp className='h-5 w-5' />,
            label: 'Change History',
          },
        ]}
      />



      {tabIdx === 0 && <AccountDetails />}
      {tabIdx === 1 && <GradeBookSettings profile={profile} />}
      {tabIdx === 2 && <Schooltype />}
      {tabIdx === 3 && <Role />}
      {tabIdx === 4 && <EditHistory />}
    </section>
  );
};

export default Account;
