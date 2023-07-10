/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelect from '@/components/input/formSelectClass';
import FormSelectTeacher from '@/components/input/formSelectteachers';
import request from '@/server';
import { useEffect, useState } from 'react';

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
  allclasses: any;
};

const Education = ({ register, errors, allclasses }: Iprops) => {
  const [teachers, setteachers] = useState();
  const getData = async () => {
    const d = await request.get('/v1/government/teachers/get-staffs');
    setteachers(d.data.data.data.data as any);
  };
  useEffect(() => {
    getData();
  }, [teachers]);
  // const { data: staffsList } = useGetTeachersList();
  // logger(staffsList);

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Educational Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid grid-cols-2 gap-6'>
        <div>
          <FormSelect
            label='Assign Class'
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
          <FormSelectTeacher
            label='Class Teacher'
            name='teacher'
            options={teachers ?? []}
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
