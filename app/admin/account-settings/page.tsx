'use client';

import Button from '@/components/buttons/Button';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import AddAdminModal from '@/components/modals/add-admin-modal';
import GeneralSettingsView from '@/components/views/account-settings/GeneralSettingsView';
import { useState } from 'react';
import { IoMdTrendingUp } from 'react-icons/io';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';
import { VscListSelection } from 'react-icons/vsc';

const mockData = [
  {
    logo: 1,
    name: 'Avril Price School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 2,
    name: 'Scaling Heights School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 3,
    name: 'Black Dash School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 4,
    name: 'Reaction Primary ',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
  {
    logo: 5,
    name: 'Victory International  School',
    numberOfStudent: '12,500',
    type: 'Primary',
    staff: '',
    location: 'Benin',
  },
];

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

function TableOption() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='relative cursor-pointer'>
      <SlOptionsVertical onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className='absolute z-50 bg-white rounded-lg shadow-md font-bold p-4 flex flex-col gap-y-3'>
          <div>Delete Account</div>
          <div>Edit Permission</div>
        </div>
      )}
    </div>
  );
}

function AccountSettings() {
  const [eccede] = useState(mockData);
  return (
    <>
      <div className='flex justify-end my-4 gap-x-4'>
        <Button
          onClick={() =>
            (window.location.href = '/admin/account-settings/manage-access-roles')
          }
          variant='outline'
          className='bg-white border-secondary border text-secondary'
        >
          Manage Roles
        </Button>
        <AddAdminModal>
          <Button variant='secondary'>Add Admin</Button>
        </AddAdminModal>
      </div>
      <div className='table-add-student bg-white mt-5 pb-4 pt-1'>
        <div className='text-3xl font-bold'>Admin Access Roles</div>
        <div className='table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400  py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-2'>Name</div>
          <div className='col-span-2'>Username</div>
          <div className='col-span-2'>Role</div>
          <div className='col-span-2'>Status</div>
          <div className='col-span-2'></div>
        </div>
        {eccede.map((item, idx) => (
          <div
            className='grid grid-cols-12 gap-4 border-b items-center  text-[#8898AA] p-3 px-1'
            key={idx}
          >
            <div className='col-span-2'>#{idx + 1} </div>
            <div className='col-span-2 w-max text-center text-[#525F7F] flex space-x-2 items-center'>
              <h2 className='text-sm font-medium'>{item.name}</h2>
            </div>
            <div className='col-span-2'>{item.numberOfStudent}</div>
            <div className='col-span-2'>Pending</div>
            <div className='col-span-2'>
              <TableOption />
            </div>
          </div>
        ))}

        <div className='my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            {' '}
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border bg-[#008146] p-2 text-white'>
            1
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            2
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            3
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
