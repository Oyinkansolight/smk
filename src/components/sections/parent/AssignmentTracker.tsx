'use client';

import Image from 'next/image';

const Periods = () => {
  return (
    <div className='rounded-xl bg-white'>
      <div className='p-4 border-b'>
        <h2 className='text-xl'>Assignment Tracker</h2>
      </div>

      {[1, 2, 4].map((item) => {
        return (
          <div className='p-4' key={item}>
            <div className='p-4 flex space-x-2  rounded-xl border  border-[#1BB449] border-l-2'>
              <Image
                src='/svg/assignment.svg'
                height={24}
                width={24}
                alt='book'
                className=''
              />
              <div className='spacey-y-5'>
                <div className='rounded-2xl bg-[#1BB449] py-1 px-2 text-white w-max'>
                  Completed
                </div>
                <h2 className='text-xl text-[#615E83]'>English </h2>
                <div className='flex space-x-2'>
                  <span className='text-gray-500'>Date Submitted:</span>
                  <span className='font-medium'> 24 - 11 - 2023 </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Periods;
