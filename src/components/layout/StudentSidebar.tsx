import { SideBarButton } from '@/components/layout/AdminSidebar';
import clsxm from '@/lib/clsxm';
import { getFromSessionStorage } from '@/lib/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiExit } from 'react-icons/bi';
import { CiCloud } from 'react-icons/ci';
import { MdContacts } from 'react-icons/md';
import { RiDashboardFill, RiProfileFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

interface StudentSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar?: (isSidebarOpen: boolean) => void;
}

const StudentSidebar = ({ isSidebarOpen }: StudentSidebarProps) => {
  const userData = getFromSessionStorage('user');
  let user;

  if (userData) {
    user = JSON.parse(userData);
  }

  const handleLogout = () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      // eslint-disable-next-line no-alert
      toast.success('You have been logged out successfully');
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
      }
    }
  };

  return (
    <aside
      className={clsxm(
        isSidebarOpen ? 'w-64 absolute' : 'w-20',
        'order-first flex lg:hidden h-screen flex-col items-center overflow-y-auto border-r-2 bg-[#F7F8FA] py-8 rtl:border-l rtl:border-r-0'
      )}
    >
      <nav className='flex flex-1 flex-col space-y-10'>
        <div className='flex flex-row gap-4 items-center'>
          <Image
            width={45}
            height={45}
            className='w-auto'
            src='/images/avatar.png'
            alt=''
          />

          {isSidebarOpen && <div>{user.name}</div>}
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <Link
            href='/student'
            className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
          >
            <RiDashboardFill className='text-[#C3CAD9]' />
          </Link>

          {isSidebarOpen && (
            <div className='p text-gray-500 font-semibold'>Dashboard</div>
          )}
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <Link
            href='#'
            className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
          >
            <RiProfileFill className='text-[#C3CAD9]' />
          </Link>

          {isSidebarOpen && (
            <div className='p text-gray-500 font-semibold'>Profile</div>
          )}
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <Link
            href='#'
            className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
          >
            <MdContacts className='text-[#C3CAD9]' />
          </Link>

          {isSidebarOpen && (
            <div className='p text-gray-500 font-semibold'>Contact</div>
          )}
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <Link
            href='#'
            className='focus:outline-nones flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-colors duration-200 hover:bg-gray-200'
          >
            <CiCloud className='text-[#C3CAD9]' />
          </Link>

          {isSidebarOpen && (
            <div className='p text-gray-500 font-semibold'>Documents</div>
          )}
        </div>

        <div className='mt-10'>
          <SideBarButton
            open={false}
            icon={<BiExit className={clsxm('fill-red-500 w-6 h-6')} />}
            title='Logout'
            href='#'
            onClick={handleLogout}
            active={undefined}
          />
        </div>
      </nav>
    </aside>
  );
};

export default StudentSidebar;
