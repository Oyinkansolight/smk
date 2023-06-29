/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import { CountCard, SchoolProfileCard } from '@/components/cards';
import SearchInput from '@/components/input/SearchInput';
import TabBar from '@/components/layout/TabBar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Table from '@/components/tables/TableComponent';
import InstitutionBioDetails from '@/components/views/admin/InstitutionBioDetails';
import StaffClassAttendanceReport from '@/components/views/admin/StaffClassAttendanceReport';
import StudentClassAttendanceReport from '@/components/views/admin/StudentClassAttendanceReport';
import ExamReportView from '@/components/views/single-school/ExamReportView';
import SchoolCalendarView from '@/components/views/single-school/SchoolCalendarView';
import SchoolDashboardView from '@/components/views/single-school/SchoolDashboardView';
import Files from '@/components/views/super-admin/Library/Files';
import TaskListView from '@/components/views/teacher/TaskListView';
import clsxm from '@/lib/clsxm';
import { useGetSchoolById } from '@/server/institution';
import { useGetAllFiles } from '@/server/library';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { BiTrendingUp } from 'react-icons/bi';
import { IoReorderThree } from 'react-icons/io5';
import { MdOutlineSort } from 'react-icons/md';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';
import Select from 'react-select';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

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
  const GovtFilesData = useGetAllFiles('');
  const schoolFilesData: any = [];
  const { data, isLoading } = GovtFilesData;
  const router = useRouter();
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const params = useSearchParams();
  const { data: school } = useGetSchoolById({ id: params?.get('id') });
  return (
    <div className='flex'>
      <SchoolProfileCard
        school={school}
        idx={gridIdx}
        setIdx={(v) => {
          setTabIdx(0);
          setGridIdx(v);
        }}
      />
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
                  label: 'Timetable',
                },
                {
                  icon: <MdOutlineSort className='h-5 w-5' />,
                  label: 'Subject',
                },
                {
                  icon: <IoReorderThree className='h-5 w-5' />,
                  label: 'Exam Report',
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
                  initInstitution={school}
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
                  label: 'Students',
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
            <div className='flex flex-col gap-4'>
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
                  <Select
                    value={{ value: 'all', label: 'All Class Arms' }}
                    options={[{ value: 'all', label: 'All Class Arms' }]}
                  />
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
                    {
                      id: 1234,
                      status: 'inactive',
                      name: 'Akani Egbherve',
                      class: 'Primary 1A',
                      attendance: 70,
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
              <StudentClassAttendanceReport />
            </div>
          )}
        </div>
      )}
      {gridIdx === 3 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Students',
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
            <div className='flex flex-col gap-4'>
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
                    Staff List
                  </div>
                  <Select
                    value={{ value: 'all', label: 'Filter' }}
                    options={[{ value: 'all', label: 'Filter' }]}
                  />
                </div>
                <Table
                  showFilter={false}
                  showSearch={false}
                  columns={studentListColumns}
                  data={[
                    {
                      id: 1234,
                      status: 'online',
                      name: 'Ibrahim Wilson',
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
              <StaffClassAttendanceReport />
            </div>
          )}
        </div>
      )}
      {gridIdx === 4 && (
        <div className='flex flex-1 flex-col gap-[31px] px-4 pt-6'>
          <div className='flex w-full items-center justify-between'>
            <TabBar
              variant='primary'
              selected={tabIdx}
              onSelect={(i) => setTabIdx(i)}
              items={[
                {
                  icon: <RiDashboardFill className='h-5 w-5' />,
                  label: 'Government Library',
                },
                {
                  icon: <BiTrendingUp className='h-5 w-5' />,
                  label: 'Institution Library',
                },
              ]}
            />

            <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />

            <div className='h-full border-b-[2px] border-[#EDEFF2]'>
              <SearchInput placeholder='Search Tasks' className='pt-[14px]' />
            </div>
          </div>

          {tabIdx === 0 && (
            <Files data={data} isLoading={isLoading} variant='secondary' />
          )}
          {tabIdx === 1 && (
            <Files
              data={schoolFilesData}
              isLoading={isLoading}
              variant='secondary'
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SingleSchoolDashboard;
