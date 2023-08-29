/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLink from '@/components/links/ButtonLink';
import clsxm from '@/lib/clsxm';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiExit } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoDocumentOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Calendar_icon from '~/svg/calendar_icon.svg';
import Chat from '~/svg/chats_teardrop.svg';
import Folder from '~/svg/folder_notch.svg';
import ID from '~/svg/id_icon.svg';
import IDBadge from '~/svg/identification_badge.svg';
import NoteBook from '~/svg/notebook.svg';
import OpenBook from '~/svg/open_book.svg';
import UsersThree from '~/svg/users_three.svg';

interface AdminSidebarProps {
  open: boolean;
  handleToggle: () => void;
}

const AdminSidebar = ({ open, handleToggle }: AdminSidebarProps) => {
  const routeDetails = usePathname();

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
        open ? 'w-52' : 'w-20',
        'absolute order-first transition-all delay-100 flex h-screen flex-col items-center overflow-y-auto border-r-2 bg-[#F7F8FA] py-8 rtl:border-l rtl:border-r-0'
      )}
    >
      <nav className='flex flex-1 flex-col space-y-3 md:space-y-6'>
        <div
          onClick={handleToggle}
          className={clsxm(
            'flex w-12 justify-center cursor-pointer bg-primary-50 bg-opacity-30 p-4 rounded-full'
          )}
        >
          <GiHamburgerMenu />
        </div>

        <SideBarButton
          open={open}
          icon={
            <ID
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Dashboard'
          href='/super-admin'
          active={routeDetails && routeDetails.includes('dashboard') && true}
        />
        <SideBarButton
          onClick={handleToggle}
          open={open}
          icon={
            <NoteBook
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Institutions'
          href='/super-admin/all-school'
          active={routeDetails && routeDetails.includes('school') && true}
        />
        <SideBarButton
          open={open}
          icon={
            <OpenBook
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Students'
          href='/super-admin/all-student'
          active={routeDetails && routeDetails.includes('student') && true}
        />

        <SideBarButton
          open={open}
          icon={
            <IDBadge
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Staff'
          href='/super-admin/all-staff'
          active={
            routeDetails && routeDetails.includes('teacher' || 'staff') && true
          }
        />

        <SideBarButton
          open={open}
          icon={
            <IoDocumentOutline
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Subjects'
          href='/super-admin/all-subject'
          active={routeDetails && routeDetails.includes('subject') && true}
        />

        <SideBarButton
          open={open}
          icon={
            <Calendar_icon
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Academic Timetable'
          href='/super-admin/academic-calendar'
          active={routeDetails && routeDetails.includes('calendar') && true}
        />

        {/* <SideBarButton
          open={open}
          icon={
            <PieChart
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Budgets'
          href='/super-admin/#'
          active={routeDetails && routeDetails.includes('budget') && true}
        /> */}
        <SideBarButton
          open={open}
          icon={
            <Folder
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Library'
          href='/super-admin/library'
          active={routeDetails && routeDetails.includes('library') && true}
        />
        <SideBarButton
          open={open}
          icon={
            <UsersThree
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Account and settings'
          href='/super-admin/account'
          active={routeDetails && routeDetails.includes('account') && true}
        />
        {/* <SideBarButton
          open={open}
          icon={
            <NoteBook
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Blog'
          href='/super-admin/#'
          active={routeDetails && routeDetails.includes('blog') && true}
        /> */}
        <SideBarButton
          open={open}
          icon={
            <Chat
              className={clsxm(
                'fill-current',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Communication'
          href='/super-admin/communication'
          active={
            routeDetails && routeDetails.includes('communication') && true
          }
        />

        <SideBarButton
          open={open}
          icon={
            <BiExit
              className={clsxm(
                'fill-red-500',
                open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
              )}
            />
          }
          title='Logout'
          href='#'
          onClick={handleLogout}
          active={routeDetails && routeDetails.includes('message') && true}
        />
      </nav>
    </aside>
  );
};

interface SideBarButtonProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  active: boolean | any;
  open: boolean;
  onClick?: () => void;
}

export const SideBarButton = ({
  icon,
  title,
  href,
  active,
  open,
  onClick,
}: SideBarButtonProps) => (
  <>
    <ButtonLink
      href={href}
      title={title}
      onClick={onClick}
      className={clsxm(
        open && 'w-[190px]',
        active
          ? 'bg-[#0081460D] bg-opacity-5 font-bold text-[#008146]'
          : 'bg-transparent text-[#BDBEBE]',
        'h-12 overflow-hidden border-0 shadow-none hover:bg-[#0081460D] hover:text-[#008146]'
      )}
    >
      <div className='flex flex-row items-center gap-[14px]'>
        {icon}
        <div
          className={clsxm(
            open ? 'block' : 'hidden',
            'whitespace-nowrap text-[14px]'
          )}
        >
          {title}
        </div>
      </div>
    </ButtonLink>
  </>
);

export default AdminSidebar;
