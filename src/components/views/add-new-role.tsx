'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';

const permissions = ['Add Admin', 'Manage Permissions', 'Add School'];

export default function AddNewRoleView() {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex max-h-screen w-full max-w-2xl flex-col items-center overflow-auto bg-white'>
        <div className='py-2 text-4xl font-bold'>Add New Role</div>
        <div className='mt-4'>Kindly enter the details below</div>
        <div className='h-8' />

        <div className='flex flex-col gap-5 w-full'>
          <div className='w-full flex gap-4'>
            <BaseInput
              label={
                <span>
                  Enter Role Name<span className='text-[#E5A500]'>*</span>
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
          <div className='text-start font-bold'>
            Select Permissions<span className='text-[#E5A500]'>*</span>
          </div>
          <div>
            {permissions.map((v, i) => (
              <div className=' flex justify-between py-2  border-b-2' key={i}>
                <div className='font-semibold capitalize'>{v}</div>
                <div>Activated</div>
              </div>
            ))}
          </div>
        </div>

        <div className='h-8' />
        <Button variant='secondary' className='px-20 text-xs mt-8'>
          Finish
        </Button>
      </div>
    </div>
  );
}
