import commaNumber from 'comma-number';
import React from 'react';

import clsxm from '@/lib/clsxm';

import BasicCard from '@/components/cards/Basic';
import UnstyledLink from '@/components/links/UnstyledLink';

interface CountCardProps {
  count: number;
  title: string;
  variant: 'primary' | 'secondary' | 'tertiary';
}

const CountCard = ({ count, title, variant }: CountCardProps) => {
  return (
    <BasicCard
      className={clsxm(
        variant === 'primary' && 'bg-[#FFEFEA] text-[#FF6633]',
        variant === 'secondary' && 'bg-[#F8E6FF] text-[#660195]',
        variant === 'tertiary' && 'bg-[#E3FFF5] text-[#02A369]',
        '!m-0 flex h-[156px] w-full min-w-[180px] items-center whitespace-nowrap !rounded-[9px] px-[36px] py-[21px] shadow-sm lg:w-[180px] xl:w-[230px]'
      )}
    >
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <div className='text-[21px] font-bold'>{commaNumber(count)}</div>
          <div className='text-4 font-semibold capitalize'>{title}</div>
        </div>

        <UnstyledLink href='#' className='text-[14px]'>
          Manage All
        </UnstyledLink>
      </div>
    </BasicCard>
  );
};

export default CountCard;
