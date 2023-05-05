/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
};

const StaffTypeOptions: string[] = ['Headmaster', 'Headmistress', 'Admin'];
const GenderOptions: string[] = ['male', 'female', 'other'];
const Biodata = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Bio Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 w-1/2 gap-6'>
        <FormSelect
          label='Staff type'
          name='staffType'
          options={StaffTypeOptions}
          register={register}
          validation={{
            required: 'Staff type is required',
          }}
          helper={
            errors?.staffType && {
              message: errors?.staffType?.message,
              type: 'danger',
            }
          }
        />
      </div>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='First name'
            placeholder='Details here'
            name='firstName'
            register={register}
            validation={{
              required: 'First Name is required',
            }}
            helper={
              errors?.firstName && {
                message: errors?.firstName?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Last name'
            placeholder='Details here'
            name='lastName'
            register={register}
            validation={{
              required: 'Last Name is required',
            }}
            helper={
              errors?.lastName && {
                message: errors?.lastName?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Gender'
            name='gender'
            options={GenderOptions}
            register={register}
            validation={{
              required: 'gender is required',
            }}
            helper={
              errors?.gender && {
                message: errors?.gender?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Date of birth'
            type='date'
            placeholder='Details here'
            name='dob'
            register={register}
            validation={{
              required: 'Date of birth is required',
            }}
            helper={
              errors?.dob && {
                message: errors?.dob?.message,
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
