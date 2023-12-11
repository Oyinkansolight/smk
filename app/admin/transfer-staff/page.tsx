/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BackButton from '@/components/accordions/BackButton';
import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Details from '@/components/views/admin/TransferStaff/Details';
import Publish from '@/components/views/admin/TransferStaff/publish';
import logger from '@/lib/logger';
import { getErrMsg } from '@/server';
import { useGetProfile } from '@/server/auth';
import {
  useCreateStaffTransfer,
  useGetSchools,
  useGetTeachersListByInstitution,
} from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { RotatingLines } from 'react-loader-spinner';
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

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const TransferStaff = () => {
  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);

  const [payload, setPayload] = useState({
    staffId: '',
    reason: '',
    newInstitutionId: '',
  });

  const { data: institutionProfile } = useGetProfile();

  const { data: staffs, isLoading } = useGetTeachersListByInstitution({
    instituteId: institutionProfile?.userInfo?.esiAdmin?.id,
    limit: 1000,
  });

  const [isOpen, setisOpen] = useState(false);
  const [publishData] = useState(null);

  const handleCreateStaffTransfer = useCreateStaffTransfer();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setPayload((prev) => {
      return {
        ...prev,
        reason: data.reason,
      };
    });

    if (payload.staffId && payload.newInstitutionId && payload.reason)
      console.log(payload);

    try {
      setLoading(true);
      const response = await handleCreateStaffTransfer.mutateAsync(payload);

      if (response) {
        toast.success('Staff transfer booked successfully');
        setisOpen(true);
        setLoading(false);
      }
    } catch (error) {
      toast.error(getErrMsg(error));
      setLoading(false);
    }
  };

  const stepperData = [
    {
      stage: 1,
      stageName: 'TransferBio Details',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Staff transfer request successful'
          description='Hurray!!!'
          link='/admin/all-transfer-request-staff'
          textLink='Manage Staff'
        />
      )}
      <BackButton />

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Transfer Staff</h1>

      <Stepper
        variant='#008146'
        section='super-admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        {isLoading && (
          <div className='flex justify-center items-center h-[40vh]'>
            <RotatingLines
              width='100'
              visible={true}
              strokeWidth='5'
              strokeColor='#4fa94d'
              animationDuration='0.75'
            />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {staffs?.data && (
            <Details
              register={register}
              errors={errors}
              staffs={staffs?.data}
              setPayload={setPayload}
              payload={payload}
            />
          )}

          <div className='my-10 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                type='button'
                className='cursor-pointer w-full rounded px-2 py-3 text-xs text-primary md:px-6'
              >
                Prev
              </button>

              <button className='w-full rounded border bg-primary px-8 py-3 text-xs text-[#fff] '>
                {loading ? <ImSpinner2 /> : 'Continue'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TransferStaff;
