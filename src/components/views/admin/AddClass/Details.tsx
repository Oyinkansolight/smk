/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FormSelectClassDefault from '@/components/input/FormSelectClassDefault';
import FormInput from '@/components/input/formInput';
import GenericLoader from '@/components/layout/Loader';
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

type Iprops = {
  register: any;
  errors: any;
  classArmInfo?: any;
  control: Control<FieldValues, any>;
  staffs: any;
  profile?: UserProfile;
};

// const Capacity: string[] = numbers;

const Biodata = ({
  register,
  errors,
  control,
  staffs,
  profile,
  classArmInfo,
}: Iprops) => {
  const { data: allClasses, isLoading: isLoadingClasses } = useGetClassesList();
  const { data: allSubjects, isLoading: isLoadingSubjects } = useGetSubjectList(
    { limit: 50 }
  );

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

  const staffData = (staffs?.data ?? []).map((v) => ({
    label: v?.user ? `${v?.user?.firstName} ${v?.user?.lastName}` : ' ',
    value: v.id,
  }));

  const selectedTeacherIndex = (staffData ?? []).findIndex(
    (item) => item.value == classArmInfo?.teacher?.id
  );

  if (
    isLoadingClasses ||
    isLoadingSubjects ||
    (classArmInfo?.teacher?.id && !staffData[selectedTeacherIndex])
  ) {
    return (
      <div className='flex justify-center items-center'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Class Details</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormSelectClassDefault
            label='Select Class'
            name='class'
            formValue={classArmInfo?.class?.id ?? ''}
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
            formValue={classArmInfo?.capacity ?? ''}
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
          formValue={classArmInfo?.arm ?? ''}
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
                {...field}
                options={staffData}
                className='h-auto mt-2 select'
                defaultValue={staffData[selectedTeacherIndex]}
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
                defaultValue={classArmInfo?.subjects?.map((v) => ({
                  label: v?.name,
                  value: v.id,
                }))}
                options={(allSubjects?.data ?? []).map((v) => ({
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
