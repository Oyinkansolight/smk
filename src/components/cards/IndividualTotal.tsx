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
        'relative h-[95px] w-full max-w-[237px] !rounded-[6px] !px-[10px] !py-[5px] !bg-white'
      )}
    >
      <div className='flex flex-col gap-1'>
        <div className='text-[14px] leading-5 font-medium text-[#615F5F]'>
          {name}
        </div>

        <div className='flex items-center gap-[10px] text-2xl font-semibold text-[#1C1C1C]'>
          <div>{commaNumber(count)}</div>

          {/* <span className='text-[#2DCE89] flex items-center text-xs'>
            <div>+3.22%</div>
            <BiTrendingUp className='fill-current w-4 h-4' />
          </span> */}
        </div>

        <div
          className={clsxm(
            variant === 'primary' && 'bg-[#FFF6EC]',
            variant === 'secondary' && 'bg-[#EDF5F2]',
            'p-[5px] rounded-b-[6px]'
          )}
        >
          <PrimaryLink href={link} className='font-medium text-[14px]'>
            View all <GoChevronRight />{' '}
          </PrimaryLink>
        </div>
      </div>
    </BasicCard>
  );
};

export default IndividualTotal;
