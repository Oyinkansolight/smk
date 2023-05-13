'use client';

import Button from '@/components/buttons/Button';
import Pill from '@/components/buttons/Pill';
import {
  BasicCard,
  IndividualTotal,
  SchoolTotalCard,
  ToggleCard,
} from '@/components/cards';
import { BarChart, StreamChart } from '@/components/charts';
import AddSingleSchool from '@/components/modal/addSchool';
import { AdSlider } from '@/components/sliders';
import logger from '@/lib/logger';
import { useGetDashboardOverview } from '@/server/dashboard';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import StudentBadge from '~/svg/student_badge.svg';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetDashboardOverview();
  logger(data);
  return (
    <div className='layout flex flex-col gap-[27px] px-4 pt-6'>
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
        <AddSingleSchool
          onClickHandler={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}

      <div className='flex flex-col gap-3 md:gap-[20px] lg:flex-row xl:gap-[24px]'>
        <SchoolTotalCard count={data?.data?.Total_Schools ?? 0} />
        <div className='grid w-full grid-cols-2 gap-x-6 gap-y-[21px]'>
          <IndividualTotal
            count={data?.data?.Total_ECCDE ?? 0}
            name='ECCDE'
            variant='secondary'
            link='/super-admin/eccde'
          />
          <IndividualTotal
            count={data?.data?.Total_Primary ?? 0}
            name='Primary School'
            link='/super-admin/primary'
            variant='secondary'
          />
          <IndividualTotal
            count={data?.data?.Total_Secondary ?? 0}
            name='Secondary School'
            link='/super-admin/eccde'
            variant='secondary'
          />
          <IndividualTotal
            count={data?.data?.Total_Tertiary ?? 0}
            name='Tertiary School'
            link='/super-admin/tertiary'
            variant='tertiary'
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
            count={data?.data?.Total_Students ?? 0}
            name='Total Students'
            variant='primary'
            link='/super-admin/all-student'
          />
          <IndividualTotal
            count={data?.data?.Total_Teachers ?? 0}
            name='Total Teachers'
            variant='primary'
            link='/super-admin/all-staff'
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
            {/* <BasicCard className='h-fit !bg-[#FFDC4F]'>
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
            </BasicCard> */}

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
