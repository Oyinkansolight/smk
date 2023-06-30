/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicCard from '@/components/cards/Basic'
import Select from 'react-select';
import React from 'react'
import clsxm from '@/lib/clsxm';

interface GenericChartProps {
  title: string;
  content: any;
}

const GenericChart = ({ title, content }: GenericChartProps) => {
  return (
    <BasicCard className='min-h-[269px] w-full !rounded-[10px] border-2 border-[#DADEE6] !p-0'>
      <div className='flex flex-col gap-y-8'>

        <div className='flex flex-col gap-4 bg-[#EBF5F6] pt-7 px-7 pb-3'>
          <div className={clsxm(

            'flex flex-row items-center justify-between'
          )}>
            <div className='text-lg font-bold text-[#4D5E80]'>
              {title}
            </div>

            <Select
              name="filter"
              isSearchable={true}
              classNamePrefix="select"
              className="filter-single"
              placeholder='Filter Period'
              options={[{ label: '', value: '' }]}
            />
          </div>

          <div className='flex items-center flex-wrap gap-[10px]'>
            <FilterButton title='Primary' />
            <FilterButton title='Benin LGA' />
            <FilterButton title='Avril Price Institution' />
          </div>
        </div>


        <div className='h-full min-h-[250px] overflow-hidden'>
          {content}
        </div>
      </div>
    </BasicCard>
  )
}

interface FilterButtonProps {
  title: string;
};

const FilterButton = ({ title }: FilterButtonProps) => {
  return (
    <div className='flex overflow-hidden items-center text-[#333333] py-[2px] px-[6px] bg-[#FFFCF5] rounded-[2px] border-[0.5px] border-[#BEBEBE] cursor-pointer'>
      {title}
    </div>
  )
}

export default GenericChart