'use client';

import { IndividualTotal, SchoolTotalCard } from '@/components/cards';
import GenericChart from '@/components/cards/GenericChart';
import { BarChart } from '@/components/charts';
import AttendanceRate from '@/components/charts/AttendanceRate';
import EnrolmentAnalysis from '@/components/charts/EnrolmentAnalysis';
import GenderDistribution from '@/components/charts/GenderDistribution';
import SuperGenderDistribution from '@/components/charts/SuperGenderDistribution';
import AddSingleSchool from '@/components/modal/addSchool';
import EventCalendarTable from '@/components/tables/EventCalendarTable';
import LoginLogsTable from '@/components/tables/LoginLogsTable';
import RecentlyAddedInstitutions from '@/components/tables/RecentlyAddedInstitutions';
import SuperTransferRequestsTable from '@/components/tables/SuperTransferRequestsTable';
import DataGenerator from '@/components/views/admin/DataGenerator';
import { useGetDashboardOverview } from '@/server/dashboard';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import StudentBadge from '~/svg/student_badge.svg';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminType, setAdminType] = useState<string | undefined>();

  const { data } = useGetDashboardOverview();

  useEffect(() => {
    const AT = Cookies.get('adminType');
    setAdminType(AT);
  }, []);

  const handleSetOpen = (value: boolean) => setIsOpen(value);

  return (
    <div className='layout flex flex-col gap-[27px] px-4 pt-6'>
      <div className='flex h1 mb-7'>Welcome</div>

      {isOpen && (
        <AddSingleSchool
          onClickHandler={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}

      <div className='flex gap-5 w-full'>
        <div
          className={` ${
            adminType === 'NORMAL' ? 'w-4/5' : 'w-full'
          }  'flex flex-col gap-[10px]  md:w-full bg-white rounded-[10px] p-5`}
        >
          <h1 className='font-bold text-[28px] leading-[27px]'>
            Dashboard Statistic
          </h1>

          <div className='flex flex-col gap-3 md:gap-[20px] mt-4 lg:flex-row xl:gap-[24px]'>
            <SchoolTotalCard
              count={data?.Total_Schools ?? 0}
              handleSetOpen={handleSetOpen}
              adminType={adminType}
            />

            {adminType === 'SUPER' && (
              <div className='grid w-full md:grid-cols-2 gap-x-6 gap-y-[10px] bg-[#EDF5F2] p-5 rounded-[10px] max-w-full'>
                <IndividualTotal
                  count={data?.Total_ECCDE ?? 0}
                  name='ECCDE'
                  variant='secondary'
                  link='/super-admin/eccde'
                />
                <IndividualTotal
                  count={data?.Total_Primary ?? 0}
                  name='Primary School'
                  link='/super-admin/primary'
                  variant='secondary'
                />
                <IndividualTotal
                  count={data?.Total_Secondary ?? 0}
                  name='Secondary School'
                  link='/super-admin/secondary'
                  variant='secondary'
                />
                <IndividualTotal
                  count={data?.Total_Tertiary ?? 0}
                  name='Tertiary School'
                  link='/super-admin/tertiary'
                  variant='secondary'
                />
              </div>
            )}

            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-[10px] bg-[#FFF6EC] p-5 rounded-[10px] min-w-[276px]'>
              <IndividualTotal
                count={data?.Total_Students ?? 0}
                name='Total Students'
                variant='primary'
                link='/super-admin/all-student'
              />
              <IndividualTotal
                count={data?.Total_Teachers ?? 0}
                name='Total Teachers'
                variant='primary'
                link='/super-admin/all-staff'
              />
            </div>
          </div>
        </div>
        {adminType === 'NORMAL' && (
          <div className='grid  w-full grid-cols-1 gap-x-6 gap-y-[10px] bg-[#FFFFFF] p-5 rounded-[10px] min-w-[276px]'>
            <div className='flex justify-between items-center'>
              <h5 className='font-bold text-[28px] leading-[27px]'>
                Notifications
              </h5>{' '}
              <div className='border p-2 rounded'> Oct - Nov 2022 </div>
            </div>

            <div className='border bg-gray-300 border-gray-600 rounded '>
              <div className='border-b flex justify-between items-center px-4 py-2'>
                <h5 className=' text-[8px] leading-[18px] text-[#6B7A99]'>
                  Details
                </h5>
                <h5 className=' text-[8px] leading-[18px] text-[#6B7A99]'>
                  Time
                </h5>
              </div>

              {[1, 2, 3, 4, 5].map((v, id) => (
                <div
                  key={id}
                  className='flex justify-between items-center px-4 py-2 border-b'
                >
                  <p className='font-bold text-[#858EA4] text-xs leading-[18px]'>
                    New Institution Sign In
                  </p>
                  <h5 className=' text-[8px] leading-[18px] text-[#858EA4]'>
                    {' '}
                    10:11pm
                  </h5>
                </div>
              ))}
              <div className='bg-white rounded-b-md w-full px-4 py-2'>
                <button className='text-[#008146] text-lg font-light'>
                  View all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <DataGenerator />
      <div className='flex flex-col'>
        <div className='mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2'>
          <div className='flex flex-col gap-y-7'>
            <GenericChart
              titleClassName='bg-[#DADEE6]'
              title='Attendance Tracker'
              content={<BarChart />}
            />
            {/* <GenericChart
              title='Attendance Tracker'
              content={<AttendanceTracker />}
            /> */}

            <GenericChart
              title='Attendance Rate'
              content={<AttendanceRate />}
              className='border-[#EDF5F2]'
              titleClassName='bg-[#EDF5F2]'
            />
            <GenericChart
              title='Gender Distribution'
              content={<GenderDistribution />}
              className='border-[#E8ECF2]'
              titleClassName='bg-[#E8ECF2]'
              contentClassName='bg-[#EBF5F6]'
            />
            <GenericChart
              title='Enrolment Analysis'
              content={<EnrolmentAnalysis />}
            />
            <GenericChart
              title='Low Batteries Notifications'
              content={
                <div className='flex flex-col gap-y-5 px-5'>
                  <div className='flex flex-row items-center gap-x-[22.5px]'>
                    <StudentBadge className='h-[60px] w-[60px]' />

                    <div className='flex w-full flex-row items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <div className='font-bold text-[#4D5E80]'>
                          Victor Akanni
                        </div>
                        <div className='font-bold text-[#ADB8CC]'>
                          Primary 1
                        </div>
                      </div>

                      <span className='text-lg font-bold text-[#F5365C]'>
                        05%
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-row items-center gap-x-[22.5px]'>
                    <StudentBadge className='h-[60px] w-[60px]' />

                    <div className='flex w-full flex-row items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <div className='font-bold text-[#4D5E80]'>
                          Oluwaseyi Owolabi
                        </div>
                        <div className='font-bold text-[#ADB8CC]'>
                          Primary 2
                        </div>
                      </div>

                      <span className='text-lg font-bold text-[#F5365C]'>
                        01%
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-row items-center gap-x-[22.5px]'>
                    <StudentBadge className='h-[60px] w-[60px]' />

                    <div className='flex w-full flex-row items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <div className='font-bold text-[#4D5E80]'>
                          Okafor Chidinma
                        </div>
                        <div className='font-bold text-[#ADB8CC]'>
                          Primary 5
                        </div>
                      </div>

                      <span className='text-lg font-bold text-[#F5365C]'>
                        09%
                      </span>
                    </div>
                  </div>
                </div>
              }
            />
          </div>

          <div className='flex flex-col gap-y-7'>
            <GenericChart
              title='Gender Distribution'
              content={<SuperGenderDistribution />}
              className='border-[#E6FFF7]'
              titleClassName='bg-[#E6FFF7]'
            />

            <GenericChart
              title='Recently Added Institutions'
              content={<RecentlyAddedInstitutions />}
              className='border-[#FFF6EC]'
              titleClassName='bg-[#FFF6EC]'
            />

            <GenericChart
              title='Event/Calendar'
              content={<EventCalendarTable />}
              titleClassName='bg-[#E6FFF7]'
              className='border-[#E6FFF7]'
            />
            <GenericChart
              title='Transfer Requests'
              content={<SuperTransferRequestsTable />}
              titleClassName='bg-[#E8ECF2]'
              className='border-[#E8ECF2]'
            />
            <GenericChart
              title='Admin Login Log'
              content={<LoginLogsTable />}
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
            />
          </div>
        </div>

        {/* <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2'>
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

          {/* <div className='flex flex-col gap-7'>
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
        </div> */}
      </div>
    </div>
  );
};

export default Page;
