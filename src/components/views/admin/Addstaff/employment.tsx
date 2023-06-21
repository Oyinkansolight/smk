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
const employmentOptions: string[] = ['Part Time', 'Full Time'];

const Education = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Employment History</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Name of Employer'
            placeholder='Details here'
            name='employerName'
            register={register}
            validation={{
              required: 'Employer Name is required',
            }}
            helper={
              errors?.employerName && {
                message: errors?.employerName?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Role'
            placeholder='Details here'
            name='role'
            register={register}
            validation={{
              required: 'Role is required',
            }}
            helper={
              errors?.role && {
                message: errors?.role?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Employment Type'
            name='employmentType'
            options={employmentOptions}
            register={register}
            validation={{
              required: 'Employment Type is required',
            }}
            helper={
              errors?.employmentType && {
                message: errors?.employmentType?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Employment year'
            placeholder='Details here'
            name='employmentyear'
            type='date'
            register={register}
            validation={{
              required: 'Employment Year is required',
            }}
            helper={
              errors?.employmentyear && {
                message: errors?.employmentyear?.message,
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
