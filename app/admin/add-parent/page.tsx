/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Biodata from '@/components/views/admin/AddParent/biodata';
import { isLocal } from '@/constant/env';
import { uploadDocument } from '@/firebase/init';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import { useCreateParent } from '@/server/institution';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner } from 'react-icons/im';
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

const AddStaff = () => {
  const { data: institutionProfile } = useGetProfile();
  // console.log(institutionProfile);

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
  const [imgSrc, setImgSrc] = useState(null);
  const [imageData, setImageData] = useState<File | undefined>();

  const [, setpublishData] = useState(null);

  const handleCreateParent = useCreateParent();

  const onSubmit: SubmitHandler<any> = async (data) => {
    // console.log(errors);
    console.log(data);

    if (
      stage === 1 &&
      data.firstName &&
      data.lastName &&
      data.password &&
      data.email &&
      data.address &&
      data.lga
    ) {
      const environment = isLocal ? 'staging' : 'production';
      const array = await imageData?.arrayBuffer();
      let uploadedImage = `profile_pictures/${data.firstName + data.lastName}`;
      if (array) {
        uploadedImage = await uploadDocument(uploadedImage, array, environment);
      }
      const staffData = {
        profileImg: uploadedImage,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
        address: data.address,
        lga: data.lga,
      };

      setpublishData(data);

      try {
        setloading(true);
        const response = await handleCreateParent.mutateAsync(staffData);

        if (response) {
          toast.success('Parent Added successfully');
          setloading(false);

          //2 Second - Open Success Modal
          setisOpen(true);
        }
      } catch (error) {
        setloading(false);
        toast.error(getErrMsg(error));
      }
    } else {
      toast.error('All fields are required');
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
      stageName: 'Parent Details',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Parent created successfully'
          description='Student Parent created successfully'
          link='/admin/all-parents'
          textLink='Manage Parent'
          homeLink='/admin'
        />
      )}
      <BackButton />

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Add Parent</h1>

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

          {/* {(stage === 5 || stage === 6) && <Publish publishData={publishData} />} */}
          <div className='mb-6 flex justify-end'>
            <div className='flex space-x-6'>
              {stage > 1 && (
                <button
                  type='button'
                  onClick={prevHandler}
                  className='cursor-pointer w-full rounded px-2 py-3 text-xs text-[#3361FF] md:px-6'
                >
                  Prev
                </button>
              )}

              {stage === 1 && (
                <button className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '>
                  {loading ? <ImSpinner /> : 'Submit'}
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
