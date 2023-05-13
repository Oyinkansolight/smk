import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import React, { useState } from 'react';
import Close from '~/svg/close.svg';

interface propType {
  onClickHandler: () => void;
}

function AddAdmin({ onClickHandler }: propType) {
  const [role, setRole] = useState<string | number>('');
  const [schoolEmail, setSchoolEmail] = useState<string | number>('');
  const options = ['First', 'Second', 'Third'];

  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[700px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4 space-y-4 px-10 pb-10'>
          <h1 className='text-center text-4xl font-bold'>
            Add New School Type
          </h1>

          <p className='text-center'>Kindly enter the details below: </p>
          <div className='grid grid-cols-2 gap-6'>
            <div className='w-full'>
              <FormInput
                type='email'
                label='Name*'
                setFormValue={setSchoolEmail}
                formValue={schoolEmail}
                placeholder='Details here'
              />
            </div>

            <div className='w-full'>
              <FormSelect
                label='Select Terms/Semester*'
                setFormValue={setRole}
                formValue={role}
                options={options}
              />
            </div>
          </div>
          <div className='w-full my-10'>
            <FormInput
              type='text'
              label='Enter Description'
              setFormValue={setSchoolEmail}
              formValue={schoolEmail}
              placeholder='Details here'
            />
          </div>

          <div className='text-center space-y-4'>
            <h1 className='text-[#E5A500] text-base font-medium'>Note</h1>
            <p>
              You would be required to add and manage classes for each school
              type created.
            </p>
          </div>

          <div className='flex justify-center'>
            <button
              onClick={onClickHandler}
              className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
            >
              Add School Type{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
