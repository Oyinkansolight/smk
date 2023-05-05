/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Details from '@/components/views/super-admin/TransferStudent/Details';
import Publish from '@/components/views/super-admin/TransferStudent/publish';
import { useCreateStaff } from '@/server/institution';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

/* eslint-disable @typescript-eslint/no-explicit-any */

const TransferStudent = () => {
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
  const [publishData, setpublishData] = useState(null);


  const handleCreateStaff = useCreateStaff();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(errors);
    console.log(data);
    if (
      stage === 1 &&
      data.studentId &&
      data.studentName &&
      data.reason

    ) {
      setStage(stage + 1);
    }

    if (stage === 3) {
      try {
        const response = await handleCreateStaff.mutateAsync(data);

        if (response) {
          toast.success('Login successful');

          //2 Second - Open Success Modal
          setisOpen(true);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
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
    <section className='px-[60px] py-6'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>Transfer Student</h1>

      <Stepper
        variant='#008146'
        section='super-admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 px-20 py-10 pb-4 bg-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {stage === 1 && <Details register={register} errors={errors} />}

          {stage === 2 && <Publish publishData={publishData} />}
          <div className='mb-6 flex justify-end'>
            <div className='flex space-x-6'>
              <button
                type='button'
                onClick={prevHandler}
                className='cursor-pointer w-full rounded px-2 py-3 text-xs text-primary md:px-6'
              >
                Prev
              </button>
              {stage == 1 && (
                <button className='w-full rounded border bg-primary px-8 py-3 text-xs text-[#fff] '>
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TransferStudent;
