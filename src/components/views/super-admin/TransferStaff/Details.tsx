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
          label='Enter Staff ID No'
          placeholder='Details here'
          name='staffId'
          register={register}
          validation={{
            required: 'Staff Id is required',
          }}
          helper={
            errors?.staffId && {
              message: errors?.staffId?.message,
              type: 'danger',
            }
          }
        />
      </div>

      <div className='my-10 gap-6'>
        <FormInput
          label='Staff Name'
          placeholder='Details here'
          name='staffName'
          register={register}
          validation={{
            required: 'Staff Name is required',
          }}
          helper={
            errors?.staffName && {
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
