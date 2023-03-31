import { BsFillSendFill } from 'react-icons/bs';
import { MdChromeReaderMode, MdLocalPhone, MdMail } from 'react-icons/md';
import { RiDashboardFill, RiUserFill, RiWhatsappFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';

import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import OnlineStatus from '@/components/profile/OnlineStatus';

export default function StaffProfileCard() {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill />} />
        <CircleButton icon={<SlOptions />} />
      </div>
      <BigAvatar src='/images/teacher_1.png' />
      <div className='h-10' />
      <div className='text-xl font-extrabold'>Staff Name</div>
      <OnlineStatus status='online' />
      <div className='h-8' />
      <GridTabBar
        selected={0}
        items={[
          {
            icon: <RiDashboardFill className='h-5 w-5' />,
            label: 'Dashboard',
          },
          {
            icon: <RiDashboardFill className='h-5 w-5' />,
            label: 'Class List',
          },
          {
            icon: <RiDashboardFill className='h-5 w-5' />,
            label: 'Time Table',
          },
          {
            icon: <RiDashboardFill className='h-5 w-5' />,
            label: 'Activity',
          },
        ]}
      />
      <div className='h-48' />
      <div className='text-[#ADB8CC]'>Contact School</div>
      <div className='h-2' />
      <div className='flex space-x-3 rounded-full border-2 border-[#EDEFF2] p-3'>
        <MdLocalPhone className='h-5 w-5 text-[#FF6633]' />
        <MdMail className='h-5 w-5 text-[#29CC39]' />
        <MdChromeReaderMode className='h-5 w-5 text-[#8833FF]' />
        <BsFillSendFill className='h-5 w-5 text-[#33BFFF]' />
        <RiWhatsappFill className='h-5 w-5 text-green-500' />
      </div>
    </div>
  );
}
