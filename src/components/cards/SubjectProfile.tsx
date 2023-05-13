import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import { useState } from 'react';
import { AiFillCloud } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { BsFillSendFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { MdChromeReaderMode, MdLocalPhone, MdMail } from 'react-icons/md';
import { RiUserFill, RiWhatsappFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';

interface StudentTeacherProfileCardProps {
  image?: string;
  name: string;
}

export default function SubjectProfileCard({
  image,
  name,
}: StudentTeacherProfileCardProps) {
  const [currentGrid, setCurrentGrid] = useState(0);

  const handleToggleGrid = (index: number) => {
    setCurrentGrid(index);
  };

  return (
    <div className='hidden md:flex flex-col items-center px-10 pt-5'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill className='h-4 w-4' />} />
        <CircleButton icon={<SlOptions className='h-4 w-4' />} />
      </div>
      {image ? (
        <BigAvatar src={image} />
      ) : (
        <div className='flex h-20 w-20 rounded-full bg-[#B4A69733] uppercase font-extrabold text-5xl justify-center items-center text-gray-300 ring-1 ring-offset-8 ring-gray-300'>
          {name[0]}
        </div>
      )}
      <div className='h-10' />
      <div className='mb-1 text-xl font-bold'>{name}</div>
      <div className='text-primary text-center text-xs font-bold my-2'>
        Edit
      </div>

      <div className='h-3' />

      <div className='text-[#C3CAD9] text-center font-bold mt-4 mb-8'>
        Select School
      </div>

      <GridTabBar
        variant='primary'
        selected={currentGrid}
        onSelect={handleToggleGrid}
        items={[
          {
            icon: <BiListCheck className='h-7 w-7' />,
            label: 'ECCDE',
          },
          {
            icon: <RiUserFill className='h-5 w-5' />,
            label: 'Primary',
          },
          {
            icon: <HiUsers className='h-5 w-5' />,
            label: 'Secondary',
          },
          {
            icon: <AiFillCloud className='h-5 w-5' />,
            label: 'Tertiary',
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
