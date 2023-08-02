/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import FormSelectOptional from '@/components/input/formSelectOptional';
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

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
};

const Contact = ({ register, errors }: Iprops) => {
  const locals = useGetLocalGovernments();
  const [towns, setTowns] = useState<any>([]);

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
      <h2 className='text-3xl font-bold'>Contact Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Phone Number'
            type='tel'
            placeholder='Details here'
            name='phoneNumber'
            register={register}
            validation={{
              required: 'Phone Number is required',
            }}
            helper={
              errors?.phoneNumber && {
                message: errors?.phoneNumber?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Email'
            placeholder='Details here'
            name='email'
            register={register}
            validation={{
              required: 'Email is required',
            }}
            helper={
              errors?.email && {
                message: errors?.email?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Residential Address'
            placeholder='Details here'
            name='address'
            register={register}
            validation={{
              required: 'Address is required',
            }}
            helper={
              errors?.address && {
                message: errors?.address?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormSelectOptional
            label='Local Government Area'
            name='townId'
            options={Array.prototype.concat.apply([], towns)}
            register={register}
            validation={{
              required: 'Town is required',
            }}
            helper={
              errors?.townId && {
                message: errors?.townId?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='border-t w-full my-4'></div>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Name of Next Of Kin'
            type='text'
            placeholder='Details here'
            name='nextOfKin'
            register={register}
            validation={{
              required: 'next Of kin is required',
            }}
            helper={
              errors?.nextOfKin && {
                message: errors?.nextOfKin?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormSelect
            label='Relationship to Next Of Kin'
            name='relationshipToNextOfKin'
            options={[
              'Husband',
              'Wife',
              'Brother',
              'Mother',
              'Sister',
              'Daughter',
              'Son',
              'others',
            ]}
            register={register}
            validation={{
              required: 'Relationship NOK is required',
            }}
            helper={
              errors?.relationshipToNextOfKin && {
                message: errors?.relationshipToNextOfKin?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormInput
            label='Address of Next Of Kin'
            placeholder='Details here'
            name='addressOfNextOfKin'
            register={register}
            validation={{
              required: 'address of next of kin is required',
            }}
            helper={
              errors?.addressOfNextOfKin && {
                message: errors?.addressOfNextOfKin?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Phone Number of Next Of kin'
            type='tel'
            placeholder='Details here'
            name='phoneOfNextOfKin'
            register={register}
            validation={{
              required: 'Phonenumber  of next of kin is required',
            }}
            helper={
              errors?.phoneOfNextOfKin && {
                message: errors?.phoneOfNextOfKin?.message,
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
