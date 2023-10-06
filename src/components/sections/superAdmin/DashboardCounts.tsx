import { SchoolTotalCard, IndividualTotal } from '@/components/cards'
import { useGetDashboardOverview } from '@/server/dashboard';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

interface DashboardCountsProps {
  handleSetOpen: (value: boolean) => void;
};

const DashboardCounts = ({ handleSetOpen }: DashboardCountsProps) => {
  const [adminType, setAdminType] = useState<string | undefined>();

  const { data } = useGetDashboardOverview();

  useEffect(() => {
    const AT = Cookies.get('adminType');
    setAdminType(AT);
  }, []);

  return (
    <div className='flex gap-5 w-full'>
      <div
        className={` ${adminType === 'NORMAL' ? 'w-4/5' : 'w-full'
          }  'flex flex-col gap-[10px]  md:w-full bg-white rounded-[10px] p-5`}
      >
        <h1 className='font-bold text-[28px] leading-[27px]'>
          Dashboard Statistic
        </h1>

        <div className='flex flex-col gap-3 md:gap-[20px] mt-4 lg:flex-row xl:gap-[24px]'>
          <SchoolTotalCard
            count={data?.Total_Schools ?? 0}
            handleSetOpen={handleSetOpen}
            adminType={adminType}
          />

          {adminType === 'SUPER' && (
            <div className='grid w-full md:grid-cols-2 gap-x-6 gap-y-[10px] bg-[#EDF5F2] p-5 rounded-[10px] max-w-full'>
              <IndividualTotal
                count={data?.Total_ECCDE ?? 0}
                name='ECCDE'
                variant='secondary'
                link='/super-admin/eccde'
              />
              <IndividualTotal
                count={data?.Total_Primary ?? 0}
                name='Primary School'
                link='/super-admin/primary'
                variant='secondary'
              />
              <IndividualTotal
                count={data?.Total_Secondary ?? 0}
                name='Secondary School'
                link='/super-admin/secondary'
                variant='secondary'
              />
              <IndividualTotal
                count={data?.Total_Tertiary ?? 0}
                name='Tertiary School'
                link='/super-admin/tertiary'
                variant='secondary'
              />
            </div>
          )}

          <div className='grid w-full grid-cols-1 gap-x-6 gap-y-[10px] bg-[#FFF6EC] p-5 rounded-[10px] min-w-[276px]'>
            <IndividualTotal
              chart
              count={data?.Total_Students ?? 0}
              name='Total Students'
              variant='primary'
              link='/super-admin/all-student'
            />
            <IndividualTotal
              chart
              count={data?.Total_Staff ?? 0}
              name='Total Staff'
              variant='primary'
              link='/super-admin/all-staff'
            />
          </div>
        </div>
      </div>
      {adminType === 'NORMAL' && (
        <div className='grid  w-full grid-cols-1 gap-x-6 gap-y-[10px] bg-[#FFFFFF] p-5 rounded-[10px] min-w-[276px]'>
          <div className='flex justify-between items-center'>
            <h5 className='font-bold text-[28px] leading-[27px]'>
              Notifications
            </h5>{' '}
            <div className='border p-2 rounded'> Oct - Nov 2022 </div>
          </div>

          <div className='border bg-gray-300 border-gray-600 rounded '>
            <div className='border-b flex justify-between items-center px-4 py-2'>
              <h5 className=' text-[8px] leading-[18px] text-[#6B7A99]'>
                Details
              </h5>
              <h5 className=' text-[8px] leading-[18px] text-[#6B7A99]'>
                Time
              </h5>
            </div>

            {[1, 2, 3, 4, 5].map((v, id) => (
              <div
                key={id}
                className='flex justify-between items-center px-4 py-2 border-b'
              >
                <p className='font-bold text-[#858EA4] text-xs leading-[18px]'>
                  New Institution Sign In
                </p>
                <h5 className=' text-[8px] leading-[18px] text-[#858EA4]'>
                  {' '}
                  10:11pm
                </h5>
              </div>
            ))}
            <div className='bg-white rounded-b-md w-full px-4 py-2'>
              <button className='text-[#008146] text-lg font-light'>
                View all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardCounts