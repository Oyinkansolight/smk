'use client';

import { useState } from 'react';
import Avatar from '~/svg/governor.svg';

export default function Page() {
  const [isSuperAdmin, setisSuperAdmin] = useState(true);
  return (
    <div className='h-full px-12 py-10'>
      <div className='rounded-md bg-white'>
        <div className='w-full px-4 py-5 border-b '>
          <h2 className='text-[#6B7A99] text-lg font-bold'>
            Admin Role Settings
          </h2>
        </div>

        <div className='grid grid-cols-12 px-4 gap-4 py-6'>
          <div className='col-span-3'>
            <div className='bg-[#F6F9FC] px-2 rounded-md'>
              <div className='w-full py-1 border-b '>
                <h2 className='text-[#A5A5A5] text-sm'>User</h2>
              </div>
              <div className='content py-4'>
                <div className='flex space-x-3 items-center'>
                  <Avatar className='h-10 w-10' />
                  <p>Godwin Nogheghase Obaseki</p>
                </div>
                <h2 className='text-[#A5A5A5] text-sm mt-8'>Roles</h2>

                <div className='border-y py-2 space-y-4'>
                  <div className='bg-gray-200 rounded p-2 flex items-center justify-between'>
                    <p>Super Admin</p>
                    <button
                      onClick={() => {
                        setisSuperAdmin(true);
                      }}
                      className='text-[10px] text-[#016938]'
                    >
                      View Pernission
                    </button>
                  </div>
                  <div className='bg-gray-200 rounded p-2 flex items-center justify-between'>
                    <p>Institutional Level -1</p>
                    <button
                      onClick={() => {
                        setisSuperAdmin(false);
                      }}
                      className='text-[10px] text-[#016938]'
                    >
                      View Pernission
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-9'>
            {isSuperAdmin ? (
              <div className='border'>
                <div className='border-b p-3 text-center'>
                  <h2 className='font-bold text-base'>
                    Super Admin Permissions
                  </h2>
                </div>
                <div className='flex justify-end py-4 px-3'>
                  <button>Filter by type</button>
                </div>
                <div className='grid grid-cols-12 gap-4 px-3 py-3 text-sm font-semibold text-[#8898AA] bg-[#F6F9FC]'>
                  <div className='col-span-3'>Permission</div>
                  <div className='col-span-3'>Type</div>
                  <div className='col-span-6'>Description</div>
                </div>
                {[1, 2, 3, 4, 5].map((item, idx) => (
                  <div
                    key={idx}
                    className='grid grid-cols-12 gap-4 text-[#8898AA] px-3 mt-4 items-center mb-5'
                  >
                    <div className='col-span-3 uppercase font-bold'>
                      <p>Create_Institution</p>
                    </div>
                    <div className='col-span-3'>
                      <p>Institution Management</p>
                    </div>
                    <div className='col-span-6'>
                      <p>You can create and add new institution as an admin</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='border'>
                <div className='border-b p-3 text-center'>
                  <h2 className='font-bold text-base'>
                    Institutional Level -1
                  </h2>
                </div>
                <div className='flex justify-end py-4 px-3'>
                  <button>Filter by type</button>
                </div>
                <div className='grid grid-cols-12 gap-4 px-3 py-3 text-sm font-semibold text-[#8898AA] bg-[#F6F9FC]'>
                  <div className='col-span-3'>Permission</div>
                  <div className='col-span-3'>Type</div>
                  <div className='col-span-6'>Description</div>
                </div>
                {[1, 2, 3, 4, 5].map((item, idx) => (
                  <div
                    key={idx}
                    className='grid grid-cols-12 gap-4 text-[#8898AA] px-3 mt-4 items-center mb-5'
                  >
                    <div className='col-span-3 uppercase font-bold'>
                      <p>VIEW_Institution</p>
                    </div>
                    <div className='col-span-3'>
                      <p>Institution Management</p>
                    </div>
                    <div className='col-span-6'>
                      <p>You can view details of institution as an admin</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
