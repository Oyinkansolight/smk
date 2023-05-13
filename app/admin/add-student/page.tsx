'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Biodata from '@/components/views/admin/AddStudent/biodata';
import Contact from '@/components/views/admin/AddStudent/contact';
import Document from '@/components/views/admin/AddStudent/document';
import Education from '@/components/views/admin/AddStudent/education';
import Publish from '@/components/views/admin/AddStudent/publish';
import { useCreateStudent } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AddStudent() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [stage, setStage] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const [imageName, setImageName] = useState<string>('');
  const [imageData, setImageData] = useState('http://placeimg.com/640/480');

  const [imageName1, setImageName1] = useState<string>('');
  const [imageData1, setImageData1] = useState('http://placeimg.com/640/480');

  const [imageName2, setImageName2] = useState<string>('');
  const [imageData2, setImageData2] = useState('http://placeimg.com/640/480');

  const [publishData, setpublishData] = useState(null);

  const handleCreateStudent = useCreateStudent();
  /**
   *
   */
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(stage);
    console.log(errors);
    console.log(data);
    if (
      stage === 1 &&
      data.firstName &&
      data.lastName &&
      data.gender &&
      data.dob &&
      data.parentName &&
      data.parentOccupation
    ) {
      setStage(stage + 1);
      console.log(stage);
    }
    if (
      stage === 2 &&
      data.phoneNumber &&
      data.address &&
      data.email &&
      data.townId
    ) {
      setStage(stage + 1);
      console.log(stage);
    }
    if (stage === 3 && data.class && data.teacher) {
      setStage(stage + 1);
      console.log(stage);
    }
    if (
      stage === 4 &&
      data.idCardImage &&
      data.firstDocumentType &&
      data.firstUpload &&
      data.secondDocumentType &&
      data.secondUpload
    ) {
      delete data.class;
      delete data.teacher;
      data.password = '12345678';
      data.idCardImage = 'http://placeimg.com/640/480';
      data.firstUpload = 'http://placeimg.com/640/480';
      data.secondUpload = 'http://placeimg.com/640/480';
      data.townId = +data.townId;
      setpublishData(data);

      try {
        const response = await handleCreateStudent.mutateAsync(data);

        if (response) {
          toast.success('Student Added successfully');

          //2 Second - Open Success Modal
          setisOpen(true);
        }
      } catch (error) {
        toast.error((error as Error).message);
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
      stageName: 'Educational Details',
    },
    {
      stage: 4,
      stageName: 'Upload Details',
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

      <div className='table-add-student mt-7 md:px-20 px-4 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && <Biodata register={register} errors={errors} />}
          {stage === 2 && <Contact register={register} errors={errors} />}
          {stage === 3 && <Education register={register} errors={errors} />}
          {stage === 4 && (
            <Document
              register={register}
              errors={errors}
              setImageData={(v) => setImageData(v)}
              imageName={imageName}
              setImageName={(v) => setImageName(v ?? '')}
              setImageData1={(v) => setImageData1(v)}
              imageName1={imageName1}
              setImageName1={(v) => setImageName1(v ?? '')}
              setImageData2={(v) => setImageData2(v)}
              imageName2={imageName2}
              setImageName2={(v) => setImageName2(v ?? '')}
            />
          )}
          {stage === 6 || (stage === 5 && <Publish />)}

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
                  Next
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
