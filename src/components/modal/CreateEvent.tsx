import FormInput from '@/components/input/formInput';
import { subtractMonthsFromCurrentDate } from '@/lib/helper';
import React, { useState } from 'react';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
}

function AddActivityName({ onClickHandler }: propType) {
  function handleSubmit() {
    onClickHandler && onClickHandler();
  }
  const [isOpen, setIsOpen] = useState(true);
  function handleVisibility() {
    setIsOpen(!isOpen);
  }

  return (
    <div className='fixed inset-0 z-10 grid place-content-center rounded-sm bg-black/30'>
      <div className='flex md:w-[800px] w-[500px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>Edit Event</h1>
          <p className='text-center'>
            Kindly select the appropriate options below:
          </p>
          <div className='w-full grid grid-cols-2 gap-4'>
            <FormInput
              label='Title*'
              name='Title'
              type='text'
              placeholder='Select an option'
            />
            <div></div>

            <FormInput
              type='date'
              name='schoolType'
              label='Select Start Date'
              placeholder='Select an option'
              min={subtractMonthsFromCurrentDate()}
            />
            {isOpen && (
              <FormInput
                type='date'
                name='schoolType'
                label='Select End Date'
                placeholder='Select an option'
                min={subtractMonthsFromCurrentDate()}
              />
            )}
          </div>
          <div className='flex space-x-2 items-center'>
            {' '}
            <input
              type='checkbox'
              className='scale-125 transform'
              checked={!isOpen}
              onClick={handleVisibility}
            />
            <span>Event is just for a day</span>
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

export default AddActivityName;
