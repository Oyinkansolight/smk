/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelect from '@/components/input/formSelect';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useGetTeachersList } from '@/server/institution';
// import { useState } from 'react';

type Iprops = {
  register: any;
  errors: any;
};

const classOptions: string[] = [
  'Primary 1',
  'Primary 2',
  'Primary 3',
  'Primary 4',
  'Primary 5',
  'Primary 6',
];

const Education = ({ register, errors }: Iprops) => {
  // const teachersList = useGetTeachersList();

  // const [teachers] = useState<any>(teachersList || []);

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
            options={['Adams Smith', 'Augustine Steven']}
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
