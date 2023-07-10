'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Biodata from '@/components/views/admin/AddStudent/biodata';
import Contact from '@/components/views/admin/AddStudent/contact';
import Education from '@/components/views/admin/AddStudent/education';
import ParentContact from '@/components/views/admin/AddStudent/parentcontact';
import Publish from '@/components/views/admin/AddStudent/publish';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useCreateStudent, useGetClassesList } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

export default function AddStudent() {
  const { data: allclasses } = useGetClassesList();
  const { data: institutionProfile } = useGetProfile();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [stage, setStage] = useState(1);
  const [imgSrc, setImgSrc] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const [publishData, setpublishData] = useState(null);

  const handleCreateStudent = useCreateStudent();
  /**
   *
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    if (
      stage === 1 &&
      data.firstName &&
      data.lastName &&
      data.gender &&
      data.dob
    ) {
      setStage(stage + 1);
    }
    if (stage === 2 && data.phoneNumber && data.address && data.townId) {
      setStage(stage + 1);
    }
    if (
      stage === 3 &&
      data.parentphoneNumber &&
      data.parentEmail &&
      data.parentAddress &&
      data.parenttownId &&
      data.parentName &&
      data.parentOccupation &&
      data.parentStatus
    ) {
      setStage(stage + 1);
    }
    if (stage === 4 && data.teacher && data.class) {
      // setStage(stage + 1);

      const studentData = {
        profileImg: 'http://placeimg.com/640/480',
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dob: data.dob,
        parentStatus: data.parentStatus,
        parentName: data.parentName,
        parentOccupation: data.parentOccupation,
        email: data.parentEmail,
        password: '123456789',
        phoneNumber: data.phoneNumber,
        address: data.address,
        lga: data.townId,
        parentDetails: {
          name: data.parentName,
          phoneNumber: data.parentphoneNumber,
          email: data.parentEmail,
          address: data.parentAddress,
          lga: data.parenttownId,
        },
        classId: +data.class,
        classTeacherId: +data.teacher,
        institutionId: institutionProfile?.id,
      };

      setpublishData(data);

      try {
        setloading(true);
        const response = await handleCreateStudent.mutateAsync(studentData);

        if (response) {
          toast.success('Student Added successfully');
          setloading(false);

          //2 Second - Open Success Modal
          setisOpen(true);
        }
      } catch (error) {
        setloading(false);
        toast.error(getErrMsg(error));
        toast.error(getErrMsg(error));
      }
    }
  };

  // const nextHandler = (): void => {
  //   if (stage >= 1 && stage <= 4) {
  //     setStage(stage + 1);
  //   }
  // };
  const prevHandler = (): void => {
    if (stage >= 2) {
      setStage(stage - 1);
    }
  };
  const stepperData = [
    {
      stage: 1,
      stageName: 'Bio Details',
    },
    {
      stage: 2,
      stageName: 'Contact Details',
    },
    {
      stage: 3,
      stageName: 'Parent Contact Details',
    },
    {
      stage: 4,
      stageName: 'Educational Details',
    },
    {
      stage: 5,
      stageName: 'Publish',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Student created successfully'
          description='School Student created successfully'
          link='/super-admin/all-student'
          textLink='Manage student'
        />
      )}
      <Link href='/admin'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Add Student</h1>

      <Stepper
        variant='#007AFF'
        section='admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && (
            <Biodata
              register={register}
              errors={errors}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
            />
          )}
          {stage === 2 && <Contact register={register} errors={errors} />}
          {stage === 3 && <ParentContact register={register} errors={errors} />}
          {stage === 4 && (
            <Education
              register={register}
              errors={errors}
              allclasses={allclasses}
            />
          )}
          {stage === 5 && <Publish publishData={publishData} />}

          <div className='mb-6 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                onClick={prevHandler}
                type='button'
                className='w-full rounded px-2 py-3 text-xs text-[#3361FF] md:px-6'
              >
                Prev
              </button>
              {stage <= 5 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  {loading ? <ImSpinner2 className='animate-spin' /> : 'Next'}
                </button>
              )}
              {stage === 6 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
