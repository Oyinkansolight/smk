import { useGetDashboardOverview } from '@/server/dashboard';
import { useGetSubjectList } from '@/server/institution';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Studentcount from '~/svg/studentcount.svg';

interface DashboardCountsProps {
  handleSetOpen: (value: boolean) => void;
  profile: any;
}

const DashboardCounts = ({ handleSetOpen, profile }: DashboardCountsProps) => {
  const [adminType, setAdminType] = useState<string | undefined>();

  const { data, isLoading: isLoadingOverview } = useGetDashboardOverview();
  const { data: AllSubject, isLoading: isLoadingSubjects } =
    useGetSubjectList();

  useEffect(() => {
    const AT = Cookies.get('adminType');
    setAdminType(AT);
  }, []);
  const parentName = `${profile?.userInfo?.parent?.firstName ?? ''} ${
    profile?.userInfo?.parent?.lastName ?? ''
  }`;

  return (
    <div className='flex flex-col  w-full'>
      <h1 className='text-4xl'>Welcome, {parentName}</h1>
      <h2 className='text-[#8C8C8C] text-base font-normal'>
        Monitor you children's performance and activities here{' '}
      </h2>

      <div className='z-10 relative bg-[#00031D] flex flex-col gap-6 mt-4 rounded-2xl p-4 overflow-hidden'>
        <div className='absolute z-[5] bg-[#FBCA7D] w-28 h-28 rounded-full -top-7 -right-7'>
          {' '}
        </div>
        <div className='gap-4 w-full'>
          <div className='rounded-2xl bg-white/10 space-y-2 px-2 py-4'>
            <div>
              <div>
                <Studentcount className='h-8 w-8' />
              </div>
              <p className='text-sm text-[#8E8E8E]'>Total Students</p>
            </div>
            <div>
              <h1 className='text-white'>
                {profile?.userInfo?.parent?.students?.length ?? 0}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCounts;
