/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import clsxm from '@/lib/clsxm';
import { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

export default function StepAccordion({
  taskName,
  bordered = false,
}: {
  taskName: string;
  bordered?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={clsxm(expanded && 'border border-black rounded-md')}>
      <div
        onClick={() => setExpanded(!expanded)}
        className={clsxm(
          'flex cursor-pointer items-center rounded-md bg-[#FCFCFC] border border-[#E3E3E3] p-4 shadow-sm',
          expanded && 'border-none bg-white shadow-none'
        )}
      >
        <div className='text-lg font-bold'>{taskName}</div>
        <div className='flex-1' />
        <div className='p-2 rounded-full shadow-md bg-white'>
          <HiArrowRight
            className={clsxm(
              'h-[18px] w-[18px] text-primary transition-transform duration-300',
              expanded ? '-rotate-90' : ''
            )}
          />
        </div>
      </div>
      <div className={clsxm(expanded && 'mx-4 h-[1px] bg-[#B2B3B4]')} />
      <div
        style={{
          height: expanded ? `320px` : '0px',
        }}
        className={clsxm(
          'flex px-4 gap-4 flex-col justify-center overflow-hidden transition-all duration-200 overflow-y-auto',
          expanded ? '' : '',
          expanded && bordered ? 'border border-[#E3E3E3] px-6' : ''
        )}
      >
        <div className='flex gap-4'>
          <BaseInput
            placeholder='Enter details here'
            label={
              <div>
                Time of Step <span className='font-bold text-[#E5A500]'>*</span>
              </div>
            }
            name=''
          />
          <BaseInput
            placeholder='Enter details here'
            label={
              <div>
                Time <span className='font-bold text-[#E5A500]'>*</span>
              </div>
            }
            name=''
          />
        </div>
        <BaseInput
          placeholder='Enter details here'
          label='Teacher Activity'
          name=''
        />
        <BaseInput
          placeholder='Enter details here'
          label='Care Skill'
          name=''
        />
        <div className='flex justify-end'>
          <Button variant='outline'>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
