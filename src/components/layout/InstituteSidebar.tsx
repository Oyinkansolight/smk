import clsxm from '@/lib/clsxm';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiExit, BiUserVoice } from 'react-icons/bi';
import { BsMessenger } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Company from '~/svg/company.svg';
import Globe from '~/svg/globe.svg';
import Sidebararrow from '~/svg/sidebararrow.svg';
import Star from '~/svg/star.svg';
import Trend from '~/svg/trend_up.svg';

const InstituteSidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const routeDetails = usePathname();
  const router = useRouter();
  // const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      // eslint-disable-next-line no-alert
      toast.success('You have been logged out successfully');
      router.push('/auth/user?action=logout');
    }
  };
  const handleToggle = () => setOpen(!open);
  return (
    <aside
      className={clsxm(
        open ? 'w-[280px] ' : 'w-20 ',
        'absolute z-[999]  order-first flex h-screen transition-all duration-300 flex-col  overflow-y-auto border-r-2 bg-white py-12 rtl:border-l rtl:border-r-0 hideScroll'
      )}
    >
      <nav className='flex flex-1 flex-col space-y-6 pl-4 pr-2'>
        <div
          onClick={handleToggle}
          className={clsxm(
            'flex w-12 justify-center cursor-pointer bg-secondary-50 bg-opacity-30 p-4 rounded-full'
          )}
        >
          <GiHamburgerMenu />
        </div>

        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<Globe className='#C3CAD9' />}
          title='Dashboard'
          href='/admin'
          active={routeDetails && routeDetails.includes('') && true}
        />
        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<Star className='#C3CAD9' />}
          title='Students'
          href='/admin/all-student'
          active={routeDetails && routeDetails.includes('all-student') && true}
        />
        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<Trend className='#C3CAD9' />}
          title='Staff'
          href='/admin/all-staff'
          active={routeDetails && routeDetails.includes('all-staff') && true}
        />

        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<BiUserVoice className='text-[#C3CAD9] fill-current' />}
          title='Parents'
          href='/admin/all-parents'
          active={routeDetails && routeDetails.includes('all-parents') && true}
        />

        {/* <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<Trend className='#C3CAD9' />}
          title='Subject'
          href='/admin/all-subject'
          active={routeDetails && routeDetails.includes('all-subject') && true}
        /> */}
        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<Trend className='#C3CAD9' />}
          title='Classes'
          href='/admin/all-classes'
          active={routeDetails && routeDetails.includes('all-classes') && true}
        />
        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<BsMessenger className='#C3CAD9' />}
          title='Communication'
          href='/admin/all-communication'
          active={
            routeDetails && routeDetails.includes('all-communication') && true
          }
        />
        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<Company className='#C3CAD9' />}
          title='Accounting and Settings'
          href='/admin/account'
          active={routeDetails && routeDetails.includes('Accounting') && true}
        />
        <SideBarButton
          onClick={() => {
            setOpen(false);
          }}
          open={open}
          icon={<Company className='#C3CAD9' />}
          title='Library'
          href='/admin/library'
          active={routeDetails && routeDetails.includes('library') && true}
        />

        <button
          onClick={handleLogout}
          className={clsxm(
            open
              ? 'w-full rounded-md justify-start'
              : 'w-[45px] rounded-full justify-center',
            'focus:outline-nones flex h-[45px]  items-center   bg-white shadow transition-colors duration-200 hover:bg-gray-200'
          )}
        >
          <div
            className={` ${open ? ' justify-between px-2' : 'justify-center'
              } flex w-full items-center gap-[14.25px] `}
          >
            <div className='flex items-center justify-center space-x-2'>
              <BiExit className={clsxm('fill-red-500 w-6 h-6')} />
              <div
                className={clsxm(
                  open ? 'block' : 'hidden',
                  'whitespace-nowrap text-sm text-[#6B7A99] font-black'
                )}
              >
                Logout
              </div>
            </div>
            <Sidebararrow
              className={clsxm(
                open ? 'block' : 'hidden',
                'transform scale-125'
              )}
            />
          </div>
        </button>
        {/* <button
          onClick={handleLogout}
          className={clsxm(
            open
              ? 'w-full rounded-md justify-start'
              : 'w-[45px] rounded-full justify-center',
            'focus:outline-nones flex h-[45px]  items-center   bg-white shadow transition-colors duration-200 hover:bg-gray-200'
          )}
        >
          <div
            className={` ${
              open ? ' justify-between px-2' : 'justify-center'
            } flex w-full items-center gap-[14.25px] `}
          >
            <div className='flex items-center justify-center space-x-2'>
              <BiExit className={clsxm('fill-red-500 w-6 h-6')} />
              <div
                className={clsxm(
                  open ? 'block' : 'hidden',
                  'whitespace-nowrap text-sm text-[#6B7A99] font-black'
                )}
              >
                Logout
              </div>
            </div>
            <Sidebararrow
              className={clsxm(
                open ? 'block' : 'hidden',
                'transform scale-125'
              )}
            />
          </div>
        </button> */}
      </nav>
    </aside>
  );
};

interface SideBarButtonProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  active?: boolean | unknown;
  open?: boolean;
  onClick?: () => void;
}

export const SideBarButton = ({
  icon,
  title,
  href,
  active = false,
  open = false,

  onClick,
}: SideBarButtonProps) => (
  <Link
    href={href}
    onClick={onClick && onClick}
    className={clsxm(
      open
        ? 'w-full rounded-md justify-start'
        : 'w-[45px] rounded-full justify-center',
      active ? 'bg-[#1A8FE3] font-bold text-white' : 'bg-white',
      'focus:outline-nones flex h-[45px]  items-center   bg-white shadow transition-colors duration-200 hover:bg-gray-200'
    )}
  >
    <div
      className={` ${open ? ' justify-between px-2' : 'justify-center'
        } flex w-full items-center gap-[14.25px] `}
    >
      <div className='flex items-center justify-center space-x-2'>
        {icon}
        <div
          className={clsxm(
            open ? 'block' : 'hidden',
            'whitespace-nowrap text-sm text-[#6B7A99] font-black'
          )}
        >
          {title}
        </div>
      </div>
      <Sidebararrow
        className={clsxm(open ? 'block' : 'hidden', 'transform scale-125')}
      />
    </div>
  </Link>
);

export default InstituteSidebar;
