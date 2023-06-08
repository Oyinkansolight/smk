/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Details from '@/components/views/super-admin/TransferStaff/Details';
import Publish from '@/components/views/super-admin/TransferStaff/publish';
import logger from '@/lib/logger';
// import { useCreateStaff } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  const [stage, setStage] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const [publishData] = useState(null);

  // const handleCreateStaff = useCreateStaff();

  const onSubmit: SubmitHandler<any> = async (data) => {
    logger(errors);
    logger(data);
    if (stage === 1 && data.studentId && data.studentName && data.reason) {
      setStage(stage + 1);
    }

    if (stage === 2) {
      setisOpen(true);

      // try {
      //   const response = await handleCreateStaff.mutateAsync(data);

      //   if (response) {
      //     toast.success('Login successful');

      //     //2 Second - Open Success Modal
      //     setisOpen(true);
      //   }
      // } catch (error) {
      //   toast.error((error as Error).message);
      // }
    }
  };

  // const nextHandler = (): void => {
  //   // handleSubmit(onSubmit);
  //   // console.log(getValues())
  //   // console.log(formState)

  //   // if (stage >= 1 && stage <= 4) {
  //   //   setStage(stage + 1);
  //   // }
  // };
  const prevHandler = (): void => {
    if (stage >= 2) {
      setStage(stage - 1);
    }
  };

  const stepperData = [
    {
      stage: 1,
      stageName: 'TransferBio Details',
    },
    {
      stage: 2,
      stageName: 'Account Summary',
    },
  ];

  return (
    <section className='md:px-[60px] px-5 py-6'>
      {isOpen && (
        <Success
          title='Staff transfer request successful'
          description='Hurray!!!'
          link='/super-admin/all-transfer-request-staff'
          textLink='Manage Staff'
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Transfer Staff</h1>

      <Stepper
        variant='#008146'
        section='super-admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && <Details register={register} errors={errors} />}

          {stage === 2 && <Publish publishData={publishData} />}
          <div className='my-10 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                type='button'
                onClick={prevHandler}
                className='cursor-pointer w-full rounded px-2 py-3 text-xs text-primary md:px-6'
              >
                Prev
              </button>
              {stage < 2 && (
                <button className='w-full rounded border bg-primary px-8 py-3 text-xs text-[#fff] '>
                  Next
                </button>
              )}
              {stage == 2 && (
                <button className='w-full rounded border bg-primary px-8 py-3 text-xs text-[#fff] '>
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

export default TransferStaff;
