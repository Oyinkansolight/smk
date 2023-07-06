import Button from '@/components/buttons/Button';
import BasicCard from '@/components/cards/Basic';
import clsxm from '@/lib/clsxm';
import commaNumber from 'comma-number';
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import UsersThree from '~/svg/users_three.svg';

interface SchoolTotalCardProps {
  count: number;
  handleSetOpen: (value: boolean) => void;
}

const SchoolTotalCard = ({ count, handleSetOpen }: SchoolTotalCardProps) => {
  return (
    <BasicCard
      className={clsxm(
        '!bg-white text-black border-[0.5px] border-[#008146]',
        '!m-0 flex h-[240px] w-full min-w-[259px] whitespace-nowrap',
        '!rounded-[9px] px-[21px] py-[24px] shadow-sm lg:w-[240px] xl:w-[278px]'
      )}
    >
      <div className='flex w-full flex-col gap-y-5'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-xl font-medium'>Total Institutions</div>
          <UsersThree className='h-[25px] w-[25px]' />
        </div>

        <div className='mt-5 text-[58px] font-semibold'>
          {commaNumber(count)}
        </div>

        {/* <div className='flex gap-2 items-center mt-2'>
          <span className='text-[#2DCE89] flex items-center'>
            <div>+11.01%</div>
            <BiTrendingUp className='fill-current w-4 h-4' />
          </span>
          <div>(Today)</div>
        </div> */}

        <div className='my-2' />

        <Button
          className='text-right min-h-[45px] mt-1'
          onClickHandler={() => {
            handleSetOpen(true);
          }}
        >
          <div className='flex flex-row justify-end items-center gap-2 w-full'>
            <div>Add Institution</div>
            <BsPlus className='h-[25px] w-[25px]' />
          </div>
        </Button>
      </div>
    </BasicCard>
  );
};

export default SchoolTotalCard;
