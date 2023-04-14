import ButtonLink from '@/components/links/ButtonLink';
import clsxm from '@/lib/clsxm';
import React from 'react';
import PieChart from '~/svg/chart_pie_slice.svg';
import Chat from '~/svg/chats_teardrop.svg';
import Folder from '~/svg/folder_notch.svg';
import ID from '~/svg/id_icon.svg';
import IDBadge from '~/svg/identification_badge.svg';
import NoteBook from '~/svg/notebook.svg';
import OpenBook from '~/svg/open_book.svg';
import UsersThree from '~/svg/users_three.svg';

const AdminSidebar = () => {
  return (
    <aside className='order-first flex h-screen w-52 flex-col items-center overflow-y-auto border-r-2 bg-[#F7F8FA] py-8 rtl:border-l rtl:border-r-0'>
      <nav className='flex flex-1 flex-col space-y-6'>
        <SideBarButton
          icon={<ID className='fill-current' />}
          title='Dashboard'
          href='/super-admin'
          active={true}
        />
        <SideBarButton
          icon={<NoteBook className='fill-current' />}
          title='Schools'
          href='/super-admin'
          active={false}
        />
        <SideBarButton
          icon={<OpenBook className='fill-current' />}
          title='Students'
          href='/super-admin'
          active={false}
        />
        <SideBarButton
          icon={<IDBadge className='fill-current' />}
          title='Teachers'
          href='/super-admin'
          active={false}
        />
        <SideBarButton
          icon={<PieChart className='fill-current' />}
          title='Budgets'
          href='/super-admin'
          active={false}
        />
        <SideBarButton
          icon={<Folder className='fill-current' />}
          title='Subjects'
          href='/super-admin'
          active={false}
        />
        <SideBarButton
          icon={<UsersThree className='fill-current' />}
          title='Account and settings'
          href='/super-admin'
          active={false}
        />
        <SideBarButton
          icon={<NoteBook className='fill-current' />}
          title='Blog'
          href='/super-admin'
          active={false}
        />
        <SideBarButton
          icon={<Chat className='fill-current' />}
          title='Messages'
          href='/super-admin'
          active={false}
        />
      </nav>
    </aside>
  );
};

interface SideBarButtonProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  active: boolean;
}

const SideBarButton = ({ icon, title, href, active }: SideBarButtonProps) => (
  <ButtonLink
    href={href}
    className={clsxm(
      active
        ? 'bg-[#0081460D] bg-opacity-5 font-bold text-[#008146]'
        : 'bg-transparent text-[#BDBEBE]',
      'h-12 w-[190px] overflow-hidden border-0 shadow-none hover:bg-[#0081460D] hover:text-[#008146]'
    )}
  >
    <div className='flex flex-row items-center gap-[14px]'>
      {icon}
      <div className='whitespace-nowrap text-[14px]'>{title}</div>
    </div>
  </ButtonLink>
);

export default AdminSidebar;
