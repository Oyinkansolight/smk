/* eslint-disable @typescript-eslint/no-explicit-any */
import FormSelect from '@/components/input/formSelect';
import React from 'react';
import Close from '~/svg/close.svg';

type Iprops = {
  register: any;
  errors: any;
  onClickHandler: () => void;
};

function CreateFolder({ onClickHandler, register, errors }: Iprops) {
  const options = ['ECCDE', 'Primary School', 'Secondary School', 'Tertiary'];

  return (
    <div className='fixed inset-0 z-[999] grid place-content-center rounded-sm bg-black/30'>
      <div className='flex w-[500px] flex-col space-y-4 bg-white p-4'>
        <div className='flex justify-end'>
          <button onClick={onClickHandler}>
            <Close className='h-3 w-3 ' />
          </button>
        </div>

        <div className='mt-4  px-5 pb-10'>
          <h1 className='text-center text-4xl font-bold mb-2'>
            Assign To A Subject
          </h1>

          <p className='text-center mb-2 mt-6'>
            Kindly enter the appropriate details below:{' '}
          </p>

          <div className='w-full mb-4'>
            <FormSelect
              label='Select School Type'
              name='schoolType'
              options={options}
              register={register}
              validation={{
                required: 'School Type is required',
              }}
              helper={
                errors?.schoolType && {
                  message: errors?.schoolType?.message,
                  type: 'danger',
                }
              }
            />
          </div>

          <div className='w-full mb-4'>
            <FormSelect
              label='Select Class'
              name='class'
              options={[
                'primary 1',
                'primary 2',
                'primary 3',
                'primary 4',
                'primary 5',
                'primary 6',
              ]}
              register={register}
              validation={{
                required: 'Class is required',
              }}
              helper={
                errors?.class && {
                  message: errors?.class?.message,
                  type: 'danger',
                }
              }
            />
          </div>

          <div className='w-full mb-4'>
            <FormSelect
              label='Select Subject'
              name='subject'
              options={['English', 'Mathematics', 'Basic Science', 'Computer']}
              register={register}
              validation={{
                required: 'School Type is required',
              }}
              helper={
                errors?.subject && {
                  message: errors?.subject?.message,
                  type: 'danger',
                }
              }
            />
          </div>

          <div className='flex justify-center mt-12'>
            <button
              onClick={onClickHandler}
              className='w-max rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFolder;
