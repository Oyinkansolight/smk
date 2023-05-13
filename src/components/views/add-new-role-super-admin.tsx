'use client';

import Button from '@/components/buttons/Button';
import { BaseInput } from '@/components/input';
import CircularCheckboxPrimary from '@/components/input/CircularCheckboxPrimary';
import { useState } from 'react';

const possibleValues = ['Can View', 'Can Edit', 'Can Do Both'];
const permissions = ['Add Admin', 'Manage Permissions', 'Add School'];

export default function AddNewRoleSuperAdminView() {
  const [perms, setPerms] = useState<Record<string, boolean[]>>({
    [permissions[0]]: [false, false],
    [permissions[1]]: [false, false],
    [permissions[2]]: [false, false],
  });
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
          <div className='border-t-2'>
            {permissions.map((v, i) => (
              <div
                className=' py-2 text-lg flex justify-between border-b-2'
                key={i}
              >
                <div className='font-semibold  capitalize'>{v}</div>
                <div className='flex items-center gap-2'>
                  {possibleValues.map((value, j) =>
                    j === 2 ? (
                      <div className='flex items-center gap-1' key={j}>
                        <div>{value}</div>
                        <CircularCheckboxPrimary
                          checked={perms[permissions[i]].every((v) => v)}
                          onClick={() => {
                            const p = { ...perms };
                            p[permissions[i]] = Array(
                              p[permissions[i]].length
                            ).fill(true);
                            setPerms(p);
                          }}
                        />
                      </div>
                    ) : (
                      <div className='flex items-center gap-1' key={j}>
                        <div>{value}</div>
                        <CircularCheckboxPrimary
                          checked={perms[permissions[i]][j]}
                          onClick={() => {
                            const v = { ...perms };
                            v[permissions[i]][j] = !(
                              v[permissions[i]][j] ?? false
                            );
                            setPerms(v);
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
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
