'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';

export default function AddWeekView() {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex max-h-screen w-full max-w-2xl flex-col items-center overflow-auto bg-white'>
        <div className='py-2 text-4xl font-bold'>Add New Week</div>
        <div className='mt-4'>Kindly enter the details below</div>
        <div className='h-8' />

        <div className='flex flex-col gap-10 w-full'>
          <BaseInput label='' value='Week 1' disable name='subject' />
          <div className='w-full flex gap-4'>
            <BaseInput
              label={
                <span>
                  Theme for the week<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='subject'
            />
            <BaseInput
              label={
                <span>
                  Select No of period<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='subject'
            />
          </div>

          <div className='w-full'>
            <BaseInput
              label={
                <span>
                  Enter Description<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='description'
            />
          </div>
        </div>

        <div className='h-8' />
        <div className='font-bold text-[#E5A500]'>Note</div>
        <div className='text-xs mt-2'>
          You would be required to add curriculum and lesson note for this
          subject in the subject settings
        </div>
        <Button className='px-20 text-xs mt-8'>Finish</Button>
      </div>
    </div>
  );
}
