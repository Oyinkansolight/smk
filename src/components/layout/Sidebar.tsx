/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLink from '@/components/links/ButtonLink';
import { BigAvatar } from '@/components/profile/BigAvatar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import clsxm from '@/lib/clsxm';
import React from 'react';
import { BiBookContent, BiDownload, BiExit, BiIdCard } from 'react-icons/bi';
import { FaRegIdCard, FaUsers } from 'react-icons/fa';
import { TbMessage, TbTimelineEvent } from 'react-icons/tb';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const handleLogout = () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      // eslint-disable-next-line no-alert
      toast.success('You have been logged out successfully');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    }
  };
  return (
    <aside className='order-first flex h-screen w-[301px] flex-col items-center overflow-y-auto border-r-2 bg-white py-12 rtl:border-l rtl:border-r-0'>
      <div className='flex flex-col items-center'>
        <BigAvatar src='/images/teacher_1.png' />
        <div className='mb-1 h4 font-semibold'>Santos Igbhosa</div>
        <OnlineStatus status='online' />
      </div>

      <nav className='flex flex-1 flex-col space-y-2 mt-16'>
        <SideBarButton
          open={false}
          icon={<BiIdCard />}
          title='Dashboard'
          href='/teacher'
          active
        />

        <SideBarButton
          open={false}
          icon={<BiBookContent className='#C3CAD9' />}
          title='My Subjects'
          href='/teacher/classes'
        />

        <SideBarButton
          open={false}
          icon={<BiBookContent className='#C3CAD9' />}
          title='Test and Exams'
          href='/teacher/test-and-examination'
        />

        <SideBarButton
          open={false}
          icon={<TbMessage className='#C3CAD9' />}
          title='Attendance'
          href='/teacher/attendance'
        />

        <SideBarButton
          open={false}
          icon={<TbTimelineEvent className='#C3CAD9' />}
          title='Timetable'
          href='/teacher/timetable'
        />

        <SideBarButton
          open={false}
          icon={<FaRegIdCard className='#C3CAD9' />}
          title='Lesson Task'
          href='/teacher/assignment'
        />

        <SideBarButton
          open={false}
          icon={<FaRegIdCard className='#C3CAD9' />}
          title='Grade Book'
          href='/teacher/grades'
        />

        <SideBarButton
          open={false}
          icon={<BiBookContent className='#C3CAD9' />}
          title='Messages'
          href='/teacher'
        />

        <SideBarButton
          open={false}
          icon={<BiDownload className='#C3CAD9' />}
          title='Library'
          href='/teacher/library'
        />

        <SideBarButton
          open={false}
          icon={<FaUsers className='#C3CAD9' />}
          title='Account and Settings'
          href='/teacher/account-and-settings'
        />

        <div className='pt-20'>
          <SideBarButton
            open={false}
            icon={<BiExit className={clsxm('fill-red-500 w-6 h-6')} />}
            title='Logout'
            href='/auth/admin'
            onClick={handleLogout}
            active={undefined}
          />
        </div>
      </nav>
    </aside>
  );
};

interface SideBarButtonProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  active?: boolean | any;
  open?: boolean;
  onClick?: () => void;
}

export const SideBarButton = ({
  icon,
  title,
  href,
  active = false,
  // open = false,
  onClick,
}: SideBarButtonProps) => (
  <ButtonLink
    href={href}
    onClick={onClick}
    className={clsxm(
      'min-w-[170px]',
      active
        ? 'bg-[#1A8FE3] font-bold text-white'
        : 'bg-transparent text-gray-400',
      'h-12 overflow-hidden border-0 shadow-none hover:bg-secondary-600 rounded-lg'
    )}
  >
    <div className='flex flex-row items-center gap-[14.25px]'>
      {icon}
      <div
        className={clsxm(
          // open ? 'block' : 'hidden',
          'whitespace-nowrap text-[14px]'
        )}
      >
        {title}
      </div>
    </div>
  </ButtonLink>
);

export default Sidebar;
