/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import FormSelectOption from '@/components/input/formSelectOptional';
import { useGetLocalGovernments } from '@/server/onboard';
import { useEffect, useState } from 'react';

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
const Contact = ({ register, errors }: Iprops) => {
  const locals = useGetLocalGovernments();
  const [towns, setTowns] = useState<any>([]);

  const StatusOptions: string[] = [
    'Single Parents',
    'Orphans',
    'Domestic Helps',
    'Unemployed Parents',
    'Not Applicable ',
  ];

  useEffect(() => {
    if (!locals.isLoading && locals.data && locals.data.length > 0) {
      locals.data.forEach((local: any) => {
        setTowns([...towns, local.towns]);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locals.data]);

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Parent Contact Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Phone Number'
            type='tel'
            placeholder='Details here'
            name='parentphoneNumber'
            register={register}
            validation={{
              required: 'Phone Number is required',
            }}
            helper={
              errors?.parentphoneNumber && {
                message: errors?.parentphoneNumber?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Email'
            placeholder='Details here'
            name='parentEmail'
            register={register}
            validation={{
              required: 'Email Number is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please Enter A Valid Email!',
              },
            }}
            helper={
              errors?.parentEmail && {
                message: errors?.parentEmail?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Address'
            placeholder='Details here'
            name='parentAddress'
            register={register}
            validation={{
              required: 'Address is required',
            }}
            helper={
              errors?.parentAddress && {
                message: errors?.parentAddress?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormSelectOption
            label='Town'
            name='parenttownId'
            options={Array.prototype.concat.apply([], towns)}
            register={register}
            validation={{
              required: 'Town is required',
            }}
            helper={
              errors?.parenttownId && {
                message: errors?.parenttownId?.message,
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

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Parental/Guardian Status'
            name='parentStatus'
            options={StatusOptions}
            register={register}
            validation={{
              required: 'Parental/Guardian status is required',
            }}
            helper={
              errors?.parentStatus && {
                message: errors?.parentStatus?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
