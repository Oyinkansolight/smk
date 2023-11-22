/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';

type Iprops = {
  register: any;
  errors: any;
  getValues?: any
};
const Contact = ({ register, errors }: Iprops) => {
  // const locals = useGetLocalGovernments();
  // const [towns, setTowns] = useState<any>([]);

  // useEffect(() => {
  //   if (!locals.isLoading && locals.data && locals.data.length > 0) {
  //     setTowns([locals.data]);
  //   }

  // }, [locals.data, locals.isLoading]);

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Student Contact Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
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
          <FormInput
            label='Phone Number'
            type='number'
            placeholder='Details here'
            name='phoneNumber'
            register={register}
            validation={{
              required: 'Phone Number is required',
              maxLength: {
                value: 11,
                message: 'Phone Number should not exceed 11 characters',
              },
            }}
            helper={
              errors?.phoneNumber && {
                message: errors?.phoneNumber?.message,
                type: 'danger',
              }
            }
          />
        </div>

        {/* <div>
          <FormSelect
            label='Local Government Area'
            name='townId'
            options={Array.prototype.concat.apply([], towns)}
            register={register}
            validation={{
              required: 'Town is required',
            }}
            formValue={ getValues ? `${getValues('townId')}` : ""}
            helper={
              errors?.townId && {
                message: errors?.townId?.message,
                type: 'danger',
              }
            }
          />
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
