import CircleButton from '@/components/buttons/CircleButton';
import Pill from '@/components/buttons/Pill';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import { Institution } from '@/types/institute';
import { AiFillCloud } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { BsFillSendFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { MdChromeReaderMode, MdLocalPhone, MdMail } from 'react-icons/md';
import { RiUserFill, RiWhatsappFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';


export default function SchoolProfileCard({
  idx,
  setIdx,
  school,
}: {
  school?: Institution;
  idx: number;
  setIdx: (idx: number) => void;
}) {
  return (
    <div className='flex flex-col items-center px-10 pt-5'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill className='h-4 w-4' />} />
        <CircleButton icon={<SlOptions className='h-4 w-4' />} />
      </div>
      <BigAvatar src='/svg/student_badge.svg' />
      <div className='h-10' />
      <div className='mb-1 text-xl font-bold'>{school?.instituteName}</div>
      <Pill text='Primary School' variant='primary' />
      <div className='h-8' />
      <GridTabBar
        variant='secondary'
        selected={idx}
        onSelect={setIdx}
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
            label: 'Students',
          },
          {
            icon: <AiFillCloud className='h-5 w-5' />,
            label: 'Staffs',
          },
          {
            icon: <AiFillCloud className='h-5 w-5' />,
            label: 'Library',
          },
          // {
          //   icon: <AiFillCloud className='h-5 w-5' />,
          //   label: 'Settings',
          // },
        ]}
      />
      <div className='h-20' />
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