import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import { useState } from 'react';
import { AiFillCloud } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { RiUserFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';

export default function StaffProfileCard() {
  const [currentGrid, setCurrentGrid] = useState(0);

  const handleToggleGrid = (index: number) => {
    setCurrentGrid(index);
  };

  return (
    <div className='hidden lg:flex flex-col items-center px-10 pt-5'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill className='h-4 w-4' />} />
        <CircleButton icon={<SlOptions className='h-4 w-4' />} />
      </div>
      <BigAvatar src='/images/teacher_1.png' />
      <div className='h-10' />
      <div className='mb-1 text-xl font-bold'>Staff Name</div>
      <OnlineStatus status='online' />
      <div className='h-8' />
      <GridTabBar
        selected={currentGrid}
        onSelect={handleToggleGrid}
        items={[
          {
            icon: <BiListCheck className='h-7 w-7' />,
            label: 'Dashboard',
          },
          {
            icon: <RiUserFill className='h-5 w-5' />,
            label: 'Profile',
          },
          {
            icon: <HiUsers className='h-5 w-5' />,
            label: 'Manage Class',
          },
          {
            icon: <AiFillCloud className='h-5 w-5' />,
            label: 'Documents',
          },
        ]}
      />
      {/* <div className='h-20' />
      <div className='text-[#ADB8CC]'>Contact School</div>
      <div className='h-2' />
      <div className='flex space-x-3 rounded-full border-2 border-[#EDEFF2] p-3'>
        <MdLocalPhone className='h-5 w-5 text-[#FF6633]' />
        <MdMail className='h-5 w-5 text-[#29CC39]' />
        <MdChromeReaderMode className='h-5 w-5 text-[#8833FF]' />
        <BsFillSendFill className='h-5 w-5 text-[#33BFFF]' />
        <RiWhatsappFill className='h-5 w-5 text-green-500' />
      </div> */}
    </div>
  );
}
