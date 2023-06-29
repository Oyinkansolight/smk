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

type Iprops = {
  register: any;
  errors: any;
};

const Capacity: string[] = ['Below 50', 'Above 50', 'Below 100', 'Above 100'];

const Biodata = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Class Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <FormInput
          label='Name of Class'
          placeholder='Primary 1A'
          name='className'
          register={register}
          validation={{
            required: 'Class Name is required',
          }}
          helper={
            errors?.className && {
              message: errors?.className?.message,
              type: 'danger',
            }
          }
        />
        <FormSelect
          label='Select Class Teacher'
          name='classTeacher'
          options={['AAAA', 'BBBB', 'CCCC']}
          register={register}
          validation={{
            required: 'Class Teacher is required',
          }}
          helper={
            errors?.classTeacher && {
              message: errors?.classTeacher?.message,
              type: 'danger',
            }
          }
        />
      </div>

      <div className='my-10 w-1/2 '>
        <div>
          <FormSelect
            label='Select Capacity'
            name='classCapacity'
            options={Capacity}
            register={register}
            validation={{
              required: 'Class Capacity is required',
            }}
            helper={
              errors?.classCapacity && {
                message: errors?.classCapacity?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Biodata;
