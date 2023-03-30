'use client';

import commaNumber from 'comma-number';
import { GoChevronRight } from 'react-icons/go';

import Pill from '@/components/buttons/Pill';
import { CalendarStepper, EventCalendar } from '@/components/calendars';
import { BasicCard, CountCard, ToggleCard } from '@/components/cards';
import { BarChart } from '@/components/charts';
const StreamChart = dynamic(
  () => import('../../src/components/charts/Stream'),
  { ssr: false }
);
import dynamic from 'next/dynamic';

import { CircularCounter } from '@/components/counter';
import PrimaryLink from '@/components/links/PrimaryLink';
import { InstitutionSlider } from '@/components/sliders';

import StudentBadge from '~/svg/student_badge.svg';

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

const percentageData = [
  {
    title: 'Class 1',
    percentage: 70,
  },
  {
    title: 'Class 2',
    percentage: 50,
  },
  {
    title: 'Class 3',
    percentage: 90,
  },
  {
    title: 'Class 4',
    percentage: 10,
  },
  {
    title: 'Class 5',
    percentage: 28,
  },
  {
    title: 'Class 6',
    percentage: 55,
  },
];

// const streamData = [
//     {
//         Raoul: 97,
//         Josiane: 95,
//         Marcel: 46,
//         René: 22,
//         Paul: 97,
//         Jacques: 84,
//     },
//     {
//         Raoul: 32,
//         Josiane: 62,
//         Marcel: 131,
//         René: 132,
//         Paul: 160,
//         Jacques: 137,
//     },
//     {
//         Raoul: 43,
//         Josiane: 51,
//         Marcel: 88,
//         René: 95,
//         Paul: 117,
//         Jacques: 91,
//     },
//     {
//         Raoul: 26,
//         Josiane: 68,
//         Marcel: 182,
//         René: 147,
//         Paul: 115,
//         Jacques: 134,
//     },
//     {
//         Raoul: 92,
//         Josiane: 139,
//         Marcel: 70,
//         René: 142,
//         Paul: 49,
//         Jacques: 39,
//     },
//     {
//         Raoul: 51,
//         Josiane: 150,
//         Marcel: 92,
//         René: 151,
//         Paul: 67,
//         Jacques: 170,
//     },
//     {
//         Raoul: 193,
//         Josiane: 84,
//         Marcel: 139,
//         René: 147,
//         Paul: 143,
//         Jacques: 168,
//     },
//     {
//         Raoul: 185,
//         Josiane: 175,
//         Marcel: 136,
//         René: 113,
//         Paul: 136,
//         Jacques: 62,
//     },
//     {
//         Raoul: 43,
//         Josiane: 140,
//         Marcel: 98,
//         René: 65,
//         Paul: 127,
//         Jacques: 162,
//     },
// ];

