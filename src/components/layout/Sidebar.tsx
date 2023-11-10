/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import clsxm from '@/lib/clsxm';
import { useGetProfile } from '@/server/auth';
import { useGetClockInfo } from '@/server/institution/clock-in-clock-out';
import { useClockOut } from '@/server/teacher';
import moment from 'moment';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { BiBookContent, BiDownload, BiExit, BiIdCard } from 'react-icons/bi';
import { FaRegIdCard, FaUsers } from 'react-icons/fa';
import { PiChatsTeardropDuotone } from 'react-icons/pi';
import { TbMessage, TbTimelineEvent } from 'react-icons/tb';
import { toast } from 'react-toastify';

interface TeacherSidebarProps {
  open: boolean;
  handleToggle: () => void;
}

const Sidebar = ({ open, handleToggle }: TeacherSidebarProps) => {
  const routeDetails = usePathname();
  const router = useRouter();

  const { data: clockInfo } = useGetClockInfo();
  const { mutateAsync: clockOut } = useClockOut();
  const { data: profileData } = useGetProfile();

  const handleLogout = () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      // eslint-disable-next-line no-alert
      toast.success('You have been logged out successfully');
      router.push('/auth/user?action=logout');
    }
  };

  return (
    <div className='flex flex-row'>
      <aside
        className={clsxm(
          open ? 'w-[230px] items-center' : 'w-0 xl:w-20',
          'absolute order-first flex h-screen transition-all duration-300 flex-col  overflow-y-auto border-r-2 bg-white py-12 rtl:border-l rtl:border-r-0 z-[100]'
        )}
      >
        <div className='flex flex-col items-center'>
          {/* <BigAvatar src='/images/teacher_1.png' />
        <div className='mb-1 h4 font-semibold'>Santos Igbhosa</div>
        <OnlineStatus status='online' /> */}
        </div>

        <nav className='flex flex-1 flex-col space-y-2  pl-4'>
          <SideBarButton
            open={open}
            icon={<BiIdCard />}
            title='Dashboard'
            href='/teacher'
            active={routeDetails && routeDetails === '/teacher' && true}
          />

          <SideBarButton
            open={open}
            icon={<BiBookContent className='#C3CAD9' />}
            title='My Subjects'
            href='/teacher/classes'
            active={routeDetails && routeDetails.includes('classes') && true}
          />

          <SideBarButton
            open={open}
            icon={<BiBookContent className='#C3CAD9' />}
            title='Test and Exams'
            href='/teacher/test-and-examination'
            active={
              routeDetails &&
              routeDetails.includes('test-and-examination') &&
              true
            }
          />

          {profileData?.userInfo?.staff?.managedClassArm && (
            <SideBarButton
              open={open}
              icon={<TbMessage className='#C3CAD9' />}
              title='Attendance'
              href='/teacher/attendance'
              active={
                routeDetails && routeDetails.includes('attendance') && true
              }
            />
          )}

          <SideBarButton
            open={open}
            icon={<TbTimelineEvent className='#C3CAD9' />}
            title='Timetable'
            href='/teacher/timetable'
            active={routeDetails && routeDetails.includes('timetable') && true}
          />

          <SideBarButton
            open={open}
            icon={<FaRegIdCard className='#C3CAD9' />}
            title='Lesson Task'
            href='/teacher/lesson-note'
            active={
              routeDetails && routeDetails.includes('lesson-note') && true
            }
          />

          <SideBarButton
            open={open}
            icon={<FaRegIdCard className='#C3CAD9' />}
            title='Grade Book'
            href='/teacher/grades'
            active={routeDetails && routeDetails.includes('grades') && true}
          />

          <SideBarButton
            open={open}
            icon={<FaRegIdCard className='#C3CAD9' />}
            title='Manual Grade Book'
            href='/teacher/manual-gradebook'
            active={
              routeDetails && routeDetails.includes('manual-gradebook') && true
            }
          />

          <SideBarButton
            open={open}
            icon={<BiBookContent className='#C3CAD9' />}
            title='Messages'
            href='/teacher/messages'
            active={routeDetails && routeDetails.includes('messages') && true}
          />

          <SideBarButton
            open={open}
            icon={<BiDownload className='#C3CAD9' />}
            title='Library'
            href='/teacher/library'
            active={routeDetails && routeDetails.includes('library') && true}
          />

          <SideBarButton
            open={open}
            icon={<FaUsers className='#C3CAD9' />}
            title='Account and Settings'
            href='/teacher/account-and-settings'
            active={
              routeDetails &&
              routeDetails.includes('account-and-settings') &&
              true
            }
          />

          <div className='pt-20'>
            {open && (
              <SideBarButton
                open={open}
                icon={<PiChatsTeardropDuotone />}
                className='bg-transparent text-[#746D69] border border-black'
                title='Support'
                href='/teacher'
                onClick={() => null}
                active={undefined}
              />
            )}

            <div className='h-4' />

            {open && clockInfo?.isClockedIn && (
              <SideBarButton
                open={open}
                icon={<div></div>}
                href='#'
                className='bg-black text-white'
                title='Clock Out'
                onClick={() =>
                  clockOut({ clockOutTime: moment().toISOString() })
                }
                active={undefined}
              />
            )}

            <div className='h-4' />

            {open &&
              <Button
                title='Logout'
                className={clsxm(
                  'min-w-[170px]',
                  'bg-[#1A8FE3] font-bold text-white',
                  'h-12 overflow-hidden border-0 shadow-none hover:bg-secondary-600 rounded-lg',
                )}
                onClick={handleLogout}
              >
                <div className='flex flex-row items-center gap-[14.25px]'>
                  <BiExit
                    className={clsxm(
                      'fill-red-500',
                      open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
                    )}
                  />
                  <div
                    className={clsxm(
                      open ? 'block' : 'hidden',
                      'whitespace-nowrap text-[14px] '
                    )}
                  >
                    Logout
                  </div>
                </div>
              </Button>
            }

            {/* {open && (
              <BasicModal
                className='z-[100000000] mx-auto max-w-[450px]'
                content={<LogoutModalContent handleLogout={handleLogout} />}
              >
                <SideBarButton
                  active
                  open={open}
                  className='-ml-6'
                  icon={
                    <BiExit
                      className={clsxm(
                        'fill-red-500',
                        open ? 'md:w-auto md:h-auto' : 'w-6 h-6'
                      )}
                    />
                  }
                  title='Logout'
                />
              </BasicModal>
            )} */}
          </div>
        </nav>
      </aside>

      {open && (
        <div
          className='fixed inset-0 bg-black bg-opacity-25 z-50'
          onClick={handleToggle}
        />
      )}
    </div>
  );
};

