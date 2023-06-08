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

type Iprops = {
  register: any;
  errors: any;
};

const GenderOptions: string[] = ['MALE', 'FEMALE', 'Others'];
const Biodata = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Bio Details</h2>
      <p>Kindly enter the details below:</p>

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
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Height (cm) '
            type='number'
            placeholder='Details here'
            name='height'
            register={register}
            validation={{
              required: 'Height is required',
            }}
            helper={
              errors?.height && {
                message: errors?.height?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Weight(KG)'
            type='number'
            placeholder='Details here'
            name='weight'
            register={register}
            validation={{
              required: 'Weight is required',
            }}
            helper={
              errors?.weight && {
                message: errors?.weight?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Parent Name'
            type='text'
            placeholder='Details here'
            name='parentName'
            register={register}
            validation={{
              required: 'Parent Name is required',
            }}
            helper={
              errors?.parentName && {
                message: errors?.parentName?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Parent Occupation'
            type='text'
            placeholder='Details here'
            name='parentOccupation'
            register={register}
            validation={{
              required: 'Parent Occupation is required',
            }}
            helper={
              errors?.parentOccupation && {
                message: errors?.parentOccupation?.message,
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
