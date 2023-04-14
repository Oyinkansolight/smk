'use client';

import AddStudent from '@/components/modal/AddSingleSchool';
import Button from '@/components/buttons/Button';
import Pill from '@/components/buttons/Pill';
import {
  BasicCard,
  IndividualTotal,
  SchoolTotalCard,
  ToggleCard,
} from '@/components/cards';
import { BarChart, StreamChart } from '@/components/charts';
import { CircularCounter } from '@/components/counter';
import { AdSlider } from '@/components/sliders';
import { useGetDashboardOverview } from '@/server/dashboard';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import StudentBadge from '~/svg/student_badge.svg';

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

const percentageData = [
  {
    title: 'Query Schools',
    percentage: 70,
  },
  {
    title: 'Query Schools',
    percentage: 50,
  },
  {
    title: 'Query Schools',
    percentage: 90,
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
  const [isOpen, setIsOpen] = useState(false);

  const data = useGetDashboardOverview();
  return (
    <div className='flex flex-col gap-[27px] px-4 pt-6'>
      <div className='flex justify-end'>
        <Button
          className='max-w-[169px] text-right'
          onClickHandler={() => {
            setIsOpen(true);
          }}
        >
          <div className='flex flex-row items-center gap-2'>
            <BsPlus className='h-[20px] w-[20px]' />
            <div>Add School</div>
          </div>
        </Button>
      </div>
      {isOpen && (
        <AddStudent
          onClickHandler={() => {
            setIsOpen(isOpen);
          }}
        />
      )}

      <div className='flex flex-col gap-3 md:gap-[20px] lg:flex-row xl:gap-[24px]'>
        <SchoolTotalCard count={data.data?.totalInstitutions ?? 0} />
        <div className='grid w-full grid-cols-2 gap-x-6 gap-y-[21px]'>
          <IndividualTotal
            count={data.data?.totalEccdeInstitutions ?? 0}
            name='Nursery School'
            variant='secondary'
          />
          <IndividualTotal
            count={data.data?.totalPrimaryInstitutions ?? 0}
            name='Primary School'
            variant='secondary'
          />
          <IndividualTotal
            count={data.data?.totalSecondaryInstitutions ?? 0}
            name='Secondary School'
            variant='secondary'
          />
          <IndividualTotal
            count={data.data?.totalTertiaryInstitutions ?? 0}
            name='Tertiary School'
            variant='secondary'
          />
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='mb-[31px] text-right'>
          <select className='border-0 bg-transparent text-[14px] text-[#1C1C1C]'>
            <option value='Manage Widgets'>Manage Widgets</option>
          </select>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <IndividualTotal
            count={243}
            name='Total Students'
            variant='primary'
          />
          <IndividualTotal
            count={243}
            name='Total Teachers'
            variant='primary'
          />
        </div>

        <div className='mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2'>
          <div className='flex flex-col justify-between'>
            <BasicCard className='min-h-[269px] w-full !rounded-[10px] !bg-[#F6EFFF]'>
              <div className='flex flex-col gap-y-8'>
                <div className='text-lg font-bold text-[#450065]'>
                  Attendance Tracker
                </div>

                <div className='h-[150px]'>
                  <BarChart />
                </div>
              </div>
            </BasicCard>
          </div>

          <div className='flex flex-col gap-y-7'>
            <ToggleCard
              className='min-h-[269px] w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
              title='Recently Added'
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
          </div>
        </div>

        <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2'>
          <div className='flex flex-col gap-y-7'>
            <BasicCard className='h-fit !bg-[#FFDC4F]'>
              <div className='mb-7 text-lg font-bold text-[#450065]'>
                Info Tracker
              </div>

              <div className='grid grid-cols-1 items-center justify-center gap-x-6 gap-y-8 md:grid-cols-3'>
                {percentageData.map((item, index) => (
                  <div
                    key={index}
                    className='flex h-[130px] w-[100px] flex-col items-center justify-center gap-1 rounded-[10px] bg-white px-3 py-[6px]'
                  >
                    <CircularCounter
                      total={item.percentage}
                      variant='secondary'
                    />
                    <div className='whitespace-nowrap font-extrabold text-[#333333]'>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </BasicCard>

            <div className='flex flex-col gap-[23px] rounded-[10px] bg-white px-[33px] py-4'>
              <div className='text-lg font-bold text-[#450065]'>
                Ad Generator
              </div>
              <AdSlider />
            </div>
          </div>

          <div className='flex flex-col gap-7'>
            <ToggleCard
              toggle={false}
              title='Login Logs'
              className='relative h-[165px] w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
            >
              <div className='absolute bottom-0 left-0 h-[70px] w-full'>
                <StreamChart />
              </div>
            </ToggleCard>

            <ToggleCard
              kebab
              className='w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
              title='Event/Calendar'
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
              title='Transfer Requests'
            >
              <div className='flex flex-col gap-y-5'>
                <div className='flex flex-row items-center gap-x-[22.5px]'>
                  <StudentBadge className='h-[60px] w-[60px]' />

                  <div className='flex w-full flex-row items-center justify-between'>
                    <div className='flex flex-col gap-2'>
                      <div className='font-bold text-[#4D5E80]'>
                        Staff Request
                      </div>
                      <div className='font-bold text-[#ADB8CC]'>
                        Auchi Polytechnic
                      </div>
                    </div>

                    <div className='text-[14px] font-bold text-[#4D5E80]'>
                      21-02-23
                    </div>
                  </div>
                </div>
              </div>
            </ToggleCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
