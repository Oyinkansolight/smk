'use client';

import Image from 'next/image';

const Periods = ({ period }) => {
  console.log(period);

  return (
    <div className='rounded-xl bg-white'>
      <div className='p-4 border-b'>
        <h2 className='text-xl'>Today's Period</h2>
      </div>
      {!period ||
        (period.length === 0 && (
          <div className='p-4 text-xs'>
            No Period Available for this student
          </div>
        ))}

      {period &&
        period.length > 0 &&
        period.map((item, idx) => (
          <div key={idx} className='p-4'>
            <div className='p-4 flex space-x-2 relative rounded-md border  border-[#5754F7]'>
              <div className='absolute top-3 p-2 right-3 bg-[#5754F7] text-xs text-white rounded-lg'>
                Current Class
              </div>
              <Image
                src='/svg/newbook.svg'
                height={24}
                width={24}
                alt='book'
                className=''
              />
              <div className='spacey-y-4'>
                <h2 className='text-xl text-[#615E83]'>Mathematics</h2>
                <div className='flex space-x-2'>
                  <span className='text-gray-500'>Period:</span>
                  <span className='font-medium'> 09:00 AM - 09:40 AM</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Periods;
