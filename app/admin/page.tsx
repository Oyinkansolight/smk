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
import { useGetInstitutionDashboardOverview } from '@/server/dashboard';
import ReactSelect from 'react-select';

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

// const percentageData = [
//   {
//     title: 'Class 1',
//     percentage: 70,
//   },
//   {
//     title: 'Class 2',
//     percentage: 50,
//   },
//   {
//     title: 'Class 3',
//     percentage: 90,
//   },
//   {
//     title: 'Class 4',
//     percentage: 10,
//   },
//   {
//     title: 'Class 5',
//     percentage: 28,
//   },
//   {
//     title: 'Class 6',
//     percentage: 55,
//   },
// ];

const Page = () => {
  const { data } = useGetInstitutionDashboardOverview();

  return (
    <div className='layout flex flex-col gap-[31px] px-4 pt-6'>
      <div className='font-bold text-4xl'>Welcome</div>
      <div className='flex justify-end'>
        <Button variant='secondary'>Add Student +</Button>
      </div>
      <div className='bg-white p-[20px] rounded-[10px]'>
        <div className='text-[#333333] font-bold text-2xl'>
          Your Dashboard Statistic
        </div>
        <div className='grid grid-cols-3 gap-3 md:gap-[20px] xl:gap-[27px]'>
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
            url={ADMIN_ROUTES.ALL_STUDENTS}
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
      <DataGenerator variant='secondary'/>
      <div className='p-[20px] bg-white'>
        <div className='flex justify-end'>
          <ReactSelect placeholder='Manage Widgets' />
        </div>
        <div className='h-[20px]'/>
        <div className='grid grid-cols-2 gap-[20px]'>
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
                title='Class Performance Rate'
                content={<ClassPerformanceRate />}
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