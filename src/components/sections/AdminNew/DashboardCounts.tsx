import Overview from '@/components/cards/overview';
import { useGetProfile } from '@/server/auth';
import { useGetDashboardOverview } from '@/server/dashboard';
import { useGetSubjectList } from '@/server/institution';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InstituteCount from '~/svg/institutecount.svg';

interface DashboardCountsProps {
  handleSetOpen: (value: boolean) => void;
}

const DashboardCounts = ({ handleSetOpen }: DashboardCountsProps) => {
  const { data: institutionProfile } = useGetProfile();

  const institutionName =
    institutionProfile?.userInfo?.esiAdmin?.instituteName ?? '';

  const [adminType, setAdminType] = useState<string | undefined>();

  const { data, isLoading: isLoadingOverview } = useGetDashboardOverview();
  const { data: AllSubject, isLoading: isLoadingSubjects } =
    useGetSubjectList();

  useEffect(() => {
    const AT = Cookies.get('adminType');
    setAdminType(AT);
  }, []);

  return (
    <div className='flex flex-col  w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h1 className='text-4xl'>Welcome, {institutionName} </h1>
          <h2 className='text-[#8C8C8C] text-base font-normal'>
            This is your dashboard overview
          </h2>
        </div>
        <Link
          href='/admin/add-student'
          className='w-max h-fit py-3  font-medium rounded-3xl border bg-[#5754F7] px-3  text-center text-xs text-white '
        >
          Add Student +
        </Link>
      </div>

      <div className='z-10 relative bg-[#00031D] flex flex-col gap-6 mt-4 rounded-2xl p-4 overflow-hidden'>
        <div className='absolute z-[-1] bg-[#FBCA7D] w-28 h-28 rounded-full -top-6 -right-6' />{' '}
        <div className='grid sm:grid-cols-3  gap-4'>
          <Overview
            isLoading={isLoadingOverview}
            src='/svg/studentcount.svg'
            title='Total Student'
            count={data?.Total_Students ?? 0}
            link='/super-admin/all-student'
          />
          <Overview
            isLoading={isLoadingOverview}
            src='/svg/staffcount.svg'
            title='Total Staff'
            count={data?.Total_Staff ?? 0}
            link='/super-admin/all-staff'
          />
          <Overview
            isLoading={isLoadingSubjects}
            src='/svg/subjectcount.svg'
            title='Total Subject'
            count={AllSubject?.paging?.totalItems ?? 0}
            link='/super-admin/all-subject'
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCounts;
