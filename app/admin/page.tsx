'use client';

import Button from '@/components/buttons/Button';
import CountCardAlt from '@/components/cards/CountAlt';
import GenericChart from '@/components/cards/GenericChart';
import AdminAttendanceRate from '@/components/charts/AdminAttendanceRate';
import AttendanceTracker from '@/components/charts/AttendanceTracker';
import ClassPerformanceRate from '@/components/charts/ClassPerformanceRate';
import GenderDistribution from '@/components/charts/GenderDistribution';
import EmptyView from '@/components/misc/EmptyView';
import ClockInClockOutTable from '@/components/tables/ClockInClockOutTable';
import EventCalendarTable from '@/components/tables/EventCalendarTable';
import LoginLogsTable from '@/components/tables/LoginLogsTable';
import TimeTable from '@/components/tables/TimeTable';
import TransferRequestsTable from '@/components/tables/TransferRequestsTable';
import DataGenerator from '@/components/views/admin/DataGenerator';
import { ADMIN_ROUTES } from '@/constant/routes';
import { useGetProfile } from '@/server/auth';
import { useGetInstitutionDashboardOverview } from '@/server/dashboard';
import Link from 'next/link';
import ReactSelect from 'react-select';
import StudentBadge from '~/svg/student_badge.svg';

const Page = () => {
  const { data } = useGetInstitutionDashboardOverview();
  const { data: institutionProfile } = useGetProfile();

  return (
    <div className='layout flex flex-col gap-[31px] px-4 pt-6'>
      <div className='font-bold text-4xl truncate sm:max-w-[450px] md:max-w-max'>
        Welcome, {institutionProfile?.userInfo?.esiAdmin?.instituteName}
      </div>
      <div className='flex justify-end'>
        <Link href='/admin/add-student'>
          <Button variant='secondary'>Add Student +</Button>
        </Link>
      </div>
      <div className='bg-white p-[20px] rounded-[10px]'>
        <div className='text-[#333333] font-bold text-2xl mb-5'>
          Your Dashboard Statistic
        </div>
        <div className='grid md:grid-cols-3 sm:grid-cols-2  gap-3 md:gap-[20px] xl:gap-[27px]'>
          <CountCardAlt
            count={data?.Total_Students ?? 0}
            title='Total Students'
            viewAllLabel='View All Students'
            url={ADMIN_ROUTES.ALL_STUDENTS}
          />
          <CountCardAlt
            count={data?.Total_Staff ?? 0}
            title='Total Staff'
            viewAllLabel='View All Staff'
            url={ADMIN_ROUTES.ALL_STAFF}
            variant={1}
          />
          <CountCardAlt
            count={data?.Total_Grades ?? 0}
            title='Total Classes'
            viewAllLabel='View All Classes'
            url={ADMIN_ROUTES.ALL_GRADES}
            variant={2}
          />
        </div>
      </div>
      <DataGenerator variant='secondary' />
      <div className='p-[20px] bg-white'>
        <div className='flex justify-end'>
          <ReactSelect placeholder='Manage Widgets' />
        </div>
        <div className='h-[20px]' />
        <div className='grid md:grid-cols-2 gap-[20px]'>
          <div>
            <div className='rounded-xl p-[20px] gap-[20px] flex flex-col bg-[#F4F9F6]'>
              <GenericChart
                title='Attendance Tracker'
                content={<AttendanceTracker />}
              />
              <GenericChart
                title='Attendance Rate'
                content={<AdminAttendanceRate />}
              />
              <GenericChart
                title='Gender Distribution'
                content={<GenderDistribution />}
              />
              <GenericChart
                title='Enrolment Analysis'
                content={<EmptyView label='Not Applicable' />}
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
              <GenericChart
                title='Class Performance Rate'
                content={<ClassPerformanceRate />}
              />
            </div>
          </div>
          <div>
            <div className='rounded-xl p-[20px] gap-[20px] flex flex-col bg-[#F4F9FF]'>
              <GenericChart
                title='Recently Added Student'
                content={<EmptyView label='Not Applicable' />}
              />
              <GenericChart
                title='Event/Calendar'
                content={<EventCalendarTable />}
              />
              <GenericChart title='Time Table' content={<TimeTable />} />
              <GenericChart
                title='Transfer Requests'
                content={<TransferRequestsTable />}
              />
              <GenericChart title='Login Logs' content={<LoginLogsTable />} />
              <GenericChart
                title='Click In/Clock Out Logs'
                content={<ClockInClockOutTable />}
              />
              <GenericChart
                title='Subject Performance Rate'
                content={<ClassPerformanceRate />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
