import React from 'react'
import { BarChart } from '@/components/charts'
import EmptyView from '@/components/misc/EmptyView'
import GenericChart from '@/components/cards/GenericChart';
import AttendanceRate from '@/components/charts/AttendanceRate'
import LoginLogsTable from '@/components/tables/LoginLogsTable'
import EnrolmentAnalysis from '@/components/charts/EnrolmentAnalysis'
import EventCalendarTable from '@/components/tables/EventCalendarTable'
import SuperGenderDistribution from '@/components/charts/SuperGenderDistribution'
import RecentlyAddedInstitutions from '@/components/tables/RecentlyAddedInstitutions'
import SuperTransferRequestsTable from '@/components/tables/SuperTransferRequestsTable'
import { useGetAdminCharts } from '@/server/dashboard';
import Button, { ButtonVariant } from '@/components/buttons/Button';
import Link from 'next/link';
import ReactSelect from 'react-select';
import SearchLoader from '@/components/layout/SearchLoader';
import LowBatteriesTable from '@/components/tables/LowBatteriesTable';

const SuperAdminCharts = ({
  variant,
}: {
  variant?: (typeof ButtonVariant)[number];
}) => {
  const { data: chartData, isLoading } = useGetAdminCharts({

  });

  if (!chartData || isLoading) {
    return <SearchLoader />;
  }

  return (
    <>
      <div className='flex flex-col gap-8 p-[30px]'>
        <div className='flex justify-between'>
          <div className='text-xl font-bold'>Data Generator</div>
          <Link href='#' className='text-[#3361FF] '>
            View Advanced Report
          </Link>
        </div>
        <div className='text-[#6B7A99]'>
          Select the variables that would feed the stat section below.
        </div>
        <div className='grid grid-cols-4 gap-4'>
          <div>
            <ReactSelect
              value={{ value: 'all_classes', label: 'All Classes' }}
              options={[{ value: 'all_classes', label: 'All Classes' }]}
            />
          </div>
          <div>
            <ReactSelect
              value={{ value: 'all_classes', label: 'All Class Arm' }}
              options={[{ value: 'all_classes', label: 'All Class Arm' }]}
            />
          </div>
          <div>
            <ReactSelect
              value={{ value: 'all_classes', label: 'Ally' }}
              options={[{ value: 'all_classes', label: 'Ally' }]}
            />
          </div>
          <Button className='justify-center max-w-[160px]' variant={variant}>
            Apply
          </Button>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2'>
          <div className='flex flex-col gap-y-7'>

            <GenericChart
              titleClassName='bg-[#DADEE6]'
              title='Attendance Tracker'
              content={<BarChart data={chartData?.attendanceTracker} />}
            />

            <GenericChart
              title='Attendance Rate'
              content={<AttendanceRate data={chartData?.attendanceRate} />}
              className='border-[#EDF5F2]'
              titleClassName='bg-[#EDF5F2]'
            />

            {/* <GenericChart
              title='Gender Distribution'
              className='border-[#E8ECF2]'
              titleClassName='bg-[#E8ECF2]'
              contentClassName='bg-[#EBF5F6]'
              content={<GenderDistribution data={chartData?.genderDistribution} />}
            /> */}

            <GenericChart
              title='Enrolment Analysis'
              content={<EnrolmentAnalysis />}
            />

            <GenericChart
              title='Low Batteries Notifications'
              content={<LowBatteriesTable data={chartData?.lowBatteryUsers} />}
            />
          </div>

          <div className='flex flex-col gap-y-7'>
            <GenericChart
              title='Gender Distribution'
              className='border-[#E6FFF7]'
              titleClassName='bg-[#E6FFF7]'
              content={<SuperGenderDistribution data={chartData?.genderDistribution} />}
            />

            <GenericChart
              className='border-[#FFF6EC]'
              titleClassName='bg-[#FFF6EC]'
              title='Recently Added Institutions'
              content={<RecentlyAddedInstitutions data={chartData.recentInstitutions} />}
            />

            <GenericChart
              title='Event/Calendar'
              titleClassName='bg-[#E6FFF7]'
              className='border-[#E6FFF7]'
              content={<EventCalendarTable data={chartData.events} />}
            />

            <GenericChart
              title='Transfer Requests'
              content={<EmptyView label='No Data' /> ?? <SuperTransferRequestsTable />}
              titleClassName='bg-[#E8ECF2]'
              className='border-[#E8ECF2]'
            />

            <GenericChart
              title='Admin Login Log'
              content={<LoginLogsTable data={chartData?.loginLogs} />}
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
    </>
  )
}

export default SuperAdminCharts