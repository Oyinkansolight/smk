/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelectClassDefault from '@/components/input/FormSelectClassDefault';
import FormInput from '@/components/input/formInput';
import { useGetClassesList } from '@/server/institution';
import { Control, Controller, FieldValues } from 'react-hook-form';
import ReactSelect from 'react-select';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
  control: Control<FieldValues, any>;
  staffs: any;
};


// const Capacity: string[] = numbers;

const Biodata = ({ register, errors, control, staffs }: Iprops) => {
  const { data: allclasses } = useGetClassesList();

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Class Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormSelectClassDefault
            label='Select Class'
            name='class'
            options={allclasses?.data ?? []}
            register={register}
            validation={{
              required: 'Class is required',
            }}
            helper={
              errors?.class && {
                message: errors?.class?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormInput
            label='Input class capacity'
            placeholder='25'
            name='classCapacity'
            register={register}
            validation={{
              required: 'Class Capacity is required',
              validate: {
                maxLength: (v) =>
                  v.length <= 40 ||
                  'The class capacity should not be more than 40',
              },
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
      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <FormInput
          label='Class Arm'
          placeholder='A'
          name='classArm'
          register={register}
          validation={{
            required: 'Class Arm Name is required',
          }}
          helper={
            errors?.className && {
              message: errors?.classArm?.message,
              type: 'danger',
            }
          }
        />

        <Controller
          control={control}
          name='classTeacher'
          render={({ field }) => (
            <div>
              <div className='font-bold'>Select Class Teacher </div>
              <ReactSelect
                isMulti
                required
                options={(staffs?.data ?? []).map((v) => ({
                  label: v?.user
                    ? `${v?.user[0]?.firstName} ${v?.user[0]?.lastName}`
                    : ' ',
                  value: v.id,
                }))}
                {...field}
                className='h-auto mt-2 select'
              />
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default Biodata;
