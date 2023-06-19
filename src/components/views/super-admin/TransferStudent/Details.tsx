/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';

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

const Biodata = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Bio Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 w-1/2 gap-6'>
        <FormInput
          label='Enter Student ID No'
          placeholder='Details here'
          name='studentId'
          register={register}
          validation={{
            required: 'Student Id is required',
          }}
          helper={
            errors?.studentId && {
              message: errors?.studentId?.message,
              type: 'danger',
            }
          }
        />
      </div>

      <div className='my-10 gap-6'>
        <FormInput
          label='Student Name'
          placeholder='Details here'
          name='studentName'
          register={register}
          validation={{
            required: 'Student Name is required',
          }}
          helper={
            errors?.studentName && {
              message: errors?.studentName?.message,
              type: 'danger',
            }
          }
        />
      </div>
      <div className='my-10 '>
        <FormInput
          label='Enter Reason for Transfer'
          placeholder='Details here'
          name='reason'
          register={register}
          validation={{
            required: 'Reason for transfer is required',
          }}
          helper={
            errors?.reason && {
              message: errors?.reason?.message,
              type: 'danger',
            }
          }
        />
      </div>
    </section>
  );
};

export default Biodata;
