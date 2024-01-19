/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import { SchoolProfileCard } from '@/components/cards';
import TabBar from '@/components/layout/TabBar';
import Table from '@/components/tables/TableComponent';
import InstitutionBioDetails from '@/components/views/admin/InstitutionBioDetails';
import StaffClassAttendanceReport from '@/components/views/admin/StaffClassAttendanceReport';
import StudentClassAttendanceReport from '@/components/views/admin/StudentClassAttendanceReport';
import SchoolDashboardView from '@/components/views/single-school/SchoolDashboardView';
import SchoolSubject from '@/components/views/single-school/Subjects';
import Files from '@/components/views/super-admin/Library/Files';
import clsxm from '@/lib/clsxm';
import {
  useGetSchoolById,
  useGetStudentsListByInstitution,
  useGetTeachersListByInstitution, // useGetStudentsListByInstitution,
  // useGetTeachersListByInstitution,
} from '@/server/institution';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { BiTrendingUp } from 'react-icons/bi';
import { MdArrowBackIos, MdOutlineSort } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';

/* eslint-disable @typescript-eslint/no-explicit-any */

const studentListColumns: TableColumn<any>[] = [
  // { name: 'Number', cell: (row) => <div className='truncate'># {row.id}</div> },
  {
    name: 'Name',
    cell: (row) => (
      <div>
        {row.user[0].firstName} {row.user[0].lastName}
      </div>
    ),
  },
  {
    name: 'Class',
    cell: (row) => (
      <div>
        {row.class.class.name} - {row.class.arm}
      </div>
    ),
  },
];
const staffListColumns: TableColumn<any>[] = [
  // { name: 'Number', cell: (row) => <div className='truncate'># {row.id}</div> },
  {
    name: 'Name',
    cell: (row) => (
      <div>
        {row?.user?.firstName} {row?.user?.lastName}
      </div>
    ),
  },
  {
    name: 'Subject',
    cell: (row) => (
      <div>{row?.subjects?.length > 0 ? row?.subjects?.length : 'None'}</div>
    ),
  },
  {
    name: 'Attendance Rate',
    cell: (row) => <div>{row?.attendanceRate ?? 0}% </div>,
  },
];

const SingleSchoolDashboard = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [gridIdx, setGridIdx] = useState(0);
  const isGenericApp = Cookies.get('isGenericApp') === 'Y';

  const router = useRouter();
  const [isEditingBioDetails, setIsEditingBioDetails] = useState(false);
  const params = useSearchParams();
  const { data: school } = useGetSchoolById({ id: params?.get('id') });
  const instituteId = params?.get('id');
  const { data: getInstitutionStudents } = useGetStudentsListByInstitution({
    instituteId: instituteId ?? '',
  });
  const { data: getInstitutionStaffs } = useGetTeachersListByInstitution({
    instituteId,
  });

  return (
    <section>
      <div
        onClick={() => router.back()}
        className=' pl-8 mt-4 flex items-center gap-3 cursor-pointer'
      >
        <MdArrowBackIos className='text-blue-500' />
        <div>Back</div>
      </div>

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
                  // {
                  //   icon: <RiCalendar2Fill className='h-5 w-5' />,
                  //   label: 'Timetable',
                  // },
                  {
                    icon: <MdOutlineSort className='h-5 w-5' />,
                    label: 'Subject',
                  },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && <SchoolDashboardView school={school} />}
            {/* {tabIdx === 1 && <SchoolCalendarView studentId='idx' />} */}
            {tabIdx === 1 && <SchoolSubject />}
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
            </div>

            {tabIdx === 0 && (
              <>
                <div
                  className={clsxm(
                    'flex justify-end gap-5',
                    isEditingBioDetails && 'opacity-50'
                  )}
                >
                  {/* <Button
                    onClick={() => router.push('/admin/student/edit-history')}
                    disabled={isEditingBioDetails}
                    variant='ghost'
                    className='text-primary bg-white hover:bg-primary-100 border border-primary-500'
                  >
                    View Edit History
                  </Button> */}
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
                  // {
                  //   icon: <BiTrendingUp className='h-5 w-5' />,
                  //   label: 'Attendance Report',
                  // },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && (
              <div className='flex flex-col gap-4'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  {/* <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button> */}
                </div>
                {/* <CountCard
                  text='72 %'
                  title='Average Attendance Rate'
                  variant='basic'
                /> */}
                <div className='bg-white rounded-md p-6'>
                  <div className='flex justify-between'>
                    <div className='text-[#6B7A99] text-xl font-bold'>
                      Student List
                    </div>
                    {/* <Select
                      value={{ value: 'all', label: 'All Class Arms' }}
                      options={[{ value: 'all', label: 'All Class Arms' }]}
                    /> */}
                  </div>
                  <Table
                    showFilter={false}
                    showSearch={false}
                    columns={studentListColumns}
                    data={getInstitutionStudents?.data}
                    // data={[]}
                  />
                </div>
              </div>
            )}
            {tabIdx === 1 && (
              <div className='flex flex-col'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  {/* <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button> */}
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
                    label: 'Staffs',
                  },
                  // {
                  //   icon: <BiTrendingUp className='h-5 w-5' />,
                  //   label: 'Attendance Report',
                  // },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && (
              <div className='flex flex-col gap-4'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  {/* <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button> */}
                </div>
                {/* <CountCard
                  text='0%'
                  title='Average Attendance Rate'
                  variant='basic'
                /> */}
                <div className='bg-white rounded-md p-6'>
                  <div className='flex justify-between'>
                    <div className='text-[#6B7A99] text-xl font-bold'>
                      Staff List
                    </div>
                    {/* <Select
                      value={{ value: 'all', label: 'Filter' }}
                      options={[{ value: 'all', label: 'Filter' }]}
                    /> */}
                  </div>
                  <Table
                    showFilter={false}
                    showSearch={false}
                    columns={staffListColumns}
                    data={getInstitutionStaffs?.data}
                    // data={[]}
                  />
                </div>
              </div>
            )}
            {tabIdx === 1 && (
              <div className='flex flex-col'>
                <div className='-mt-[10px] flex flex-row items-center justify-end'>
                  {/* <Button
                    variant='outline'
                    className='text-xs bg-white hover:bg-primary hover:text-white active:bg-primary-400'
                  >
                    Download Report
                  </Button> */}
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
                    label: isGenericApp ? 'Library' : 'Government Library',
                  },
                  {
                    icon: <BiTrendingUp className='h-5 w-5' />,
                    label: 'Institution Library',
                  },
                ]}
              />

              <div className='h-full flex-1 border-b-[2px] border-[#EDEFF2]' />
            </div>

            {tabIdx === 0 && <Files variant='secondary' />}
            {tabIdx === 1 && <Files variant='secondary' />}
          </div>
        )}
      </div>
    </section>
  );
};

export default SingleSchoolDashboard;
