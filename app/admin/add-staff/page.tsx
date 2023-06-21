/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Biodata from '@/components/views/admin/Addstaff/biodata';
import Contact from '@/components/views/admin/Addstaff/contact';
import Document from '@/components/views/admin/Addstaff/document';
import Education from '@/components/views/admin/Addstaff/education';
import Employment from '@/components/views/admin/Addstaff/employment';
import Publish from '@/components/views/admin/Addstaff/publish';
import { useGetProfile } from '@/server/auth';
import { useCreateStaff } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const AddStaff = () => {
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
  const [isOpen, setisOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const [publishData, setpublishData] = useState(null);

  const [imageName, setImageName] = useState<string>('');
  const [imageData, setImageData] = useState('http://placeimg.com/640/480');

  const [imageName1, setImageName1] = useState<string>('');
  const [imageData1, setImageData1] = useState('http://placeimg.com/640/480');

  const [imageName2, setImageName2] = useState<string>('');
  const [imageData2, setImageData2] = useState('http://placeimg.com/640/480');
  const handleCreateStaff = useCreateStaff();

  const onSubmit: SubmitHandler<any> = async (data) => {
    // console.log(errors);
    // console.log(data);
    if (
      stage === 1 &&
      data.firstName &&
      data.lastName &&
      data.gender &&
      data.staffType &&
      data.dob
    ) {
      setStage(stage + 1);
    }
    if (
      stage === 2 &&
      data.phoneNumber &&
      data.address &&
      data.email &&
      data.townId
    ) {
      setStage(stage + 1);
    }
    if (
      stage === 3 &&
      data.schoolAttended &&
      data.courseAttended &&
      data.grade &&
      data.year
    ) {
      setStage(stage + 1);
    }
    if (
      stage === 4 &&
      data.employerName &&
      data.role &&
      data.employmentType &&
      data.employmentyear
    ) {
      setStage(stage + 1);
    }
    if (
      stage === 5 &&
      data.idCardImage &&
      data.firstDocumentType &&
      data.firstUpload &&
      data.secondDocumentType &&
      data.secondUpload
    ) {
      data.password = '12345678';
      data.idCardImage = 'http://placeimg.com/640/480';
      data.firstUpload = 'http://placeimg.com/640/480';
      data.secondUpload = 'http://placeimg.com/640/480';
      data.weight = data.townId;
      data.height = data.townId;
      data.townId = +data.townId;
      data.institutionId = institutionProfile?.id;
      data.teacherEducation = [
        {
          schoolAttended: data.schoolAttended,
          courseAttended: data.courseAttended,
          grade: 'MASTER',
          educationYear: data.year,
        },
      ];
      data.employmentHistory = [
        {
          employerName: data.employerName,
          role: data.role,
          employmentType: 'FULL_TIME',
          employmentYear: data.employmentyear,
        },
      ];
      delete data.schoolAttended;
      delete data.courseAttended;
      delete data.grade;
      delete data.year;
      delete data.employerName;
      delete data.role;
      delete data.employmentType;
      delete data.employmentyear;
      delete data.nok;
      delete data.rnok;
      delete data.phoneNumberNOK;

      setpublishData(data);

      try {
        setloading(true);
        const response = await handleCreateStaff.mutateAsync(data);

        if (response) {
          toast.success('Staff Added successful');
          setloading(false);

          //2 Second - Open Success Modal
          setisOpen(true);
        }
      } catch (error) {
        setloading(false);
        toast.error((error as Error).message);
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
      stageName: 'Bio Details',
    },
    {
      stage: 2,
      stageName: 'Contact Details',
    },
    {
      stage: 3,
      stageName: 'Training History',
    },
    {
      stage: 4,
      stageName: 'Educational Details',
    },
    {
      stage: 5,
      stageName: 'Employment History ',
    },
    {
      stage: 6,
      stageName: 'Upload Dcuments',
    },
    {
      stage: 7,
      stageName: 'Publish',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Staff created successfully'
          description='Institution Staff created successfully'
          link='/super-admin/all-staff'
          textLink='Manage staff'
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Add Staff</h1>

      <Stepper
        variant='#007AFF'
        section='admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && <Biodata register={register} errors={errors} />}
          {stage === 2 && <Contact register={register} errors={errors} />}
          {stage === 3 && <Education register={register} errors={errors} />}
          {stage === 4 && <Employment register={register} errors={errors} />}
          {stage === 5 && (
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
          {stage === 6 ||
            (stage === 7 && <Publish publishData={publishData} />)}
          <div className='mb-6 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                type='button'
                onClick={prevHandler}
                className='cursor-pointer w-full rounded px-2 py-3 text-xs text-[#3361FF] md:px-6'
              >
                Prev
              </button>
              {stage <= 6 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  {loading ? <ImSpinner2 className='animate-spin' /> : 'Next'}
                </button>
              )}
              {stage === 7 && (
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
};

export default AddStaff;
