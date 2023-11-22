/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import GenericLoader from '@/components/layout/Loader';
import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Details from '@/components/views/admin/AddClass/Details';
import Publish from '@/components/views/admin/AddClass/publish';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useGetTeachersListByInstitution,
  useUpdateClassArm,
} from '@/server/institution';
import { useGetClassArmInfo } from '@/server/institution/class';
import Image from 'next/image';
import Link from 'next/link';
// import { useGetClassArmStudents } from '@/server/institution/class-arm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const EditClass = () => {
  const p = useSearchParams();
  const classArmId = p?.get('id');

  const {
    data: classArmInfo,
    refetch: refetchClassArm,
    isRefetching: isRefetchingArms,
    isLoading: isLoadingArms,
  } = useGetClassArmInfo(classArmId);

  const { data: institutionProfile } = useGetProfile();
  const { data: staffs } = useGetTeachersListByInstitution({
    instituteId: institutionProfile?.userInfo?.esiAdmin?.id,
    limit: 1000,
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [stage, setStage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishData, setPublishedData] = useState(null);

  const handleUpdateClassArm = useUpdateClassArm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);

    if (
      !data.class ||
      !data.classArm ||
      !data.classTeacher ||
      !data.classCapacity ||
      !data.subjects
    ) {
      toast.error('All fields must be completed');
    }
    if (
      stage === 1 &&
      data.class &&
      data.classArm &&
      data.classTeacher &&
      data.classCapacity &&
      data.subjects
    ) {
      setPublishedData(data);
      setStage(stage + 1);
    }

    if (stage === 2) {
      // const assignedSubjects: string[] = [];
      // data.subjects.map((subject) => assignedSubjects.push(subject.value));

      const classArmData = {
        id: classArmId,
        arm: data.classArm.toUpperCase(),
        capacity: Number(data.classCapacity),
        classId: data.class,
        teacherId: data.classTeacher.value,
        // subjects: assignedSubjects,
      };
      try {
        setLoading(true);
        const response = await handleUpdateClassArm.mutateAsync(classArmData);

        if (response) {
          toast.success('Class Arm updated successfully');
          setLoading(false);
          //2 Second - Open Success Modal
          setIsOpen(true);
        }
      } catch (error) {
        setLoading(false);
        toast.error(getErrMsg(error));
      }
    }
  };

  const prevHandler = (): void => {
    if (stage >= 2) {
      setStage(stage - 1);
    }
  };

  const stepperData = [
    {
      stage: 1,
      stageName: 'Class Details',
    },
    {
      stage: 2,
      stageName: 'Publish',
    },
  ];

  useEffect(() => {
    refetchClassArm();
  }, [refetchClassArm, classArmId]);

  if (isLoadingArms || isRefetchingArms) {
    return (
      <div className='flex justify-center items-center h-1/2'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Class arm updated successfully'
          description='Hurray!'
          link='/admin/all-classes'
          homeLink='/admin'
          textLink='Manage Classes'
        />
      )}
      <Link href='/admin/all-classes'>
        <div className='flex items-center space-x-4'>
          <Image
            src='/svg/back.svg'
            width={10}
            height={10}
            alt='back'
            className='h-4 w-4'
          />
          <h3 className='text-[10px] font-medium'>Back</h3>
        </div>
      </Link>

      <h1 className='mt-5 mb-6 text-2xl font-bold'> Edit Class Details</h1>

      <Stepper
        variant='#007AFF'
        section='admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && (
            <Details
              register={register}
              errors={errors}
              control={control}
              staffs={staffs}
              profile={institutionProfile}
              classArmInfo={classArmInfo}
            />
          )}

          {stage === 2 && <Publish publishData={publishData} staffs={staffs} />}
          <div className='mb-6 mt-10 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                type='button'
                onClick={prevHandler}
                className='cursor-pointer w-full rounded px-2 py-3 text-xs text-[#007AFF] md:px-6'
              >
                Prev
              </button>
              {stage < 2 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  Next
                </button>
              )}
              {stage == 2 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  {loading ? <ImSpinner2 /> : 'Publish'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditClass;
