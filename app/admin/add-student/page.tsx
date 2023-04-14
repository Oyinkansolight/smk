'use client';

import Stepper from '@/components/stepper';
import Biodata from '@/components/views/admin/AddStudent/biodata';
import Contact from '@/components/views/admin/AddStudent/contact';
import Document from '@/components/views/admin/AddStudent/document';
import Education from '@/components/views/admin/AddStudent/education';
import Publish from '@/components/views/admin/AddStudent/publish';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const AddStudent = () => {
  const [stage, setStage] = useState(1);

  const nextHandler = (): void => {
    if (stage >= 1 && stage <= 4) {
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
    <section className='px-[60px] py-6'>
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

      <div className='table-add-student mt-7 px-20 py-10 pb-4 bg-white'>
        {stage === 1 && <Biodata />}
        {stage === 2 && <Contact />}
        {stage === 3 && <Education />}
        {stage === 4 && <Document />}
        {stage === 5 && <Publish />}

        <div className='mb-6 flex justify-end'>
          <div className='flex space-x-6'>
            <button
              onClick={prevHandler}
              className='w-full rounded px-2 py-3 text-xs text-[#3361FF] md:px-6'
            >
              Prev
            </button>
            <button
              onClick={nextHandler}
              className='w-full rounded border bg-[#007AFF] px-8 py-3 text-xs text-[#fff] '
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddStudent;
