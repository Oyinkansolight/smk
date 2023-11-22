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
    (item) => item.value == classArmInfo?.teacher.id
  );

  if (
    isLoadingClasses ||
    isLoadingSubjects ||
    (classArmInfo?.teacher.id && !staffData[selectedTeacherIndex])
  ) {
    return (
      <div className='flex justify-center items-center'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <section className=''>
      <h2 className='text-3xl font-bold'>Link Student</h2>
      <p>Kindly enter the details below:</p>

      <div className='my-10 grid md:grid-cols-2 gap-6'>
        <div>
          <FormSelectClassDefault
            label='Select Student'
            name='student'
            formValue={classArmInfo?.class?.id ?? ''}
            options={filteredClass ?? []}
            register={register}
            validation={{
              required: 'student is required',
            }}
            helper={
              errors?.class && {
                message: errors?.student?.message,
                type: 'danger',
              }
            }
          />
        </div>
        <div>
          <FormSelectClassDefault
            label='Select Student'
            name='student'
            formValue={classArmInfo?.class?.id ?? ''}
            options={['Father', 'Mother', 'Brother', 'Guardian']}
            register={register}
            validation={{
              required: 'student is required',
            }}
            helper={
              errors?.class && {
                message: errors?.student?.message,
                type: 'danger',
              }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Biodata;
