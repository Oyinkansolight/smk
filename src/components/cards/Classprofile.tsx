import CircleButton from '@/components/buttons/CircleButton';
import GridTabBar from '@/components/layout/GridTabBar';
import { AiFillCloud } from 'react-icons/ai';
import { BiListCheck } from 'react-icons/bi';
import { RiUserFill } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
import ReactSelect from 'react-select';

interface StudentTeacherProfileCardProps {
  image: string;
  name: string;
  school: string;
  id: string;
  student: boolean;
  showAcademicYear?: boolean;
  currentGridIdx?: number;
  setGridIdx?: (value: number) => void;
}

export default function StudentTeacherProfileCard({
  name,

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
      <div className=' h-[117px] w-[117px] rounded-full border-2 p-2 border-[#DADEE6]'>
        <div className='w-full bg-[#00000033] h-full rounded-full grid place-content-center text-white text-2xl font-bold'>
          1A
        </div>
      </div>
      <div className='h-10' />
      <div className='mb-1 text-xl font-bold'>{name}</div>

      <div className='h-3' />

      <div className='flex border rounded-[100px] border-blue-500 px-4 items-center'>
        Class Teacher: <h2 className='text-base ml-2'>James Akanni</h2>
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
            icon: <AiFillCloud className='h-5 w-5' />,
            label: 'Library',
          },
        ]}
      />
      <div className='h-20' />
    </div>
  );
}
