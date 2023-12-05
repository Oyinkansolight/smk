'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Biodata from '@/components/views/admin/AddStudent/biodata';
import Contact from '@/components/views/admin/AddStudent/contact';
import Education from '@/components/views/admin/AddStudent/education';
import ParentContact from '@/components/views/admin/AddStudent/parentcontact';
import Publish from '@/components/views/admin/AddStudent/publish';
import { isProd } from '@/constant/env';
import { uploadDocument } from '@/firebase/init';
import { stripWhiteSpace } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import {
  useAssignStudentToParent,
  useCreateStudent,
} from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

export default function AddStudent() {
  const { data: institutionProfile } = useGetProfile();
  const assignStudentToParent = useAssignStudentToParent();

  const {
    register,
    getValues,
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
  const [imageData, setImageData] = useState<File | undefined>();

  const [publishData, setpublishData] = useState(null);

  const [parentId, setParentId] = useState('');

  const handleParentId = (id: string) => {
    setParentId(id);
  };

  const handleCreateStudent = useCreateStudent();
  /**
   *
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data) => {
    if (
      stage === 1 &&
      data.firstName &&
      data.lastName &&
      data.gender &&
      data.dob
    ) {
      setStage(stage + 1);
    }
    if (stage === 2 && data.phoneNumber && data.address) {
      setStage(stage + 1);
    }
    if (stage === 3) {
      setStage(stage + 1);
    }
    if (stage === 4 && data.class) {
      // setStage(stage + 1);
      const environment = isProd ? 'production' : 'staging';
      const array = await imageData?.arrayBuffer();
      let uploadedImage = `profile_pictures/${data.firstName + data.lastName}`;
      if (array) {
        uploadedImage = await uploadDocument(uploadedImage, array, environment);
      }

      const studentData: any = {
        profileImg: uploadedImage,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dob: data.dob,
        parentStatus: data.parentStatus,
        parentName: data.parentName,
        parentOccupation: data.parentOccupation,
        email: stripWhiteSpace(data.studentEmail),
        password: '12345',
        phoneNumber: data.phoneNumber,
        address: data.address,
        classArmId: data.class,
        institutionId: institutionProfile?.userInfo?.esiAdmin?.id,
      };

      if (parentId) {
        studentData.parentId = parentId;
      }

      setpublishData(data);

      setloading(true);
      const response = await handleCreateStudent.mutateAsync(studentData);

      if (response.status === 201) {
        toast.success('Student Added successfully');

        if (parentId) {
          const parentData = {
            id: parentId,
            studentId: response.data.data.data.id,
          };
          const parentLinkResponse = await assignStudentToParent.mutateAsync(
            parentData
          );

          if (!parentLinkResponse) {
            toast.error('Error linking parent to student');
            setloading(false);
          }
        }

        setloading(false);

        //2 Second - Open Success Modal
        setisOpen(true);
      } else {
        toast.error('Error adding student');
        setloading(false);
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
          link='/admin/all-student'
          textLink='Manage student'
        />
      )}
      <Link href='/admin/all-student'>
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
              setImageData={(v) => setImageData(v)}
            />
          )}
          {stage === 2 && (
            <Contact
              register={register}
              errors={errors}
              getValues={getValues}
            />
          )}
          {stage === 3 && <ParentContact handleParentId={handleParentId} />}
          {stage === 4 && <Education register={register} errors={errors} />}
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
