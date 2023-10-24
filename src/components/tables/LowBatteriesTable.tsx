import EmptyView from '@/components/misc/EmptyView';
import React from 'react'
import StudentBadge from '~/svg/student_badge.svg';

interface LowBatteriesTableProps {
  id: string;
  firstName: string;
  lastName: string;
  deviceToken: string;
  batteryLevel: number;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  resetPasswordToken: string;
  resetPasswordTokenExpires: string;
  type: string;
  loginCount: number;
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
}

const LowBatteriesTable = ({ data }) => {
  const isEmpty = !data || !data.length;

  if (isEmpty) {
    return (
      <EmptyView label='No Low Battery Data' useStandardHeight />
    );
  }

  return (
    <div className='flex flex-col gap-y-5'>
      {data.filter(i => i.firstName && i.lastName).slice(0, 5).map((item: LowBatteriesTableProps) => (
        <div key={item.id} className='flex flex-row items-center gap-x-[22.5px]'>
          <StudentBadge className='h-[60px] w-[60px]' />

          <div className='flex w-full flex-row items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='font-bold text-[#4D5E80]'>
                {item.lastName} {item.firstName}
              </div>
              <div className='font-bold text-[#ADB8CC]'>
                {/* Primary 1 */}
              </div>
            </div>

            <span className='text-lg font-bold text-[#F5365C]'>
              {item.batteryLevel}%
            </span>
          </div>

        </div>
      ))}
    </div>
  )
}

export default LowBatteriesTable