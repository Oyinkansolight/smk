import AdminAttendanceRate from '@/components/charts/AdminAttendanceRate'
import AttendanceTracker from '@/components/charts/AttendanceTracker'
import ClassPerformanceRate from '@/components/charts/ClassPerformanceRate'
import GenderDistribution from '@/components/charts/GenderDistribution'
import EmptyView from '@/components/misc/EmptyView'
import ClockInClockOutTable from '@/components/tables/ClockInClockOutTable'
import EventCalendarTable from '@/components/tables/EventCalendarTable'
import TransferRequestsTable from '@/components/tables/TransferRequestsTable'
import React from 'react'
import GenericChart from '@/components/cards/GenericChart';
import StudentBadge from '~/svg/student_badge.svg';
import LoginLogsTable from '@/components/tables/LoginLogsTable';
import TimeTable from '@/components/tables/TimeTable';

const AdminCharts = () => {
  // const { data: chartData, isLoading } = useGetAdminCharts({

  // });

  // if (!chartData || isLoading) {
  //   return <SearchLoader />;
  // }
  return (
    <div className='grid md:grid-cols-2 gap-[20px]'>
      <div>
        <div className='rounded-xl p-[20px] gap-[20px] flex flex-col bg-[#F4F9F6]'>
          <GenericChart
            title='Attendance Tracker'
            content={<EmptyView label='No Data' /> ?? <AttendanceTracker />}
          />

          <GenericChart
            title='Attendance Rate'
            content={<EmptyView label='No Data' /> ?? <AdminAttendanceRate />}
          />

          <GenericChart
            title='Gender Distribution'
            content={<EmptyView label='No Data' /> ?? <GenderDistribution />}
          />

          <GenericChart
            title='Enrolment Analysis'
            content={<EmptyView label='No Data' />}
          />

          <GenericChart
            title='Low Batteries Notifications'
            content={
              <EmptyView label='No Data' /> ?? (
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
              )}
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
            content={<EventCalendarTable data={[]} />}
          />

          <GenericChart title='Time Table' content={<EmptyView label='No Data' /> ?? <TimeTable />} />

          <GenericChart
            title='Transfer Requests'
            content={<EmptyView label='No Data' /> ?? <TransferRequestsTable />}
          />

          <GenericChart title='Login Logs' content={<EmptyView label='No Data' /> ?? <LoginLogsTable data={[]} />} />

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
  )
}

export default AdminCharts;