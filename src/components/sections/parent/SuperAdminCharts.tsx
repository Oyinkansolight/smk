import { ButtonVariant } from '@/components/buttons/Button';
import GenericChart from '@/components/cards/GenericChart';
import { BarChart } from '@/components/chartsParent';
import AttendanceRate from '@/components/chartsParent/AttendanceRate';
import EnrolmentAnalysis from '@/components/chartsParent/EnrolmentAnalysis';
import SuperGenderDistribution from '@/components/chartsParent/SuperGenderDistribution';
import EmptyView from '@/components/misc/EmptyView';
import ChartSkeleton from '@/components/skeletons/Chart';
import EventCalendarTable from '@/components/tables/EventCalendarTable';
import LoginLogsTable from '@/components/tables/LoginLogsTable';
import LowBatteriesTable from '@/components/tables/LowBatteriesTable';
import RecentlyAddedInstitutions from '@/components/tables/RecentlyAddedInstitutions';
import SuperTransferRequestsTable from '@/components/tables/SuperTransferRequestsTable';
import { useGetAdminCharts } from '@/server/dashboard';
import { EnrollmentAnalysis } from '@/types';
import React from 'react';

const SuperAdminCharts = ({
  variant,
  setIsDataLoading,
}: {
  variant?: (typeof ButtonVariant)[number];
  setIsDataLoading?: (v: boolean) => void;
}) => {
  const { data: chartData, isLoading } = useGetAdminCharts({});

  setIsDataLoading && setIsDataLoading(isLoading);

  if (isLoading || !chartData) {
    return (
      <div className='mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2'>
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <>
      {/* <div className='flex flex-col gap-8 p-[30px]'>
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
      </div> */}

      <div className='flex flex-col'>
        <div className='mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2'>
          <div className='flex flex-col gap-y-7'>
            <GenericChart
              title='Attendance Report'
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
              description='Total rate of attendance in the state'
              content={<AttendanceRate data={chartData?.attendanceRate} />}
            />
          </div>

          <div className='flex flex-col gap-y-7'>
            <GenericChart
              title='Top 5 Subject Performance'
              className='border-[#E6FFF7]'
              titleClassName='bg-[#E6FFF7]'
              description=''
              content={
                <SuperGenderDistribution data={chartData?.genderDistribution} />
              }
            />

            <GenericChart
              title='Academic Calendar'
              titleClassName='bg-[#E6FFF7]'
              className='border-[#E6FFF7]'
              description='Recent events across institutions/state/country'
              content={<EventCalendarTable data={chartData.events} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminCharts;
