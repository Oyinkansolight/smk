import BasicCard from '@/components/cards/Basic';
import { CircularCounter } from '@/components/counter';
import clsxm from '@/lib/clsxm';
import Image from 'next/image';
import React from 'react';

interface CurriculumProps {
  name: string;
  count: number;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const CurriculumCard = ({
  name,
  count,
  onClick,
  variant = 'primary',
}: CurriculumProps) => {
  return (
    <BasicCard
      className={clsxm(
        'h-[120px] w-full min-w-[150px] max-w-[272px] !rounded-[9px] py-4 pl-4 pr-[34px]',
        variant === 'primary'
          ? '!bg-[#F8FDFF]'
          : variant === 'secondary'
          ? '!bg-[#FDF8FF]'
          : '!bg-[#FFFCF8]'
      )}
    >
      <div className='flex flex-col gap-[9px]'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-[13px] text-[#200E32]'>{name}</div>
          {count === 100 ? (
            <Image
              src='/images/curriculum_done.png'
              alt='done'
              height={65}
              width={65}
            />
          ) : (
            <CircularCounter size='sm' total={count} />
          )}
        </div>

        <div
          onClick={onClick}
          className='text-[#008146] text-[13px] cursor-pointer'
        >
          View
        </div>
      </div>
    </BasicCard>
  );
};

export default CurriculumCard;
