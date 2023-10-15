import ClassPerformanceRate from '@/components/charts/ClassPerformanceRate'
import EmptyView from '@/components/misc/EmptyView'
import ClockInClockOutTable from '@/components/tables/ClockInClockOutTable'
import EventCalendarTable from '@/components/tables/EventCalendarTable'
import TransferRequestsTable from '@/components/tables/TransferRequestsTable'
import React from 'react'
import GenericChart from '@/components/cards/GenericChart';
import LoginLogsTable from '@/components/tables/LoginLogsTable';
import TimeTable from '@/components/tables/TimeTable';
import { Button } from '@mantine/core'
import Link from 'next/link'
import ReactSelect from 'react-select'
import { ButtonVariant } from '@/components/buttons/Button'
import SearchLoader from '@/components/layout/SearchLoader'
import { useGetAdminCharts } from '@/server/dashboard'
import SuperGenderDistribution from '@/components/charts/SuperGenderDistribution'
import { BarChart } from '@/components/charts'
import AttendanceRate from '@/components/charts/AttendanceRate'
import EnrolmentAnalysis from '@/components/charts/EnrolmentAnalysis'
import LowBatteriesTable from '@/components/tables/LowBatteriesTable'

const AdminCharts = ({
  variant,
  institutionId
}: {
  institutionId?: string;
  variant?: (typeof ButtonVariant)[number];
}) => {
  const { data: chartData, isLoading } = useGetAdminCharts({
    institutionId
  });

  if (!chartData || isLoading) {
    return <SearchLoader />;
  }

  console.log(chartData);

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

      <div className='grid md:grid-cols-2 gap-[20px]'>
        <div>
          <div className='rounded-xl p-[20px] gap-[20px] flex flex-col bg-[#F4F9F6]'>
            <GenericChart
              titleClassName='bg-[#DADEE6]'
              title='Attendance Tracker'
              content={<BarChart data={chartData?.attendanceTracker} />}
            />

            <GenericChart
              title='Attendance Rate'
              content={<AttendanceRate data={chartData?.attendanceRate} institute />}
              className='border-[#EDF5F2]'
              titleClassName='bg-[#EDF5F2]'
            />

            <GenericChart
              title='Gender Distribution'
              className='border-[#E6FFF7]'
              titleClassName='bg-[#E6FFF7]'
              content={<SuperGenderDistribution data={chartData?.genderDistribution} />}
            />

            <GenericChart
              title='Enrolment Analysis'
              content={<EnrolmentAnalysis />}
            />

            <GenericChart
              title='Low Batteries Notifications'
              content={<LowBatteriesTable data={chartData?.lowBatteryUsers} />}
            />

            <GenericChart
              title='Class Performance Rate'
              content={<EmptyView label='No Data' /> ?? <ClassPerformanceRate />}
            />
          </div>
        </div>
        <div>
          <div className='rounded-xl p-[20px] gap-[20px] flex flex-col bg-[#F4F9FF]'>

            <GenericChart
              title='Recently Added Student'
              content={<EmptyView label='No Data' /> ?? <EmptyView label='Not Applicable' />}
            />

            <GenericChart
              title='Event/Calendar'
              titleClassName='bg-[#E6FFF7]'
              className='border-[#E6FFF7]'
              content={<EventCalendarTable data={chartData.events} />}
            />

            <GenericChart title='Time Table' content={<EmptyView label='No Data' /> ?? <TimeTable />} />

            <GenericChart
              title='Transfer Requests'
              content={<EmptyView label='No Data' /> ?? <TransferRequestsTable />}
            />

            <GenericChart
              title='Login Logs'
              content={<LoginLogsTable data={chartData?.loginLogs} />}
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
            />

            <GenericChart
              title='Click In/Clock Out Logs'
              content={<EmptyView label='No Data' /> ?? <ClockInClockOutTable />}
            />

            <GenericChart
              title='Subject Performance Rate'
              content={<EmptyView label='No Data' /> ?? <ClassPerformanceRate />}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminCharts;