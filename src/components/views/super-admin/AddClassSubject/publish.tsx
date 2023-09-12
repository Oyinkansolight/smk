/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import logger from '@/lib/logger';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const Publish = ({ publishData }: any) => {
  logger(publishData);

  return (
    <section className=''>
      <h2 className='text-2xl font-bold'>Publish</h2>
      <p>Kindly ensure that the details below are correct before submitting:</p>

      <div className='bg-[#F4F9FF] p-8 rounded-md mt-4'>
        <h2 className='text-xl font-bold mb-10'>Summary</h2>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Class Name</h2>
            <p>1 a</p>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4  items-center mb-10'>
          <div className='col-span-8'>
            <h2 className='text-xs mb-2 font-medium'>Capacity</h2>
            <p>50</p>
          </div>

          <div className='col-span-4'>
            <h2 className='text-xs mb-2 font-medium'>Class Teacher</h2>
            <p>Victor Asamoah</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publish;
