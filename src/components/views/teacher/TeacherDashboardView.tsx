import NextImage from '@/components/NextImage';
import { BasicCard } from '@/components/cards';
import AcademicCalendar from '@/components/views/teacher/AcademicCalendar';
import SmallTeacherCard from '@/components/views/teacher/SmallTeacherCard';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';

// const StreamChart = dynamic(() => import('../../charts/Stream'), {
//   ssr: false,
// });

// const timeLineData = [
//   {
//     image: '/images/teacher_step_1.png',
//     title: 'MR. Gbadamosi’s Class',
//     details: '1:32 AM',
//   },
//   {
//     image: '/images/teacher_step_2.png',
//     title: 'Mrs. Erhveba’s Class',
//     details: '1:32 AM',
//   },
//   {
//     image: '/images/teacher_step_3.png',
//     title: 'Submitted a bug',
//     details: 'Yesterday 12:39 AM',
//   },
//   {
//     image: '/images/teacher_step_4.png',
//     title: 'Modified A data in Page X',
//     details: 'Aug 11',
//   },
//   {
//     image: '/images/teacher_step_2.png',
//     title: 'Mrs. Erhveba’s Class',
//     details: '3:30 PM',
//   },
// ];

// const quickActions = [
//   'New Report',
//   'Add Item',
//   'Mange Schedule',
//   'Mark Assignment',
// ];

// interface TeacherDashboardViewProps {
//   overviewData: DashboardOverview | undefined;
//   handleTabChange: (tab: number) => void;
// }

// Removed props:
// {
//   overviewData,
//   handleTabChange,
// }: TeacherDashboardViewProps

export default function TeacherDashboardView() {
  return (
    <div className='flex flex-col layout'>
      <div className='flex py-4 px-6 justify-between bg-white rounded-lg my-4 w-full'>
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#008146]' />}
          subtitle='Total Students'
          title='50'
          className='bg-[#E3FFF5]'
        />
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#7D8FB3]' />}
          subtitle='Present today'
          title='47'
          className='bg-[#F4F9FF]'
        />
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#D794C8]' />}
          subtitle='Absent today'
          title='3'
          className='bg-[#F9F3FF]'
        />
        <SmallTeacherCard
          icon={<BiUser className='h-16 w-16 text-[#D794C8]' />}
          subtitle='Late Students'
          title='3'
          className='bg-[#FFF3F3]'
        />
      </div>
      <div className='grid grid-cols-2 gap-10 w-full'>
        <div className='grid grid-rows-2 gap-6 w-full'>
          <BasicCard className='flex flex-col gap-4 min-w-[476px] !rounded-2xl'>
            <div className='h4'>Next Class</div>
            <NextClassCard isActive />
            <NextClassCard />
            <div className='font-bold text-right'>See all</div>
          </BasicCard>

          <BasicCard className='flex flex-col gap-4 min-w-[476px] !rounded-2xl'>
            <div className='relative'>
              <div className='h4'>Unread Messages</div>
              <div className='absolute w-[6px] h-[6px] bg-[#E5002B] rounded-full top-0 ml-40' />
            </div>
            <MessageCard />
            <MessageCard />
            <div className='font-bold text-right'>See all</div>
          </BasicCard>
        </div>

        <BasicCard className='flex flex-col gap-4 min-w-[476px] !rounded-2xl'>
          <div className='h4'>Assignments</div>
          <AssignmentsCard />
          <AssignmentsCard today isActive />
          <AssignmentsCard />
          <AssignmentsCard />
          <AssignmentsCard />
          <div className='font-bold text-right'>View all</div>
        </BasicCard>
      </div>

      <div className='mt-[23px]'>
        <AcademicCalendar />
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

const AssignmentsCard = ({ isActive = false, today = false }) => {
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

        {today ? (
          <div className='text-[#E5002B] ml-6 flex justify-center items-center font-bold'>
            Today
          </div>
        ) : (
          <div className='flex flex-col text-white bg-[#6A2B56] items-center justify-center p-1 rounded-[9px] w-12 h-12 ml-6'>
            <div className='text-[14px]'>Tue</div>
            <div className='font-semibold'>29</div>
          </div>
        )}
      </div>
    </BasicCard>
  );
};

const MessageCard = () => {
  return (
    <BasicCard
      className={clsxm('!rounded-[5px] h-24 !px-4 !py-6 !bg-[#EFF7F6]')}
    >
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-2'>
          <div className='text-[10px] leading-[12px] font-bold'>
            Tola Ogunjimi
          </div>
          <div className='text-[10px] leading-[12px]'>
            I am writing to inform you that my assignment will...
          </div>
        </div>

        <div>3 hrs ago</div>
      </div>
    </BasicCard>
  );
};
