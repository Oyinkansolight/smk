/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
};
const gradeOptions: string[] = [
  'First Class',
  'Second Class Honours (Upper Division)',
  'Second Class Honours (Lower Division)',
  'Third Class Honours',
  'Pass degree',
];

const Education = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Education Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='School Attended'
            placeholder='Details here'
            name='schoolAttended'
            register={register}
            validation={{
              required: 'School Attended is required',
            }}
            helper={
              errors?.schoolAttended && {
                message: errors?.schoolAttended?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Course Attended'
            placeholder='Details here'
            name='courseAttended'
            register={register}
            validation={{
              required: 'Course Attended is required',
            }}
            helper={
              errors?.courseAttended && {
                message: errors?.courseAttended?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Grade'
            name='grade'
            options={gradeOptions}
            register={register}
            validation={{
              required: 'Grade is required',
            }}
            helper={
              errors?.grade && {
                message: errors?.grade?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Select Year'
            placeholder='Details here'
            name='year'
            type='date'
            register={register}
            validation={{
              required: 'Year is required',
            }}
            helper={
              errors?.year && {
                message: errors?.year?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>

      {/*    <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            School Attended
          </label>
          <input
            type='text'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Course Attended
          </label>
          <input
            type='email'
            className='mt-1 w-full border p-4'
            placeholder='Details here'
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Grade
          </label>
          <div className='mt-1 w-full border p-4'>
            <select name='' id='' className='outline-none'>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold'>
            Select Year
          </label>
          <div className='mt-1 w-full border p-4'>
            <select name='' id='' className='outline-none'>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
              <option value='Select an option'>Select an option</option>
            </select>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Education;
