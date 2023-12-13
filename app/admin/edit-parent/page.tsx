/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import GenericLoader from '@/components/layout/Loader';
import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import EditParentBioData from '@/components/views/admin/AddParent/edit-biodata';
import { isLocal } from '@/constant/env';
import { uploadDocument } from '@/firebase/init';
import { getErrMsg } from '@/server';
import { useGetSingleParent, useUpdateParent } from '@/server/institution';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';

const EditParent = () => {
  const params = useSearchParams();
  const parentId = params?.get('id');

  const { data: parentDetail, isLoading: isLoadingParent } = useGetSingleParent({
    id: parentId ?? '',
  });


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      firstName: parentDetail?.firstName,
      lastName: parentDetail?.lastName,
      address: parentDetail?.address,
      lga: parentDetail?.lga,
    },
  });
  const [stage, setStage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [imageData, setImageData] = useState<File | undefined>();

  const [, setPublishData] = useState(null);

  const handleUpdateParent = useUpdateParent();

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (
      stage === 1 &&
      data.firstName &&
      data.lastName &&
      data.address &&
      data.lga
    ) {
      const environment = isLocal ? 'staging' : 'production';
      const array = await imageData?.arrayBuffer();
      let uploadedImage = `profile_pictures/${data.firstName + data.lastName}`;
      if (array) {
        uploadedImage = await uploadDocument(uploadedImage, array, environment);
      }
      const parentData = {
        id: parentId,
      };

      if (uploadedImage) {
        parentData['profileImg'] = uploadedImage;
      }

      if (data.firstName) {
        parentData['firstName'] = data.firstName;
      }

      if (data.lastName) {
        parentData['lastName'] = data.lastName;
      }

      if (data.address) {
        parentData['address'] = data.address;
      }

      if (data.lga) {
        parentData['lga'] = data.lga;
      }

      setPublishData(data);

      try {
        setloading(true);
        const response = await handleUpdateParent.mutateAsync(parentData);

        if (response) {
          toast.success('Parent updated successfully');
          setloading(false);

          //2 Second - Open Success Modal
          setIsOpen(true);
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

  if (isLoadingParent) {
    return (
      <div className='flex items-center justify-center'>
        <GenericLoader />
      </div>
    );
  }

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Parent updated successfully'
          description='Student Parent updated successfully'
          link='/admin/all-parents'
          textLink='Manage Parent'
          homeLink='/admin'
        />
      )}
      <BackButton />

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Edit Parent</h1>

      <Stepper
        variant='#007AFF'
        section='admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && (
            <EditParentBioData
              register={register}
              errors={errors}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
              parentDetail={parentDetail}
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

export default EditParent;