interface SideBarButtonProps {
  icon: React.ReactNode;
  title: string;
  href?: string;
  active?: boolean | any;
  open?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SideBarButton = ({
  icon,
  title,
  href,
  active = false,
  open = false,
  onClick,
  className,
}: SideBarButtonProps) => (
  <>
    {href ? (
      <ButtonLink
        //!Disable the tooltip for now, I don't see the need for it
        // data-tooltip-id={`teacher-tooltip-${title}`}
        href={href}
        title={title}
        onClick={onClick}
        className={clsxm(
          'min-w-[170px]',
          active
            ? 'bg-[#1A8FE3] font-bold text-white'
            : 'bg-transparent text-gray-400',
          'h-12 overflow-hidden border-0 shadow-none hover:bg-secondary-600 rounded-lg',
          className
        )}
      >
        <div className='flex flex-row items-center gap-[14.25px]'>
          {icon}
          <div
            className={clsxm(
              open ? 'block' : 'hidden',
              'whitespace-nowrap text-[14px] '
            )}
          >
            {title}
          </div>
        </div>
      </ButtonLink>
    ) : (
      <Button
        //!Disable the tooltip for now, I don't see the need for it
        // data-tooltip-id={`teacher-tooltip-${title}`}
        title={title}
        className={clsxm(
          'min-w-[170px]',
          active
            ? 'bg-[#1A8FE3] font-bold text-white'
            : 'bg-transparent text-gray-400',
          'h-12 overflow-hidden border-0 shadow-none hover:bg-secondary-600 rounded-lg',
          className
        )}
      >
        <div className='flex flex-row items-center gap-[14.25px]'>
          {icon}
          <div
            className={clsxm(
              open ? 'block' : 'hidden',
              'whitespace-nowrap text-[14px] '
            )}
          >
            {title}
          </div>
        </div>
      </Button>
    )}

    {/* <Tooltip id={`teacher-tooltip-${title}`} place='top'>
      {title}
    </Tooltip> */}
  </>
);

export default Sidebar;
