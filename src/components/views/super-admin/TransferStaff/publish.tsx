/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/buttons/Button';
import { ID } from '@/components/cards';
import logger from '@/lib/logger';

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

const Publish = ({ publishData }: any) => {
  logger(publishData);

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Account Summary</h2>
      <p>Kindly ensure that the details below are correct before submitting:</p>

      <div className='wrapper'>
        <div className='mt-4 flex flex-col gap-10'>
          {/*   <NextImage
            alt='ID card'
            width={396}
            height={248}
            src='/images/template_id.png'
          /> */}
          <ID />
        </div>

        <div className='mt-5 flex flex-row gap-x-[12px]'>
          <Button
            variant='outline'
            className='h-10 w-[110px] justify-center whitespace-nowrap border-secondary !text-xs text-secondary'
          >
            Share
          </Button>
          <Button
            variant='outline'
            className='h-10 w-[110px] justify-center whitespace-nowrap border-secondary !text-xs text-secondary'
          >
            Download
          </Button>
          <Button
            variant='outline'
            className='h-10 w-[110px] justify-center whitespace-nowrap border-secondary !text-xs text-secondary'
          >
            Send to Printer
          </Button>
        </div>
      </div>

      <div className='bg-[#F4F9FF] p-8 rounded-md mt-4'>
        <h2 className='text-xl font-bold mb-10'>Summary</h2>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Week</h2>
            <p>Week 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Period</h2>
            <p>Period 1</p>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Subject</h2>
            <p>Mathematics</p>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4  items-center mb-10 py-5 border-b'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Title</h2>
            <p>Primary 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Teaching Method</h2>
            <p>Mathematics, English, Yoruba</p>
          </div>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>
              Instructional Materials
            </h2>
            <p>Primary 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>
              Teacher Preparation for the lesson
            </h2>
            <p>Mathematics, English, Yoruba</p>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Step 1</h2>
            <p>Primary 1</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Subjects</h2>
            <p>Mathematics, English, Yoruba</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publish;
