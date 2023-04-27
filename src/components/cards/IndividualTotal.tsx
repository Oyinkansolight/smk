import BasicCard from '@/components/cards/Basic';
import PrimaryLink from '@/components/links/PrimaryLink';
import clsxm from '@/lib/clsxm';
import commaNumber from 'comma-number';
import React from 'react';
import { GoChevronRight } from 'react-icons/go';

interface IndividualTotalProps {
  count: number;
  name: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  link: string;
}

const IndividualTotal = ({
  count,
  name,
  variant,
  link,
}: IndividualTotalProps) => {
  return (
    <BasicCard
      className={clsxm(
        variant === 'primary' && '!bg-[#FFF6EC]',
        variant === 'secondary' && '!bg-[#E5ECF6]',
        'relative max-h-[90px] w-full !rounded-2xl'
      )}
    >
      <div className='flex flex-col gap-2'>
        <div className='text-[14px] font-medium text-[#615F5F]'>{name}</div>
        <div className='text-2xl font-semibold text-[#1C1C1C]'>
          {commaNumber(count)}
        </div>
      </div>

      <div className='absolute right-3 bottom-4'>
        <PrimaryLink href={link}>
          View all <GoChevronRight />{' '}
        </PrimaryLink>
      </div>
    </BasicCard>
  );
};

export default IndividualTotal;
