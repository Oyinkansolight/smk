'use client';

import Success from '@/components/modal/Success';
import Stepper from '@/components/stepper';
import Details from '@/components/views/super-admin/AddPeriod/details';
import Lessonnote from '@/components/views/super-admin/AddPeriod/lessonnote';
import Publish from '@/components/views/super-admin/AddPeriod/publish';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const AddPeriod = () => {
  const [stage, setStage] = useState(1);
  const [isOpen, setisOpen] = useState(false);

  const nextHandler = (): void => {
    if (stage >= 1 && stage <= 3) {
      setStage(stage + 1);
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
      stageName: 'Period Details',
    },
    {
      stage: 2,
      stageName: 'Lesson Note',
    },
    {
      stage: 3,
      stageName: 'Public',
    },
  ];

  return (
    <section className='py-6'>
      <Link href='/super-admin'>
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

      <h1 className='mt-5 mb-6 text-2xl font-bold'>
        Add Period and Lesson Note
      </h1>

      <Stepper
        variant='#008146'
        section='super_admin'
        currentStage={stage}
        data={stepperData}
      />

      <div className='table-add-student mt-7 lg:px-20 px-4 py-10 pb-4 bg-white'>
        {stage === 1 && <Details />}
        {stage === 2 && <Lessonnote />}
        {stage === 3 && <Publish />}

        <div className='my-6 flex justify-end'>
          <div className='flex space-x-6'>
            <button
              onClick={prevHandler}
              className='w-full rounded px-2 py-3 text-xs text-[#008146] md:px-6'
            >
              Prev
            </button>
            {stage <= 3 ? (
              <button
                onClick={nextHandler}
                className='w-full rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setisOpen(true)}
                className='w-full rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <Success
          title='School created successfully'
          description='Login details would be generated and sent to the school’s official email.'
          link='/super-admin/all-school'
          textLink='Manage School'
        />
      )}
    </section>
  );
};

export default AddPeriod;
