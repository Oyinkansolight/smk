import { StudentTeacherBadge } from '@/components/badges';
import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import { AiFillCloud } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { RiUserFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
import ReactSelect from 'react-select';

interface StudentTeacherProfileCardProps {
  image: string;
  name: string;
  school: string;
  id: string | number;
  student: boolean;
  showAcademicYear?: boolean;
  currentGridIdx?: number;
  setGridIdx?: (value: number) => void;
}

export default function StudentTeacherProfileCard({
  image,
  name,
  school,
  student,
  id,
  showAcademicYear,
  currentGridIdx,
  setGridIdx,
}: StudentTeacherProfileCardProps) {
  return (
    <div className='flex flex-col items-center px-10 pt-5'>
      <div className='flex w-full justify-between'>
        <CircleButton icon={<RiUserFill className='h-4 w-4' />} />
        <CircleButton icon={<SlOptions className='h-4 w-4' />} />
      </div>
      <BigAvatar src={image} />
      <div className='h-10' />
      <div className='mb-1 text-xl font-bold'>{name}</div>

      <div className='h-3' />

      <div className='flex flex-col gap-[15px] mb-4'>
        <StudentTeacherBadge title='Name of School' text={school} />
        <StudentTeacherBadge
          title={student ? 'Student ID' : 'Staff ID'}
          text={id}
        />
      </div>

      {showAcademicYear && (
        <ReactSelect
          value={{ label: 'Academic Year 2022/2023' }}
          className='w-full my-4 !bg-[#EFFFF6]'
          classNames={{ control: () => '!bg-[#EFFFF6] font-bold' }}
          options={[{ label: 'Academic Year 2022/2023' }]}
        />
      )}

      <GridTabBar
        variant='primary'
        selected={currentGridIdx}
        onSelect={setGridIdx}
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
            label: student ? 'Manage Subject' : 'Contacts',
          },
          {
            icon: <AiFillCloud className='h-5 w-5' />,
            label: 'Library',
          },
        ]}
      />
      <div className='h-20' />
    </div>
  );
}
