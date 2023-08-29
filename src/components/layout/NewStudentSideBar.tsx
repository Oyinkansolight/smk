import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BiExit } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { toast } from 'react-toastify';

const items = [
  {
    img: '/images/sidebar-icons/Dashboard.png',
    url: '/student',
    label: 'Dashboard',
  },
  {
    img: '/images/sidebar-icons/Classes.png',
    url: '/student/period',
    label: 'Period',
  },
  {
    img: '/images/sidebar-icons/Subjects.png',
    url: '/student/subjects',
    label: 'Subjects',
  },
  {
    img: '/images/sidebar-icons/Dashboard-1.png',
    url: '/student/timetable',
    label: 'Timetable',
  },

  {
    img: '/images/sidebar-icons/Assignment.png',
    url: '/student/assignment',
    label: 'Assignments',
  },
  {
    img: '/images/sidebar-icons/testandexam.png',
    url: '/student/test-and-exam',
    label: 'Test and Exam',
  },
  {
    img: '/images/sidebar-icons/Performance.png',
    url: '/student/performance',
    label: 'Grade Book',
  },
  {
    img: '/images/sidebar-icons/Dashboard-4.png',
    url: '/student/profile',
    label: 'Settings',
  },
];
export default function NewStudentSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      // eslint-disable-next-line no-alert
      toast.success('You have been logged out successfully');
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
      }
      router.push('/auth/user');
    }
  };
  const handleToggle = () => setOpen(!open);

  return (
    <div
      className={clsxm(
        open ? 'w-40 ' : 'w-16 ',
        'absolute hideScroll overflow-y-auto flex bg-[#f5f9ff] flex-col gap-8 transition-all duration-200 items-center  py-4 border-r '
      )}
    >
      <div
        onClick={handleToggle}
        className={clsxm(
          'flex w-12 justify-center cursor-pointer bg-secondary-50 bg-opacity-30 p-4 rounded-full'
        )}
      >
        <GiHamburgerMenu />
      </div>
      <div className='flex flex-col gap-6 items-center'>
        {items.map((v, i) => (
          <Link
            key={i}
            href={v.url}
            onClick={() => {
              setOpen(false);
            }}
            className='flex flex-col whitespace-nowrap p-6 gap-1 text-[#CACACA] hover:text-extrabold hover:text-[#3361FF] items-center hover:border hover:bg-[#F5F8FF] h-16 w-24 justify-center rounded-lg cursor-pointer border-[#3361FF]'
          >
            <Image src={v.img} alt={v.img} height={49} width={52} />
            <div
              className={clsxm(
                open ? 'block' : 'hidden',
                'whitespace-nowrap text-[14px] '
              )}
            >
              {v.label}
            </div>
          </Link>
        ))}
        <div
          onClick={handleLogout}
          className='flex flex-col whitespace-nowrap p-6 gap-1 text-[#CACACA] hover:text-extrabold hover:text-[#3361FF] items-center hover:border hover:bg-[#F5F8FF] h-16 w-24 justify-center rounded-lg cursor-pointer border-[#3361FF]'
        >
          <BiExit className={clsxm('fill-red-500 w-24 h-24')} />
          <div
            className={clsxm(
              open ? 'block' : 'hidden',
              'whitespace-nowrap text-[14px] '
            )}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
