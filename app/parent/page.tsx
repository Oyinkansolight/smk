'use client';

import EmptyView from '@/components/misc/EmptyView';
import AddSingleSchool from '@/components/modal/addSchool';
import AssignmentTracker from '@/components/sections/parent/AssignmentTracker';
import DashboardCounts from '@/components/sections/parent/DashboardCounts';
import Timetable from '@/components/sections/parent/Timetable';
import Periods from '@/components/sections/parent/TodaysPeriod';
import Stat from '@/components/views/single-teacher/Stat';
import { useGlobalContext } from '@/hooks/useGlobalState';
import { getFromSessionStorage } from '@/lib/helper';
import request from '@/server';
import { useGetProfile } from '@/server/auth';
import { IParentDashboard } from '@/types/parent';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

const SuperAdminCharts = dynamic(
  () => import('@/components/sections/parent/SuperAdminCharts')
);

const ParentPage = () => {
  const { setIsDataLoading } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [dashboardData, setDashboardData] = useState<IParentDashboard>();
  const [studentId, setStudentId] = useState<string>();
  // const { data: terms, isLoading: isLoadingTerms } = useGetSessionTerms({
  //   sessionId: profile?.currentSession?.[0]?.id,
  // });
  // const [institution] = useSessionStorage('institution', {} as Institution);
  const week: any = getFromSessionStorage('currentWeek');

  const { data: profile } = useGetProfile();
  const weekId = JSON.parse(week)?.id;
  const parentId = profile?.userInfo?.parent?.id;

  // Use useEffect to call useGetParentDashboardOverview when useGetProfile resolves
  useEffect(() => {
    setStudentId(profile?.userInfo?.parent?.students[0]?.id);
    // Ensure that profile is available before calling useGetParentDashboardOverview

    // Call useGetParentDashboardOverview with the necessary parameters

    if (studentId && weekId && parentId) {
      setIsLoading(true);
      request
        .get(
          `/v1/government/parent/admin/dashboard?studentId=${studentId}&weekId=${weekId}&parentId=${parentId}`,
          {
            withCredentials: true,
          }
        )
        .then((v) => {
          setDashboardData(v.data);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setIsLoading(false);
        });
    }
  }, [profile, weekId, parentId, studentId]); // Dependency array to watch for changes in profile, weekId, and parentId

  console.log(dashboardData);

  const handleSetOpen = (value: boolean) => setIsOpen(value);

  const menu = [
    {
      value: `${dashboardData?.attendanceRate ?? 0}%`,
      label: 'Average Attendance',
    },
    {
      value: 0,
      label: 'Total  Subjects',
    },

    {
      value: `${dashboardData?.student?.class?.class?.name} ${dashboardData?.student?.class?.arm}`,
      label: 'Class Arm',
    },
  ];
  return (
    <div className='layout flex flex-col gap-y-[27px] pt-6'>
      {isOpen && (
        <AddSingleSchool
          onClickHandler={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}

      <DashboardCounts handleSetOpen={handleSetOpen} profile={profile} />

      <div className='grid sm:grid-cols-2 my-4'>
        <div className='bg-[#5754F7] flex p-1 rounded-full space-x-2'>
          <div className='w-3/5 border-r border-white pr-2'>
            <button className='bg-white w-full  rounded-full flex justify-between p-2 text-black text-xs'>
              <span>Select Academic Session</span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.64645 5.65967C3.84171 5.44678 4.15829 5.44678 4.35355 5.65967L7.64645 9.25C7.84171 9.4629 8.15829 9.4629 8.35355 9.25L11.6464 5.65968C11.8417 5.44678 12.1583 5.44678 12.3536 5.65968C12.5488 5.87257 12.5488 6.21775 12.3536 6.43065L9.06066 10.021C8.47487 10.6597 7.52513 10.6597 6.93934 10.021L3.64645 6.43065C3.45118 6.21775 3.45118 5.87257 3.64645 5.65967Z'
                    fill='#5754F7'
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className='w-2/5'>
            <button className='bg-white w-full  rounded-full flex justify-between p-2 text-black text-xs'>
              <span>Select Term</span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.64645 5.65967C3.84171 5.44678 4.15829 5.44678 4.35355 5.65967L7.64645 9.25C7.84171 9.4629 8.15829 9.4629 8.35355 9.25L11.6464 5.65968C11.8417 5.44678 12.1583 5.44678 12.3536 5.65968C12.5488 5.87257 12.5488 6.21775 12.3536 6.43065L9.06066 10.021C8.47487 10.6597 7.52513 10.6597 6.93934 10.021L3.64645 6.43065C3.45118 6.21775 3.45118 5.87257 3.64645 5.65967Z'
                    fill='#5754F7'
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {profile?.userInfo?.parent?.students &&
      profile?.userInfo?.parent?.students?.length > 0 ? (
        <div className='' title='My Student'>
          <div className='rounded-xl p-4 bg-white border'>
            <div className='border-b flex justify-between items-center py-4'>
              <div className='flex space-x-2 items-center'>
                <div>
                  <Image
                    src='/svg/newstudent.svg'
                    height={24}
                    width={24}
                    alt='student'
                    className=''
                  />
                </div>
                <div className=''>
                  <h2 className='text-xl'>
                    {dashboardData?.student?.firstName ?? ''}{' '}
                    {dashboardData?.student?.lastName ?? ''}
                  </h2>
                  <div className='bg-[#008F28] flex items-center text-xs px-4 h-5 font-normal text-white max-w-max rounded-full capitalize'>
                    {dashboardData?.student?.institution?.instituteType}
                  </div>
                </div>
              </div>
              <div className='relative'>
                <button
                  onClick={() => {
                    setIsOpenDropdown(true);
                  }}
                  className='bg-[#5754F7] w-max rounded-full flex space-x-2 justify-between items-center p-2 text-white text-xs'
                >
                  <span>Switch Student</span>
                  {isLoading && <ImSpinner2 />}
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M3.64645 5.65967C3.84171 5.44678 4.15829 5.44678 4.35355 5.65967L7.64645 9.25C7.84171 9.4629 8.15829 9.4629 8.35355 9.25L11.6464 5.65968C11.8417 5.44678 12.1583 5.44678 12.3536 5.65968C12.5488 5.87257 12.5488 6.21775 12.3536 6.43065L9.06066 10.021C8.47487 10.6597 7.52513 10.6597 6.93934 10.021L3.64645 6.43065C3.45118 6.21775 3.45118 5.87257 3.64645 5.65967Z'
                        fill='#ffffff'
                      />
                    </svg>
                  </span>
                </button>
                {isOpenDropdown && (
                  <div className='shadow-lg rounded-md bg-white w-[200px] divide-y-2 truncate h-max absolute top-8 right-0 z-10'>
                    {profile?.userInfo?.parent?.students.map((item, key) => (
                      <div
                        onClick={() => {
                          setStudentId(item.id);
                          isOpenDropdown && setIsOpenDropdown(false);
                        }}
                        key={key}
                        className='w-full p-2 text-sm cursor-pointer'
                      >
                        {item.firstName} {item.lastName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {isOpenDropdown && (
                <div
                  className='fixed inset-0 z-[1]'
                  onClick={() => {
                    setIsOpenDropdown(false);
                  }}
                ></div>
              )}
            </div>

            <div className='grid md:grid-cols-2 gap-2 my-6'>
              <div className=' bg-[#f0ffff] rounded-lg space-y-2 px-2 py-3'>
                <h2 className='text-xl'>
                  {dashboardData?.student?.institution?.instituteName}
                </h2>
                <p className='text-xs text-gray-400'>Name of Institution</p>
              </div>
              <div className='bg-[#e9fde2] rounded-lg space-y-2 px-2 py-3'>
                <h2 className='text-xl'>
                  {' '}
                  {dashboardData?.student?.studentId}
                </h2>
                <p className='text-xs text-gray-400'>student ID</p>
              </div>
            </div>

            <Stat menu={menu} />
          </div>

          <div className='space-y-3 mt-3'>
            {/* {console.log(dashboardData?.todayPeriods)} */}
            <Periods period={dashboardData?.todayPeriods} />
            <AssignmentTracker assignments={dashboardData?.assignments} />
            <SuperAdminCharts setIsDataLoading={setIsDataLoading} />
            <Timetable
              classId={dashboardData?.student?.class?.class?.id ?? ''}
            />
          </div>
        </div>
      ) : (
        <EmptyView
          useStandardHeight
          label="you don't have any linked student"
        />
      )}
    </div>
  );
};

export default ParentPage;
