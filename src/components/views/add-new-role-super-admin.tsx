'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import PermissionsEditor from '@/components/input/PermissionsEditor';

export default function AddNewRoleSuperAdminView() {
  return (
    <div className='flex items-center justify-center text-start text-xs'>
      <div className='flex max-h-screen w-full max-w-6xl flex-col items-center overflow-auto bg-white'>
        <div className='py-2 text-4xl font-bold'>Add New Role</div>
        <div className='mt-4'>Kindly enter the details below</div>
        <div className='h-8' />

        <div className='flex flex-col gap-5 w-full'>
          <div className='w-full flex gap-4 max-w-[312px]'>
            <BaseInput
              label={
                <span>
                  Select Access Type<span className='text-[#E5A500]'>*</span>
                </span>
              }
              name='subject'
              placeholder='Select an option'
            />
          </div>

          <div className='w-full max-w-[312px]'>
            <BaseInput
              label={
                <span>
                  Enter Role Name<span className='text-[#E5A500]'>*</span>
                </span>
              }
              placeholder='Name'
              name='description'
            />
          </div>
          <div className='text-start font-bold'>
            Select Permissions<span className='text-[#E5A500]'>*</span>
          </div>
          <PermissionsEditor isEditing={true} />
        </div>

        <div className='h-8' />
        <Button variant='secondary' className='px-20 text-xs mt-8'>
          Finish
        </Button>
      </div>
    </div>
  );
}
