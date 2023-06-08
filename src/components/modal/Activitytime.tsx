import FormInput from '@/components/input/formInput';
import React from 'react';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  start: string;
  end: string;
  setStartDate: (v: string | number, id: number) => void;
  setEndDate: (v: string | number, id: number) => void;
}

//Change to trigger build

function AddSingleSchool({ onClickHandler, start, end }: propType) {
  function handleSubmit() {
    onClickHandler && onClickHandler();
  }
  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[400px] flex-col space-y-4 bg-white p-10 md:p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            {' '}
            <Close className='h-3 w-3 ' />{' '}
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>
            Select Activity Date
          </h1>
          <p>Kindly select the appropriate options below:</p>

          <div className='w-full'>
            <FormInput
              type='date'
              label='Select Start Date'
              // setFormValue={setStartDate}
              formValue={start}
              placeholder='Details here'
            />
          </div>
          <div className='w-full'>
            <FormInput
              type='date'
              label='Select End Date'
              // setFormValue={setEndDate}
              formValue={end}
              placeholder='Details here'
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={handleSubmit}
            className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSingleSchool;
