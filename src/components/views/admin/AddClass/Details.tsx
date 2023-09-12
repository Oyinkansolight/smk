/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelectClassDefault from '@/components/input/FormSelectClassDefault';
import FormInput from '@/components/input/formInput';
import { useGetClassesList, useGetSubjectList } from '@/server/institution';
import { UserProfile } from '@/types/auth';
import { useMemo } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import ReactSelect from 'react-select';

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
  control: Control<FieldValues, any>;
  staffs: any;
  profile?: UserProfile;
};

// const Capacity: string[] = numbers;

const Biodata = ({ register, errors, control, staffs, profile }: Iprops) => {
  const { data: allClasses } = useGetClassesList();
  const { data: allSubjects } = useGetSubjectList();

  const filteredClass = useMemo(() => {
    const response =
      allClasses?.data.filter(
        (v) =>
          typeof v.institutionType === 'string' &&
          v.institutionType.toLowerCase() ===
          profile?.userInfo?.esiAdmin?.instituteType.toLowerCase()
      ) ?? [];
    return response;
  }, [allClasses?.data, profile?.userInfo?.esiAdmin?.instituteType]);

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Class Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormSelectClassDefault
            label='Select Class'
            name='class'
            options={filteredClass ?? []}
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
            placeholder='Number of students in class'
            name='classCapacity'
            register={register}
            validation={{
              required: 'Class Capacity is required',
              // validate: {
              //   //* count should be less than or equal to 50
              //   lessThan: (v) => {
              //     return parseInt(v) <= 50;
              //   },
              // },
            }}
            helper={
              errors?.classCapacity && {
                message: 'Class capacity is required',
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
              <div className='font-bold'>Select Class Teacher</div>
              <ReactSelect
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

        <Controller
          control={control}
          name='subjects'
          render={({ field }) => (
            <div>
              <div className='font-bold'>Select Class Subjects</div>
              <ReactSelect
                isMulti
                required
                options={(allSubjects ?? []).map((v) => ({
                  label: v?.name,
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
