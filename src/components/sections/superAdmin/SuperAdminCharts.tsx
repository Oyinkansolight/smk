import Button, { ButtonVariant } from '@/components/buttons/Button';
import GenericChart from '@/components/cards/GenericChart';
import { BarChart } from '@/components/charts';
import AttendanceRate from '@/components/charts/AttendanceRate';
import EnrolmentAnalysis from '@/components/charts/EnrolmentAnalysis';
import LessonTaskCreated from '@/components/charts/LessonTaskCreated';
import LessonTaskRateAssignment from '@/components/charts/LessonTaskRateAssignment';
import LessonTaskRateClasswork from '@/components/charts/LessonTaskRateClasswork';
import LessonTaskRateQuiz from '@/components/charts/LessonTaskRateQuiz';
import SuperGenderDistribution from '@/components/charts/SuperGenderDistribution';
import ChartSkeleton from '@/components/skeletons/Chart';
import EventCalendarTable from '@/components/tables/EventCalendarTable';
import LoginLogsTable from '@/components/tables/LoginLogsTable';
import LowBatteriesTable from '@/components/tables/LowBatteriesTable';
import RecentlyAddedInstitutions from '@/components/tables/RecentlyAddedInstitutions';
import SuperTransferRequestsTable from '@/components/tables/SuperTransferRequestsTable';
import request from '@/server';
import { useGetAdminCharts } from '@/server/dashboard';
import { EnrollmentAnalysis } from '@/types';
import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SuperAdminCharts = ({
  variant,
  setIsDataLoading,
}: {
  variant?: (typeof ButtonVariant)[number];
  setIsDataLoading?: (v: boolean) => void;
}) => {
  const [endPeriod, setEndPeriod] = useState<Date>();
  const [startPeriod, setStartPeriod] = useState<Date>();

  const { data: chartData, isLoading } = useGetAdminCharts({
    endPeriod,
    startPeriod,
  });
  setIsDataLoading && setIsDataLoading(isLoading);

  if (isLoading || !chartData) {
    return (
      <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }
  function HandleDownload() {
    toast.success('Downloading...');
    request
      .get('/v1/government/dashboards/generate-csv-data')
      .then((response) => {
        const link = document.createElement('a');
        link.href = response.data.url;
        link.setAttribute('download', 'filename.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='mt-7 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col gap-y-7'>
            <GenericChart
              title='Enrolment Analysis'
              icon={
                <Button onClickHandler={HandleDownload}>
                  <FiDownload />
                </Button>
              }
              description='Total number of enrolment in the state for 2023/2024'
              content={
                <EnrolmentAnalysis
                  instituteIndex={null}
                  data={chartData?.enrollmentAnalysis as EnrollmentAnalysis}
                />
              }
            />
            <GenericChart
              titleClassName='bg-[#DADEE6]'
              title='Attendance Tracker'
              description='Total number that were present'
              content={
                <BarChart
                  data={chartData?.attendanceTracker}
                  showLink
                  setEndPeriod={setEndPeriod}
                  setStartPeriod={setStartPeriod}
                />
              }
            />

            <GenericChart
              title='Attendance Report'
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
              description='Total rate of attendance in the state'
              content={
                <AttendanceRate data={chartData?.attendanceRate} showLink />
              }
            />
            <GenericChart
              title='Lesson Task Created'
              className='border-[#E6FFF7]'
              titleClassName='bg-[#E6FFF7]'
              description='Total number of weekly task available in the state.'
              content={
                <LessonTaskCreated data={chartData?.lessonTaskCreated} />
              }
            />
            <GenericChart
              title='Assignment Submission Rate'
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
              description='Total Number of Weekly Assignment Submission Rate'
              content={
                <LessonTaskRateAssignment
                  data={chartData?.lessonTaskSubmissions}
                />
              }
            />

            {/* <GenericChart
              title='Gender Distribution'
              className='border-[#E8ECF2]'
              titleClassName='bg-[#E8ECF2]'
              contentClassName='bg-[#EBF5F6]'
              content={<GenderDistribution data={chartData?.genderDistribution} />}
            /> */}
          </div>

          <div className='flex flex-col gap-y-7'>
            <GenericChart
              title='Gender Distribution'
              className='border-[#E6FFF7]'
              titleClassName='bg-[#E6FFF7]'
              description='Total Number of gender in the state'
              content={
                <SuperGenderDistribution data={chartData?.genderDistribution} />
              }
            />

            <GenericChart
              className='border-[#FFF6EC]'
              titleClassName='bg-[#FFF6EC]'
              title='Recently Added Institutions'
              description='View all recently added Institutions'
              content={
                <RecentlyAddedInstitutions
                  data={chartData.recentInstitutions}
                />
              }
            />

            <GenericChart
              title='Event/Calendar'
              titleClassName='bg-[#E6FFF7]'
              className='border-[#E6FFF7]'
              description='Recent events across institutions/state/country'
              content={<EventCalendarTable data={chartData.events} />}
            />
            <GenericChart
              title='Classwork Submission Rate'
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
              description='Total Number of Weekly Classwork Submission Rate'
              content={
                <LessonTaskRateClasswork
                  data={chartData?.lessonTaskSubmissions}
                />
              }
            />
          </div>

          <div className='flex flex-col gap-y-7'>
            <GenericChart
              title='Admin Login Log'
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
              description='Recent admin login logs'
              content={<LoginLogsTable data={chartData?.loginLogs} />}
            />

            <GenericChart
              title='Low Batteries Notifications'
              description='Total number of low batteries in the state'
              content={<LowBatteriesTable data={chartData?.lowBatteryUsers} />}
            />

            <GenericChart
              title='Staff Transfer Requests'
              titleClassName='bg-[#E8ECF2]'
              className='border-[#E8ECF2]'
              description='Recent staff transfer requests in the state'
              content={
                <SuperTransferRequestsTable
                  data={[...chartData.staffTransferRequests]}
                  isStaff
                />
              }
            />

            <GenericChart
              title='Student Transfer Requests'
              titleClassName='bg-[#E8ECF2]'
              className='border-[#E8ECF2]'
              description='Recent student transfer requests in the state'
              content={
                <SuperTransferRequestsTable
                  data={[...chartData.studentTransferRequests]}
                />
              }
            />
            <GenericChart
              title='Quiz Submission Rate'
              titleClassName='bg-[#EDF5F2]'
              className='border-[#EDF5F2]'
              description='Total Number of Weekly Quiz Submission Rate'
              content={
                <LessonTaskRateQuiz data={chartData?.lessonTaskSubmissions} />
              }
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
  );
};

export default SuperAdminCharts;
