import BackButton from '@/components/accordions/BackButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { BigAvatar } from '@/components/profile/BigAvatar';
import { BiListCheck } from 'react-icons/bi';
import { RiUserFill } from 'react-icons/ri';

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
    <>
      <div className='hidden lg:flex flex-col items-center px-10 pt-5'>
        <div className='flex w-full justify-between'>
          <BackButton />
        </div>
        <BigAvatar src={image} />
        <div className='h-10' />
        <div className='mb-1 text-xl font-bold'>{name}</div>

        <div className='h-3' />

        <div className='flex flex-col gap-[15px] mb-4'>
          <div className='rounded-2xl bg-yellow-500 p-1 font-medium'>
            Parent
          </div>
        </div>

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
          ]}
        />
        <div className='h-20' />
      </div>

      <div className='flex lg:hidden flex-col items-center px-10 pt-5'>
        <div className='flex w-full justify-between'>
          <BackButton />
        </div>
        <BigAvatar src={image} />
        <div className='h-10' />
        <div className='mb-1 text-xl font-bold'>{name}</div>

        <div className='h-3' />

        <div className='flex flex-col gap-[15px] mb-4'>
          <div className='rounded-2xl bg-yellow-500 py-1 px-2 font-medium'>
            Parent
          </div>
        </div>

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
          ]}
        />
        <div className='h-20' />
      </div>
    </>
  );
}
