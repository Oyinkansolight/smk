/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from '@/components/input/formInput';
import { convertTimestampToDate } from '@/lib/helper';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler?: () => void;
  SubmitHandler?: () => void;
  settitle: (v: any) => void;
  setstartDate: (v: any) => void;
  setendDate: (v: any) => void;
  title: string;
  startDate: string;
  endDate: string;
  loading: boolean;
  itemToEdit: any;
}

function AddActivityName({
  onClickHandler,
  itemToEdit,
  SubmitHandler,
  settitle,
  setendDate,
  setstartDate,
  title,
  endDate,
  startDate,
  loading,
}: propType) {
  const [isOpen, setIsOpen] = useState(true);
  function handleVisibility() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setstartDate(convertTimestampToDate(itemToEdit.startDate));
    setendDate(convertTimestampToDate(itemToEdit.endDate));
    settitle(itemToEdit.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              placeholder='Enter a title'
              formValue={title}
              setFormValue={settitle}
            />
            <div></div>

            <FormInput
              label='Select Start Date'
              name='schoolType'
              type='date'
              placeholder='Select an option'
              formValue={startDate}
              setFormValue={setstartDate}
            />
            {isOpen && (
              <FormInput
                label='Select End Date'
                name='schoolType'
                type='date'
                placeholder='Select an option'
                formValue={endDate}
                setFormValue={setendDate}
              />
            )}
          </div>
          <div className='flex space-x-2 items-center'>
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
            onClick={SubmitHandler}
            className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
          >
            {loading ? <ImSpinner2 className='animate-spin' /> : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddActivityName;
