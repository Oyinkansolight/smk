import Link from 'next/link';
import React from 'react';
import Close from '~/svg/close.svg';
import Star from '~/svg/stars.svg';

interface propType {
  onClickHandler?: () => void;
}

function AddSingleSchool({ onClickHandler }: propType) {
  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[700px] flex-col space-y-4 bg-white p-10 md:p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            {' '}
            <Close className='h-3 w-3 ' />{' '}
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>
            Select a registration type
          </h1>

          <div className='mb-5 flex flex-col space-y-5 rounded bg-[#F4F9FF] p-4'>
            <Star className='h-10 w-10 ' />
            <Link
              href='/super-admin/add-school-with-link'
              className='text-md font-bold'
            >
              Send a link
            </Link>
            <p className='text-gray-400'>
              You can send a link directly to the institution so they can register
              their details.
            </p>
          </div>
          <div className='flex flex-col space-y-5 rounded bg-[#F4F9FF] p-4'>
            <Star className='h-10 w-10  ' />
            <Link href='/super-admin/add-school' className='text-md font-bold'>
              Register Institution
            </Link>
            <p className='text-gray-400'>
              Enter the details and register an institution directly here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSingleSchool;
