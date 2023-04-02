import { CalendarStepper, EventCalendar } from '@/components/calendars';
import { BasicCard, ClockInCountCard, ToggleCard } from '@/components/cards';

import StudentBadge from '~/svg/student_badge.svg';
const StreamChart = dynamic(() => import('../../charts/Stream'), {
  ssr: false,
});
import dynamic from 'next/dynamic';

import QuickActionButton from '@/components/buttons/QuickAction';
import { BarChart } from '@/components/charts';
import ClockInTime from '@/components/views/teacher/ClockInTime';

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

const quickActions = ['Add Item', 'Mange Schedule', 'Mark Assignment'];

export default function TeacherDashboardView() {
  return (
    <>
      <div className='-mt-[10px] flex flex-row items-center justify-between'>
        <div className='text-xl font-bold text-[#6B7A99]'>Dashboard</div>

        <div className='text-right'>
          <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
            <option value='Manage Widgets'>Filter</option>
          </select>
        </div>
      </div>

      <BasicCard className='flex w-full flex-col gap-8 !rounded-[4.5px] bg-white !px-[27px] !pb-[27px] !pt-[18px]'>
        <div className='flex w-full justify-end'>
          <ClockInTime />
        </div>
        <div className='grid grid-cols-2 gap-3 md:gap-[20px] xl:gap-[27px]'>
          <ClockInCountCard
            count={5}
            variant='primary'
            title='Total Attending Subjects'
          />
          <ClockInCountCard
            count={10}
            variant='secondary'
            title='Total Attending Grades'
          />
        </div>
      </BasicCard>

      <BasicCard className='flex w-full flex-col gap-8 !rounded-[4.5px] bg-white !px-[29px] !pb-[27px] !pt-[18px]'>
        <div className='flex flex-col gap-5'>
          <div className='font-bold'>Quick Actions</div>

          <div className='flex flex-wrap gap-x-[77px] gap-y-10'>
            {quickActions.map((action, i) => (
              <QuickActionButton key={i} title={action} />
            ))}
          </div>
        </div>
      </BasicCard>

      <div className=''>
        <div className='flex flex-col'>
          <div className='mb-[31px] text-right'>
            <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
              <option value='Manage Widgets'>Manage Widgets</option>
            </select>
          </div>

          <div className='grid grid-cols-1 gap-7 lg:grid-cols-2'>
            <div className='flex flex-col gap-y-7'>
              <ToggleCard
                className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[586px]'
                title='Students In Class/Online'
              >
                <div className='flex flex-col gap-y-5'>
                  <div className='flex flex-row items-center gap-x-[22.5px]'>
                    <StudentBadge className='h-[60px] w-[60px]' />

                    <div className='flex w-full flex-row items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <div className='font-bold text-[#4D5E80]'>Class 1</div>
                        <div className='font-bold text-[#E5A500]'>70%</div>
                      </div>

                      <div className='font-bold'>
                        <span className='text-[#4D5E80]'>35/</span>
                        <span className='text-[#BBBFC8]'>50</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row items-center gap-x-[22.5px]'>
                    <StudentBadge className='h-[60px] w-[60px]' />

                    <div className='flex w-full flex-row items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <div className='font-bold text-[#4D5E80]'>Class 2</div>
                        <div className='font-bold text-[#E5A500]'>55%</div>
                      </div>

                      <div className='font-bold'>
                        <span className='text-[#4D5E80]'>24/</span>
                        <span className='text-[#BBBFC8]'>25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ToggleCard>

              <ToggleCard
                className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[586px]'
                title='Results'
              >
                <CalendarStepper timeLine={timeLineData} />
              </ToggleCard>

              <ToggleCard
                kebab
                title='Login Logs'
                className='relative h-[165px] w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[586px]'
              >
                <div className='absolute bottom-0 left-0 h-[70px] w-full'>
                  <StreamChart />
                </div>
              </ToggleCard>
            </div>

            <div className='flex flex-col gap-y-[27px]'>
              <EventCalendar className='h-full !max-h-[450px] w-full overflow-y-hidden lg:max-w-[586px]'>
                <CalendarStepper timeLine={timeLineData} />
              </EventCalendar>

              <BasicCard className='min-h-[269px] w-full !rounded-[10px] !bg-[#F6EFFF] lg:max-w-[586px]'>
                <div className='flex flex-col gap-y-8'>
                  <div className='text-lg font-bold text-[#450065]'>
                    Your Clock-In Tracker (Minutes)
                  </div>

                  <div className='h-[150px]'>
                    <BarChart />
                  </div>
                </div>
              </BasicCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
