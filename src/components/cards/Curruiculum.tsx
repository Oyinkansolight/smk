import BasicCard from '@/components/cards/Basic'
import { CircularCounter } from '@/components/counter'
import clsxm from '@/lib/clsxm'
import React from 'react'

interface CurriculumProps {
  name: string
  count: number
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const CurriculumCard = ({ name, count, variant = 'primary' }: CurriculumProps) => {
  return (
    <BasicCard className={clsxm(
      'h-[120px] max-w-[272px] w-full !rounded-[9px] py-4 pl-4 pr-[34px]',
      variant === 'primary' ? '!bg-[#F8FDFF]' : variant === 'secondary' ? '!bg-[#FDF8FF]' : '!bg-[#FFFCF8]'
    )}>
      <div className='flex flex-col gap-[9px]'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-[13px] text-[#200E32]'>{name}</div>
          <CircularCounter size='sm' total={count} />
        </div>

        <div className='text-[#008146] text-[13px] cursor-pointer'>View</div>
      </div>
    </BasicCard>
  )
}

export default CurriculumCard