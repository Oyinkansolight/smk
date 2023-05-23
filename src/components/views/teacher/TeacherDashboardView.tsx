import NextImage from '@/components/NextImage';
import { BasicCard } from '@/components/cards';
import SmallTeacherCard from '@/components/views/teacher/SmallTeacherCard';
import clsxm from '@/lib/clsxm';
import { DashboardOverview } from '@/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';

const StreamChart = dynamic(() => import('../../charts/Stream'), {
  ssr: false,
});

const timeLineData = [
  {
    image: '/images/teacher_step_1.png',
    title: 'MR. Gbadamosi’s Class',
    details: '1:32 AM',
  },
  {
    image: '/images/teacher_step_2.png',
    title: 'Mrs. Erhveba’s Class',
    details: '1:32 AM',
  },
  {
    image: '/images/teacher_step_3.png',
    title: 'Submitted a bug',
    details: 'Yesterday 12:39 AM',
  },
  {
    image: '/images/teacher_step_4.png',
    title: 'Modified A data in Page X',
    details: 'Aug 11',
  },
  {
    image: '/images/teacher_step_2.png',
    title: 'Mrs. Erhveba’s Class',
    details: '3:30 PM',
  },
];

const quickActions = [
  'New Report',
  'Add Item',
  'Mange Schedule',
  'Mark Assignment',
];

interface TeacherDashboardViewProps {
  overviewData: DashboardOverview | undefined;
  handleTabChange: (tab: number) => void;
}
export default function TeacherDashboardView({
  overviewData,
  handleTabChange,
}: TeacherDashboardViewProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex p-6 justify-between bg-white rounded-lg my-4'>
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#008146]' />}
          subtitle='Total Students'
          title='50'
          className='bg-[#E3FFF5]'
        />
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#7D8FB3]' />}
          subtitle='Total Students'
          title='47'
          className='bg-[#F4F9FF]'
        />
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#D794C8]' />}
          subtitle='Total Students'
          title='3'
          className='bg-[#F9F3FF]'
        />
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#D794C8]' />}
          subtitle='Total Students'
          title='3'
          className='bg-[#FFF3F3]'
        />
      </div>
      <div className='grid grid-cols-2 gap-10'>
        <div className='grid grid-rows-2 gap-6'>
          <BasicCard className='flex flex-col gap-4 w-[476px] !rounded-2xl'>
            <div className='h4'>Next Class</div>
            <NextClassCard isActive />
            <NextClassCard />
            <div className='font-bold text-right'>See all</div>
          </BasicCard>

          <BasicCard className='flex flex-col gap-4 w-[476px] !rounded-2xl'>
            <div className='relative'>
              <div className='h4'>Unread Messages</div>
              <div className='absolute w-[6px] h-[6px] bg-[#E5002B] rounded-full top-0 ml-40' />
            </div>
            <NextClassCard />
            <NextClassCard isActive />
            <div className='font-bold text-right'>See all</div>
          </BasicCard>
        </div>

        <BasicCard className='flex flex-col gap-4 w-[476px] !rounded-2xl'>
          <div className='h4'>Assignments</div>
          <AssignmentsCard />
          <AssignmentsCard isActive />
          <AssignmentsCard />
          <AssignmentsCard />
          <AssignmentsCard />
          <div className='font-bold text-right'>View all</div>
        </BasicCard>
      </div>
    </div>
  );
}

const NextClassCard = ({ isActive = false }) => {
  const [active] = useState(isActive);
  return (
    <BasicCard
      className={clsxm(
        active ? '!bg-[#6A2B56] text-[#EFF7F6]' : '!bg-[#EFF7F6]',
        '!rounded-[5px] h-24 !px-4 !py-6'
      )}
    >
      <div className='flex flex-row gap-6'>
        <NextImage
          width={50}
          height={50}
          alt='Stacked Books'
          src='/images/book_stack.png'
          className={clsxm(
            active ? 'ring-white' : 'ring-[#DADEE6]',
            'ring-[0.1px] ring-offset-1 p-1 rounded-full h-fit'
          )}
        />

        <div className='flex flex-row gap-3 items-center'>
          <div className='flex flex-col gap-1'>
            <div className='text-[10px] leading-[12px]'>Subject:</div>
            <div className='text-[10px] leading-[12px]'>Class:</div>
            <div className='text-[10px] leading-[12px]'>Time:</div>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='text-xs font-bold leading-[14px]'>Mathematics</div>
            <div className='text-xs font-bold leading-[14px]'>Primary 1A</div>
            <div className='text-xs font-bold leading-[14px]'>
              12:00 PM - 01:00 PM
            </div>
          </div>

          <div className='flex gap-3'></div>
        </div>
      </div>
    </BasicCard>
  );
};

const AssignmentsCard = ({ isActive = false }) => {
  const [active] = useState(isActive);
  return (
    <BasicCard
      className={clsxm(
        active ? 'border !border-[#E5002B] text-[#E5002B]' : 'text-[#746D69]',
        '!rounded-[5px] h-24 !px-4 !py-6 !bg-[#EFF7F6]'
      )}
    >
      <div className='flex flex-row gap-6'>
        <NextImage
          width={50}
          height={50}
          alt='Stacked Books'
          src='/images/book_stack.png'
          className={clsxm(
            active ? 'ring-white' : 'ring-[#DADEE6]',
            'ring-[0.1px] ring-offset-1 p-1 rounded-full h-fit'
          )}
        />

        <div className='flex flex-row gap-3 items-center'>
          <div className='flex flex-col gap-1'>
            <div className='text-[10px] leading-[12px]'>Subject:</div>
            <div className='text-[10px] leading-[12px]'>Class:</div>
            <div className='text-[10px] leading-[12px]'>Time:</div>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='text-xs font-bold leading-[14px]'>Mathematics</div>
            <div className='text-xs font-bold leading-[14px]'>Primary 1A</div>
            <div className='text-xs font-bold leading-[14px]'>
              12:00 PM - 01:00 PM
            </div>
          </div>

          <div className='flex gap-3'></div>
        </div>
      </div>
    </BasicCard>
  );
};
