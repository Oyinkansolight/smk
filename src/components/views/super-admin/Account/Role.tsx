'use client';

import AddAdmin from '@/components/modal/addAdmin';
import Link from 'next/link';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Role = () => {
  const [action, setAction] = useState<number | null>(null);
  const [isOpen, setisOpen] = useState(false);

  function handleModal() {
    setisOpen(!isOpen);
  }
  return (
    <div>
      <div className='flex justify-end items-center space-x-4 my-5'>
        <Link
          href='/super-admin/account/manage-access-roles'
          className='w-max  rounded border border-[#008146] px-12 py-3 text-xs text-[#008146] '
        >
          Manage Roles
        </Link>
        <button
          onClick={() => setisOpen(!isOpen)}
          className='w-max  rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
        >
          Add Admin
        </button>
      </div>
      {isOpen && <AddAdmin onClickHandler={handleModal} />}

      <div className='table-add-student mt-3 py-4 pb-4 bg-white'>
        <div className='text-[#6B7A99] text-base font-semibold border-b p-3'>
          Admin Access Roles
        </div>

        <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
          <div className='col-span-2'>Name</div>
          <div className='col-span-3'>Username/Email</div>
          <div className='col-span-2'>Role</div>
          <div className='col-span-2'>Status</div>
        </div>
        {[1, 2, 3, 4, 5].map((role, idx) => (
          <div className='grid grid-cols-12 p-4 border-b' key={idx}>
            <div className='col-span-2'>John Doe</div>
            <div className='col-span-3'>johndoe@mail.com</div>
            <div className='col-span-2'>Guidance Counselors</div>
            <div className='col-span-2'>Pending</div>
            <div className='col-span-3 justify-center flex'>
              <button
                onClick={() => {
                  setAction(idx + 1);
                }}
                className='relative'
              >
                <BsThreeDotsVertical />
                {action == idx + 1 && (
                  <div className='shadow-lg rounded-xl bg-white w-[140px] h-max absolute top-0 -left-[150px] z-10'>
                    <button className='p-4 hover:bg-gray-200 w-full'>
                      Delete Account
                    </button>
                    <button className='p-4 hover:bg-gray-200 w-full'>
                      Edit Permission
                    </button>
                  </div>
                )}
              </button>
              {action && (
                <div
                  className='fixed inset-0 z-[1]'
                  onClick={() => {
                    setAction(null);
                  }}
                ></div>
              )}
            </div>
          </div>
        ))}

        <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border bg-[#008146] p-2 text-white'>
            1
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            2
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            3
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
