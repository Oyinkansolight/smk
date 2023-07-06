import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import { BsFillCloudyFill, BsFillSendFill } from 'react-icons/bs';
import { FaUser, FaUserFriends } from 'react-icons/fa';
import { MdChromeReaderMode, MdLocalPhone, MdMail } from 'react-icons/md';
import { RiDashboardFill, RiUserFill, RiWhatsappFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';

export default function StudentProfile({
  currentGrid,
  setCurrentGrid,
}: {
  currentGrid?: number;
  setCurrentGrid?: (idx: number) => void;
}) {
  const handleToggleGrid = (index: number) => {
    if (setCurrentGrid) setCurrentGrid(index);
  };

  return (
    <div className='hidden lg:flex max-w-[18rem] flex-col items-center pr-3'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill className='h-4 w-4' />} />
        <CircleButton icon={<SlOptions className='h-4 w-4' />} />
      </div>
      <BigAvatar src='/images/student_1.png' />
      <div className='h-10' />
      <div className='text-xl font-extrabold'>Anthony Mba</div>
      <div className='py-4 text-dodger-500'>Primary 1a</div>
      <OnlineStatus status='online' />
      <div className='grid w-full max-w-[216px] grid-cols-2 gap-4 overflow-hidden whitespace-nowrap py-4'>
        {[
          { title: 'Primary', subtitle: 'Grade' },
          { title: '1A', subtitle: 'Class' },
          { title: '72%', subtitle: 'Student Average' },
          { title: '12', subtitle: 'Subjects' },
        ].map((v, i) => (
          <InfoTab key={i} title={v.title} subtitle={v.subtitle} />
        ))}
      </div>
      <GridTabBar
        variant='secondary'
        selected={currentGrid}
        onSelect={handleToggleGrid}
        items={[
          {
            icon: <RiDashboardFill className='h-5 w-5' />,
            label: 'Dashboard',
          },
          {
            icon: <FaUser className='h-5 w-5' />,
            label: 'Profile',
          },
          {
            icon: <FaUserFriends className='h-5 w-5' />,
            label: 'Contact',
          },
          {
            icon: <BsFillCloudyFill className='h-5 w-5' />,
            label: 'Documents',
          },
        ]}
        buttonActiveClassName='border-fun-green-500 text-fun-green-500'
      />
      <div className='h-12' />
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

const InfoTab = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className='flex w-full flex-col rounded-md bg-[#F8FDFF] p-2 shadow-sm'>
    <div className=' text-xs font-bold'>{title}</div>
    <div className='text-[7.2px] font-light'>{subtitle}</div>
  </div>
);
