/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelect from '@/components/input/formSelect';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
};

const classOptions: string[] = ['AAA', 'BBB', 'CCC'];
const teachersOptions: string[] = ['AAAA', 'BBBB', 'CCCC'];
const Education = ({ register, errors }: Iprops) => {
  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Educational Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Class'
            name='class'
            options={classOptions}
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
            label='Teacher'
            name='teacher'
            options={teachersOptions}
            register={register}
            validation={{
              required: 'Teacher is required',
            }}
            helper={
              errors?.teacher && {
                message: errors?.teacher?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Education;
