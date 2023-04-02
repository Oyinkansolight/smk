import commaNumber from 'comma-number';
import React from 'react';

import clsxm from '@/lib/clsxm';

import BasicCard from '@/components/cards/Basic';
import UnstyledLink from '@/components/links/UnstyledLink';

interface ClockInCountCardProps {
  count: number;
  title: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const ClockInCountCard = ({
  count,
  title,
  variant,
  className,
}: ClockInCountCardProps) => {
  return (
    <BasicCard
      className={clsxm(
        variant === 'primary' && '!bg-[#F8E6FF] text-[#660195]',
        variant === 'secondary' && '!bg-[#E3FFF5] text-[#02A369]',
        variant === 'tertiary' && '!bg-[#E3FFF5] text-[#02A369]',
        '!m-0 flex h-[162px] max-h-[162px] !w-full min-w-[180px] flex-col whitespace-nowrap',
        '!rounded-[9px] !px-9 !pt-9 !pb-[7px] lg:w-[180px]',
        className
      )}
    >
      <div className='flex-1' />

      <div className={clsxm('mb-1 flex-1 text-[64px] font-bold')}>
        {commaNumber(count)}
      </div>
      <div className='flex-1' />
      <div className={clsxm('font-semibold capitalize')}>{title}</div>

      <div className='flex-1' />

      <div>
        <UnstyledLink href='#' className='text-[14px]'>
          Manage All
        </UnstyledLink>
      </div>
    </BasicCard>
  );
};

export default ClockInCountCard;
