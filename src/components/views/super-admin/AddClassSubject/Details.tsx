/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelect from '@/components/input/formSelect';
import FormSelectSubject from '@/components/input/formSelectSubject';
import { useGetSubjectList } from '@/server/institution';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Iprops = {
  register: any;
  errors: any;
  addMoreClass: () => void;
  removeClass: (id: number) => void;
  submissionList: any[];
};

const SubjectToClasses = ({
  register,
  errors,
  addMoreClass,
  submissionList,
}: Iprops) => {
  const { data } = useGetSubjectList({ limit: 100 });

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Classes and Subjects</h2>
      <p>Kindly enter the details below:</p>
      {submissionList.map((_, i) => (
        <div key={i} className='my-10 grid md:grid-cols-2 gap-6'>
          <FormSelect
            label='Class Name'
            name='className'
            options={[
              'Primary 1',
              'Primary 2',
              'Primary 3',
              'Primary 4',
              'Primary 5',
              'Primary 6',
              'JSS 1',
              'JSS 2',
              'JSS 3',
              'SSS 1',
              'SSS 2',
              'SSS 3',
            ]}
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
          <FormSelectSubject
            label='Select Subject available'
            name='subject'
            options={data?.data ?? []}
            register={register}
            validation={{
              required: 'Subject is required',
            }}
            helper={
              errors?.subject && {
                message: errors?.subject?.message,
                type: 'danger',
              }
            }
          />
        </div>
      ))}

      <button
        onClick={addMoreClass}
        type='button'
        className='mt-1 font-medium text-primary'
      >
        Add Another
      </button>
    </section>
  );
};

export default SubjectToClasses;
