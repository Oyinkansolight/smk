/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelectOptional';
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
              required: 'Email Number is required',
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
            label='Address'
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
          <FormSelect
            label='Town'
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
    </section>
  );
};

export default Contact;
