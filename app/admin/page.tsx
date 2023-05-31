'use client';

import Pill from '@/components/buttons/Pill';
import { CalendarStepper, EventCalendar } from '@/components/calendars';
import { BasicCard, CountCard, ToggleCard } from '@/components/cards';
import { BarChart, StreamChart } from '@/components/charts';
import { CircularCounter } from '@/components/counter';
import PrimaryLink from '@/components/links/PrimaryLink';
import { InstitutionSlider } from '@/components/sliders';
import { ADMIN_ROUTES } from '@/constant/routes';
import { useGetInstitutionDashboardOverview } from '@/server/dashboard';
import commaNumber from 'comma-number';
import { GoChevronRight } from 'react-icons/go';
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

const Page = () => {
  const { data } = useGetInstitutionDashboardOverview();

  return (
    <div className='layout flex flex-col gap-[31px] px-4 pt-6'>
      <div className='flex flex-wrap gap-3 md:gap-[20px] xl:gap-[27px]'>
        <CountCard
          variant='primary'
          title='Total Students'
          url={ADMIN_ROUTES.ALL_STUDENTS}
          count={data?.Total_Students ?? 0}
        />
        <CountCard
          variant='secondary'
          title='Total Staff'
          url={ADMIN_ROUTES.ALL_STAFF}
          count={data?.Total_Staff ?? 0}
        />
        <CountCard
          variant='tertiary'
          title='Total Grades'
          url={ADMIN_ROUTES.ALL_GRADES}
          count={data?.Total_Grades ?? 0}
        />
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
              className='relative h-[165px] w-full !rounded-[9px] !px-9 !py-6 shadow-sm lg:max-w-[486px]'
            >
              <div className='absolute bottom-0 left-0 h-[70px] w-full'>
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

                <div className='h-[150px]'>
                  <BarChart />
                </div>
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
