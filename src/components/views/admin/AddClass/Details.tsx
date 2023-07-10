/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormInput from '@/components/input/formInput';
import FormSelect from '@/components/input/formSelect';
import FormSelectClass from '@/components/input/formSelectClass';
import FormSelectTeacher from '@/components/input/formSelectteachers';
import { useGetStaffs } from '@/server/government/staff';
import { useGetClassesList } from '@/server/institution';

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

const Capacity: string[] = ['Below 50', 'Above 50', 'Below 100', 'Above 100'];

const Biodata = ({ register, errors }: Iprops) => {
  const { data: staffs } = useGetStaffs();
  const { data: allclasses } = useGetClassesList();

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Class Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormSelectClass
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
      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <FormInput
          label='Class Arm'
          placeholder='A'
          name='classArm'
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
        <FormSelectTeacher
          label='Select Class Teacher'
          name='classTeacher'
          options={staffs ?? []}
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
    </section>
  );
};

export default Biodata;
