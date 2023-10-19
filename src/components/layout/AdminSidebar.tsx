/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonLink from '@/components/links/ButtonLink';
import ROUTES from '@/constant/routes';
import clsxm from '@/lib/clsxm';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { IoExitSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';

interface AdminSidebarProps {
  open: boolean;
  handleToggle: () => void;
}

const AdminSidebar = ({ open, handleToggle }: AdminSidebarProps) => {
  const router = useRouter();
  const routeDetails = usePathname();

  const handleLogout = async () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      // eslint-disable-next-line no-alert
      toast.success('You have been logged out successfully');
      if (typeof window !== 'undefined') {
        await sessionStorage.clear();
        await localStorage.clear();
      }

      toast.info('Redirecting to login page...');

      setTimeout(() => {
        router.push(ROUTES.ADMIN_AUTH);
      }, 1500);
    }
  };

  return (
    <aside
      className={clsxm(
        'w-full absolute transition-all delay-100 flex flex-col items-center overflow-y-auto navigationScrollbar'
      )}
    >
      <nav className='flex flex-1 flex-col space-y-3 md:space-y-6 w-full max-w-[383px]'>
        <SideBarButtonTwo
          active={routeDetails && routeDetails === '/super-admin' && true}
          title='Dashboard'
          onClick={() => {
            router.push('/super-admin');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={routeDetails && routeDetails.includes('school') && true}
          title='Institutions'
          onClick={() => {
            router.push('/super-admin/all-school');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={routeDetails && routeDetails.includes('student') && true}
          title='Students'
          onClick={() => {
            router.push('/super-admin/all-student');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={
            routeDetails && routeDetails.includes('teacher' || 'staff') && true
          }
          title='Staff'
          onClick={() => {
            router.push('/super-admin/all-staff');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={routeDetails && routeDetails.includes('subject') && true}
          title='Subjects'
          onClick={() => {
            router.push('/super-admin/all-subject');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={routeDetails && routeDetails.includes('calendar') && true}
          title='Academic Timetable'
          onClick={() => {
            router.push('/super-admin/academic-calendar');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={routeDetails && routeDetails.includes('library') && true}
          title='Library'
          onClick={() => {
            router.push('/super-admin/library');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={routeDetails && routeDetails.includes('account') && true}
          title='Account and settings'
          onClick={() => {
            router.push('/super-admin/account');
            handleToggle();
          }}
        />

        <SideBarButtonTwo
          active={
            routeDetails && routeDetails.includes('communication') && true
          }
          title='Communication'
          onClick={() => {
            router.push('/super-admin/communication');
            handleToggle();
          }}
        />

        <button
          onClick={() => {
            handleLogout();
            handleToggle();
          }}
          className={clsxm(
            'bg-[#FFF4F5] font-bold text-[#9D9D9D] !mt-20 !mb-6',
            'flex rounded-[40px] p-3 justify-center items-center gap-3 self-stretch',
            'h-11 w-full overflow-hidden border-0 shadow-none hover:bg-[#FFF4F5] hover:text-[#9D9D9D]'
          )}
        >
          <div className='flex flex-row justify-center items-center gap-3 '>
            <IoExitSharp className='text-[#C3CAD9] h-6 w-6' />
            <div className='whitespace-nowrap text-[14px]'>Logout</div>
          </div>
        </button>
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

interface SideBarButtonTwoProps {
  title: string;
  active: boolean | any;
  onClick?: () => void;
}

const SideBarButtonTwo = ({
  title,
  active,
  onClick,
}: SideBarButtonTwoProps) => {
  return (
    <button
      onClick={onClick}
      className={clsxm(
        active
          ? 'bg-[#5754F7] font-bold text-white'
          : 'bg-transparent text-[#9D9D9D]',
        'flex rounded-[40px] p-3 justify-center items-center gap-3 self-stretch',
        'h-11 w-full overflow-hidden border-0 shadow-none hover:bg-[#5754F7] hover:text-white'
      )}
    >
      {title}
    </button>
  );
};

export default AdminSidebar;
