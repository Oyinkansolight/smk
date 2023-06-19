import FormInput from '@/components/input/formInput';
import React from 'react';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
}

//Change to trigger build

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
            Edit Student Contact Details
          </h1>
          <p>Kindly select the appropriate options below:</p>

          <div className='w-full grid grid-cols-2 gap-x-6 gap-y-10'>
            <FormInput
              type='email'
              label='E-mail'
              // setFormValue={setStartDate}
              // formValue={start}
              placeholder='Details here'
            />
            <FormInput
              type='text'
              label='Phone Number'
              // setFormValue={setStartDate}
              // formValue={start}
              placeholder='Details here'
            />
            <FormInput
              type='text'
              label='Address'
              // setFormValue={setStartDate}
              // formValue={start}
              placeholder='Details here'
            />
          </div>
          <div className='flex justify-center'>
            <button
              onClick={onClickHandler}
              className='w-max rounded border bg-secondary px-8 py-3 text-xs text-[#fff] '
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSingleSchool;