const Page = () => {
  return (
    <div className='flex flex-col gap-[31px] px-4 pt-6'>
      <div className='flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-gray-200'>
        <button className='-px-1 -mb-px inline-flex h-10 items-center whitespace-nowrap border-b-2 border-blue-500 bg-transparent px-2 py-2 text-center text-blue-600 focus:outline-none sm:px-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mx-1 h-4 w-4 sm:h-6 sm:w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
            />
          </svg>

          <span className='mx-1 text-sm sm:text-base'>Profile</span>
        </button>

        <button className='-px-1 cursor-base -mb-px inline-flex h-10 items-center whitespace-nowrap border-b-2 border-transparent bg-transparent px-2 py-2 text-center text-gray-700 hover:border-gray-400 focus:outline-none sm:px-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mx-1 h-4 w-4 sm:h-6 sm:w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
            />
          </svg>

          <span className='mx-1 text-sm sm:text-base'>Account</span>
        </button>

        <button className='-px-1 cursor-base -mb-px inline-flex h-10 items-center whitespace-nowrap border-b-2 border-transparent bg-transparent px-2 py-2 text-center text-gray-700 hover:border-gray-400 focus:outline-none sm:px-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mx-1 h-4 w-4 sm:h-6 sm:w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
            />
          </svg>

          <span className='mx-1 text-sm sm:text-base'>Notification</span>
        </button>
      </div>

      <div className='flex flex-wrap gap-3 md:gap-[20px] xl:gap-[27px]'>
        <CountCard count={12566} title='Total Students' variant='primary' />
        <CountCard count={66} title='Total Staff' variant='secondary' />
        <CountCard count={12} title='Total Grades' variant='tertiary' />
      </div>

      <div className='flex flex-col'>
        <div className='mb-[31px] text-right'>
          <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
            <option value='Manage Widgets'>Manage Widgets</option>
          </select>
        </div>

        <div className='grid grid-cols-1 gap-7 lg:grid-cols-2'>
          <div className='flex flex-col gap-y-7'>
            <ToggleCard
              className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
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
              kebab
              title='Login Logs'
              className='h-[165px] w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
            >
              {/* <AreaChart /> */}
              <div style={{ height: '50vh', margin: '2rem' }}>
                <StreamChart />
              </div>
            </ToggleCard>
          </div>

          <EventCalendar className='h-full !max-h-[450px] w-full overflow-y-hidden lg:max-w-[486px]'>
            <CalendarStepper timeLine={timeLineData} />
          </EventCalendar>
        </div>

        <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2'>
          <ToggleCard
            kebab
            toggle={false}
            className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
            title='Low Batteries Notifications'
          >
            <div className='flex flex-col gap-y-5'>
              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Victor Akanni
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>Primary 1</div>
                  </div>

                  <span className='text-lg font-bold text-[#F5365C]'>05%</span>
                </div>
              </div>

              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Oluwaseyi Owolabi
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>Primary 2</div>
                  </div>

                  <span className='text-lg font-bold text-[#F5365C]'>01%</span>
                </div>
              </div>
            </div>
          </ToggleCard>

          <ToggleCard
            kebab
            className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
            title='Recently Added'
          >
            <div className='flex flex-col gap-y-5'>
              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Avril Price School
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>10:11pm</div>
                  </div>

                  <Pill text='Primary' variant='primary' />
                </div>
              </div>

              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Auchi Polytechnic
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>10:11pm</div>
                  </div>

                  <Pill text='Tertiary' variant='secondary' />
                </div>
              </div>
            </div>
          </ToggleCard>

          <ToggleCard
            kebab
            toggle={false}
            className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
            title='Transfer Requests Out'
          >
            <div className='flex flex-col gap-y-5'>
              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Student Transfer
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>
                      Avril Price School
                    </div>
                  </div>

                  <div className='font-bold'>
                    <span className='text-[#4D5E80]'>21-02-23</span>
                  </div>
                </div>
              </div>

              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Student Transfer
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>
                      Auchi Polytechnic
                    </div>
                  </div>

                  <div className='font-bold'>
                    <span className='text-[#4D5E80]'>21-02-23</span>
                  </div>
                </div>
              </div>
            </div>
          </ToggleCard>

          <ToggleCard
            kebab
            toggle={false}
            className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
            title='Transfer Requests In'
          >
            <div className='flex flex-col gap-y-5'>
              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Student Transfer
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>
                      Avril Price School
                    </div>
                  </div>

                  <div className='font-bold'>
                    <span className='text-[#4D5E80]'>21-02-23</span>
                  </div>
                </div>
              </div>

              <div className='flex flex-row items-center gap-x-[22.5px]'>
                <StudentBadge className='h-[60px] w-[60px]' />

                <div className='flex w-full flex-row items-center justify-between'>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-[#4D5E80]'>
                      Student Transfer
                    </div>
                    <div className='font-bold text-[#ADB8CC]'>
                      Auchi Polytechnic
                    </div>
                  </div>

                  <div className='font-bold'>
                    <span className='text-[#4D5E80]'>21-02-23</span>
                  </div>
                </div>
              </div>
            </div>
          </ToggleCard>
        </div>

        <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2'>
          <BasicCard>
            <div className='mb-7 text-center text-lg font-bold text-[#5E72E4]'>
              Syllabus/Lesson Completion Status
            </div>

            <div className='flex flex-wrap items-center justify-center gap-x-10 gap-y-8'>
              {percentageData.map((item, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center justify-center gap-1'
                >
                  <CircularCounter total={item.percentage} />
                  <div className='font-extrabold text-[#333333]'>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </BasicCard>

          <div className='flex flex-col justify-between'>
            <BasicCard className='min-h-[269px] w-full !rounded-[10px] !bg-[#F6EFFF]'>
              <div className='flex flex-col gap-y-8'>
                <div className='text-lg font-bold text-[#450065]'>
                  Attendance Tracker
                </div>

                <BarChart />
              </div>
            </BasicCard>

            <BasicCard className='relative max-h-[90px] w-full !rounded-2xl !bg-[#FFF6EC]'>
              <div className='flex flex-col gap-2'>
                <div className='text-[14px] font-medium text-[#615F5F]'>
                  Total Late Students
                </div>
                <div className='text-2xl font-semibold text-[#1C1C1C]'>
                  {commaNumber(500)}
                </div>
              </div>

              <div className='absolute right-3 bottom-4'>
                <PrimaryLink href='#'>
                  View all <GoChevronRight />{' '}
                </PrimaryLink>
              </div>
            </BasicCard>
          </div>
        </div>

        <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2'>
          <BasicCard className='relative max-h-[90px] w-full !rounded-2xl !bg-[#FFF6EC]'>
            <div className='flex flex-col gap-2'>
              <div className='text-[14px] font-medium text-[#615F5F]'>
                Total Early Students
              </div>
              <div className='text-2xl font-semibold text-[#1C1C1C]'>
                {commaNumber(4500)}
              </div>
            </div>

            <div className='absolute right-3 bottom-4'>
              <PrimaryLink href='#'>
                View all <GoChevronRight />{' '}
              </PrimaryLink>
            </div>
          </BasicCard>

          <BasicCard className='relative max-h-[90px] w-full !rounded-2xl !bg-[#FFF6EC]'>
            <div className='flex flex-col gap-2'>
              <div className='text-[14px] font-medium text-[#615F5F]'>
                Total Late Teachers
              </div>
              <div className='text-2xl font-semibold text-[#1C1C1C]'>
                {commaNumber(220)}
              </div>
            </div>

            <div className='absolute right-3 bottom-4'>
              <PrimaryLink href='#'>
                View all <GoChevronRight />{' '}
              </PrimaryLink>
            </div>
          </BasicCard>
        </div>

        <div className='mt-7 flex bg-white p-10'>
          <InstitutionSlider />
        </div>
      </div>
    </div>
  );
};

export default Page;
