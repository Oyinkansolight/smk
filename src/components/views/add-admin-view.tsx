'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';

export default function AddAdminView() {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex max-h-screen w-full max-w-2xl flex-col items-center overflow-auto bg-white'>
        <div className='py-2 text-4xl font-bold'>Invite New Admin</div>
        <div className='mt-4'>Kindly enter the details below</div>
        <div className='h-8' />

        <div className='flex flex-col gap-5 w-full'>
          <div className='w-full flex gap-4'>
            <BaseInput
              label={
                <span>
                  Select Staff<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='subject'
            />
          </div>

          <div className='w-full'>
            <BaseInput
              label={
                <span>
                  Staff Email<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='description'
            />
          </div>
          <div className='w-full'>
            <BaseInput
              label={
                <span>
                  Staff Email<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='description'
            />
          </div>
        </div>

        <div className='h-8' />
        <Button variant='secondary' className='px-20 text-xs mt-8'>
          Send Invite
        </Button>
      </div>
    </div>
  );
}
