/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicCard from '@/components/cards/Basic';
import clsxm from '@/lib/clsxm';
import React from 'react';

interface GenericChartProps {
  title: string;
  content: any;
  className?: string;
  description?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const GenericChart = ({
  title,
  content,
  className,
  description,
  titleClassName,
  contentClassName,
}: GenericChartProps) => {
  return (
    <BasicCard
      className={clsxm(
        'min-h-[269px] w-full !rounded-[10px] border-2 border-[#DADEE6] !px-6 !pt-10',
        className
      )}
    >
      <div className='flex flex-col'>
        <div
          className={clsxm(
            'flex flex-col gap-4 bg-white pb-3',
            // titleClassName
          )}
        >
          <div className={clsxm('flex flex-row items-center justify-between')}>
            <div className='flex flex-col gap-2'>
              <div className='text-3xl font-bold'>{title}</div>

              {description &&
                <p className='text-[#545454]'>
                  {description}
                </p>
              }
            </div>
            {/* <Select
              name='filter'
              isSearchable={true}
              classNamePrefix='select'
              className='filter-single'
              placeholder='Filter Period'
              options={[{ label: '', value: '' }]}
            /> */}
          </div>

          {/* <div className='flex items-center flex-wrap gap-[10px]'>
            <FilterButton title='Primary' />
            <FilterButton title='Benin LGA' />
            <FilterButton title='Avril Price Institution' />
          </div> */}
        </div>

        <div
          className={clsxm(
            'h-full min-h-[250px] overflow-hidden',
            contentClassName
          )}
        >
          {content}
        </div>
      </div>
    </BasicCard>
  );
};

interface FilterButtonProps {
  title: string;
}

const FilterButton = ({ title }: FilterButtonProps) => {
  return (
    <div className='flex overflow-hidden items-center text-[#333333] py-[2px] px-[6px] bg-[#FFFCF5] rounded-[2px] border-[0.5px] border-[#BEBEBE] cursor-pointer'>
      {title}
    </div>
  );
};

export default GenericChart;
