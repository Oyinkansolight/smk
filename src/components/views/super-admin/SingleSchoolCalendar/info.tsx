import NextImage from '@/components/NextImage';
import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { BsFillSendFill } from 'react-icons/bs';
import { MdChromeReaderMode, MdLocalPhone, MdMail } from 'react-icons/md';
import { RiUserFill, RiWhatsappFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';

export default function StudentTeacherProfileCard({
  // session,
  sessionname,
  schoolType,
}: {
  sessionname?: string | null;
  session?: string | null;
  schoolType?: string | null;
}) {
  const [currentGrid, setCurrentGrid] = useState(0);

  const handleToggleGrid = (index: number) => {
    setCurrentGrid(index);
  };

  return (
    <div className='flex flex-col items-center px-10 pt-5'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill className='h-4 w-4' />} />
        <CircleButton icon={<SlOptions className='h-4 w-4' />} />
      </div>
      <NextImage
        src='/svg/calendar.svg'
        width={150}
        height={99}
        alt='calendar_mini'
      />
      <div className='font-bold text-lg text-center'>{sessionname}</div>
      <div className='h-20' />

      <GridTabBar
        variant='secondary'
        selected={currentGrid}
        onSelect={handleToggleGrid}
        items={[
          {
            icon: <BiListCheck className='h-7 w-7' />,
            label: `${schoolType}`,
          },
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
