'use client';

import TabBar from '@/components/layout/TabBar';
import AddAdmin from '@/components/modal/addAdmin';
import Role from '@/components/views/super-admin/Account/Role';
import Link from 'next/link';
import { useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdTrendingUp } from 'react-icons/io';
import { MdOutlineDateRange } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';

const Account = () => {
  const [tabIdx, setTabIdx] = useState(5);
  const [isOpen, setisOpen] = useState(false);

  function handleModal() {
    setisOpen(!isOpen);
  }
  return (
    <section className='px-[60px] py-6'>
      <h1 className='mt-5 mb-6 text-2xl font-bold'>Account and Settings</h1>

      <TabBar
        variant='primary'
        selected={tabIdx}
        onSelect={(i) => setTabIdx(i)}
        items={[
          {
            icon: <RiDashboardFill className='h-5 w-5' />,
            label: 'Account Details',
          },
          {
            icon: <BsFilterLeft className='h-5 w-5' />,
            label: 'General Settings',
          },
          {
            icon: <MdOutlineDateRange className='h-5 w-5' />,
            label: ' School Calendar Settings',
          },
          {
            icon: <GiHamburgerMenu className='h-5 w-5' />,
            label: ' Notifications',
          },
          {
            icon: <GiHamburgerMenu className='h-5 w-5' />,
            label: 'School Settings',
          },
          {
            icon: <IoMdTrendingUp className='h-5 w-5' />,
            label: ' Admin Role Settings',
          },
        ]}
      />
      <div className='flex justify-end items-center space-x-4 my-5'>
        <Link
          href='/super-admin'
          className='w-max  rounded border border-[#008146] px-12 py-3 text-xs text-[#008146] '
        >
          Manage Roles{' '}
        </Link>
        <button
          onClick={() => setisOpen(!isOpen)}
          className='w-max  rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
        >
          Add Admin
        </button>
      </div>

      {tabIdx === 5 && <Role />}
      {isOpen && <AddAdmin onClickHandler={handleModal} />}
    </section>
  );
};

export default Account;
