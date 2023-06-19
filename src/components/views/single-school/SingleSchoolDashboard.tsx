'use client';

import Button from '@/components/buttons/Button';
import { CountCard, SchoolProfileCard } from '@/components/cards';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Table from '@/components/tables/TableComponent';
import InstitutionBioDetails from '@/components/views/admin/InstitutionBioDetails';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import SchoolCalendarView from '@/components/views/single-school/SchoolCalendarView';
import SchoolDashboardView from '@/components/views/single-school/SchoolDashboardView';
import TaskListView from '@/components/views/teacher/TaskListView';
import clsxm from '@/lib/clsxm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { BiTrendingUp } from 'react-icons/bi';
import { BsArrowRightCircle } from 'react-icons/bs';
import { IoMdTrendingUp } from 'react-icons/io';
import { IoReorderThree } from 'react-icons/io5';
import { MdOutlineSort } from 'react-icons/md';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import ReactSelect from 'react-select';

const studentListColumns: TableColumn<any>[] = [
  { name: 'Number', cell: (row) => <div># {row.id}</div> },
  { name: 'Status', cell: (row) => <OnlineStatus status={row.status} /> },
  { name: 'Name', cell: (row) => <div>{row.name}</div> },
  { name: 'Class', cell: (row) => <div>{row.class}</div> },
  {
    name: 'Attendance Rate',
    cell: (row) => (
      <div className='text-green-500 font-bold'>%{row.attendance}</div>
    ),
  },
];

const SingleSchoolDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridIdx, setGridIdx] = useState(0);
  const router = useRouter();
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  return (
    <div className='flex'>
      <SchoolProfileCard idx={gridIdx} setIdx={setGridIdx} />
      {gridIdx === 0 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Dashboard',
                },
                {
                  icon: <RiCalendar2Fill className='h-5 w-5' />,
                  label: 'Calendar',
                },
                {
                  icon: <MdOutlineSort className='h-5 w-5' />,
                  label: 'Assessment',
                },
                {
                  icon: <IoReorderThree className='h-5 w-5' />,
                  label: 'Exam Report',
                },
                {
                  icon: <IoMdTrendingUp className='h-5 w-5' />,
                  label: 'Attendance Report',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

            <div className='h-full border-b-[2px] border-[#EDEFF2]'>
              <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
            </div>
          </div>

          {tabIdx === 0 && <SchoolDashboardView />}
          {tabIdx === 1 && <SchoolCalendarView />}
          {tabIdx === 2 && <TaskListView />}
          {tabIdx === 3 && (
            <ExamReportView
              report={[
                { name: 'Mathematics', score: 58, date: new Date() },
                { name: 'Mathematics', score: 88, date: new Date() },
                { name: 'Mathematics', score: 45, date: new Date() },
                { name: 'Mathematics', score: 34, date: new Date() },
              ]}
            />
          )}
        </div>
      )}
      {gridIdx === 1 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Account Details',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

            <div className='h-full border-b-[2px] border-[#EDEFF2]'>
              <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
            </div>
          </div>

          {tabIdx === 0 && (
            <>
              <div
                className={clsxm(
                  'flex justify-end gap-5',
                  isEditingBioDetails && 'opacity-50'
                )}
              >
                <Button
                  onClick={() => router.push('/admin/student/edit-history')}
                  disabled={isEditingBioDetails}
                  variant='ghost'
                  className='text-primary bg-white hover:bg-primary-100 border border-primary-500'
                >
                  View Edit History
                </Button>
                <Button
                  disabled={isEditingBioDetails}
                  onClick={() => setIsEditingBioDetails(!isEditingBioDetails)}
                >
                  Edit Account Details
                </Button>
              </div>
              <div className='bg-white px-8'>
                <InstitutionBioDetails
                  isEditing={isEditingBioDetails}
                  setIsEditing={setIsEditingBioDetails}
                />
              </div>
            </>
          )}
        </div>
      )}
      {gridIdx === 2 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Account Details',
                },
                {
                  icon: <BiTrendingUp className='h-5 w-5' />,
                  label: 'Attendance Report',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

            <div className='h-full border-b-[2px] border-[#EDEFF2]'>
              <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
            </div>
          </div>

          {tabIdx === 0 && (
            <div>
              <div className='-mt-[10px] flex flex-row items-center justify-end'>
                <Button
                  variant='outline'
                  className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                >
                  Download Report
                </Button>
              </div>
              <CountCard
                text='72 %'
                title='Average Attendance Rate'
                variant='basic'
              />
              <div className='bg-white rounded-md p-6'>
                <div className='flex justify-between'>
                  <div className='text-[#6B7A99] text-xl font-bold'>
                    Student List
                  </div>
                  <ReactSelect />
                </div>
                <Table
                  showFilter={false}
                  showSearch={false}
                  columns={studentListColumns}
                  data={[
                    {
                      id: 1234,
                      status: 'online',
                      name: 'Akani Egbherve',
                      class: 'Primary 1A',
                      attendance: 88,
                    },
                  ]}
                />
              </div>
            </div>
          )}
          {tabIdx === 1 && (
            <div className='flex flex-col'>
              <div className='-mt-[10px] flex flex-row items-center justify-end'>
                <Button
                  variant='outline'
                  className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                >
                  Download Report
                </Button>
              </div>
              <div className='bg-white rounded-md p-6 border'>
                <div className='flex'>
                  <div className='text-[#6B7A99] text-xl font-bold'>
                    Attendance List
                  </div>
                </div>
                <div className='h-px bg-gray-200 my-4' />
                <div className='flex flex-col gap-2'>
                  {Array(6)
                    .fill(0)
                    .map((v, i) => (
                      <AttendanceListItem key={i} title={`Primary ${i + 1}`} />
                    ))}
                  <AttendanceListItem title='SSS 1 - Science Class' />
                  <AttendanceListItem title='SSS 1 - Social Science Class' />
                  <AttendanceListItem title='SSS 2 - Science Class' />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function AttendanceListItem({ title }: { title: string }) {
  return (
    <div className='flex text-[#6B7A99] font-bold justify-between rounded border shadow-sm border-[#E3E3E3] items-center p-2 '>
      <div>{title}</div>
      <BsArrowRightCircle
        className={clsxm(
          'h-[27px] w-[27px] text-[#C3CAD9] transition-transform duration-300'
        )}
      />
    </div>
  );
}

export default SingleSchoolDashboard;