import React from 'react';

const CurriculumView = () => {
  return (
    <div className='w-full h-[729px] bg-white text-xs py-10 px-24'>
      <div className='flex flex-col divide-y p-8'>
        <div className='grid grid-cols-2 justify-between gap-5'>
          <div className='flex flex-col gap-2'>
            <div className='font-semibold'>Week</div>
            <div className='font-light'>Week 1</div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='font-semibold'>Period</div>
            <div className='font-light'>Period 1</div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='font-semibold'>Subject</div>
            <div className='font-light'>Mathematics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumView;
