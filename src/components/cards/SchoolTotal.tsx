import BasicCard from '@/components/cards/Basic';
import clsxm from '@/lib/clsxm';
import commaNumber from 'comma-number';
import React from 'react';
import UsersThree from '~/svg/users_three.svg';

interface SchoolTotalCardProps {
  count: number;
}

const SchoolTotalCard = ({ count }: SchoolTotalCardProps) => {
  return (
    <BasicCard
      className={clsxm(
        '!bg-[#E3F5FF] text-black',
        '!m-0 flex h-[197px] w-full min-w-[180px] whitespace-nowrap',
        '!rounded-[9px] px-[21px] py-[24px] shadow-sm lg:w-[240px] xl:w-[278px]'
      )}
    >
      <div className='flex w-full flex-col gap-y-5'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-xl font-medium'>Total Schools</div>
          <UsersThree className='h-[22px] w-[22px]' />
        </div>

        <div className='mt-5 text-[58px] font-semibold'>
          {commaNumber(count)}
        </div>
      </div>
    </BasicCard>
  );
};

export default SchoolTotalCard;
