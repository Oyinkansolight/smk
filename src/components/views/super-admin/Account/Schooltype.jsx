'use client';

import AddSchoolType from '@/components/modal/addSchoolType';
import { useState } from 'react';

const Schooltype = () => {
  const data = [
    {
      names: 'ECCDE',
      classes: 2,
      term: 3,
    },
    {
      names: 'ECCDE',
      classes: 2,
      term: 3,
    },
    {
      names: 'ECCDE',
      classes: 2,
      term: 3,
    },
    {
      names: 'ECCDE',
      classes: 2,
      term: 3,
    },
    {
      names: 'ECCDE',
      classes: 2,
      term: 3,
    },
  ];
  const [isOpen, setisOpen] = useState(false);

  function handleModal() {
    setisOpen(!isOpen);
  }
  return (
    <div>
      <div className='flex justify-end items-center space-x-4 my-5'>
        <button
          onClick={() => setisOpen(!isOpen)}
          className='w-max  rounded border bg-[#008146] px-8 py-3 text-xs text-[#fff] '
        >
          Add New School Type
        </button>
      </div>
      {isOpen && <AddSchoolType onClickHandler={handleModal} />}

      <div className='table-add-student mt-3 py-4 pb-4 bg-white'>
        <div className='text-[#6B7A99] text-base font-semibold border-b p-3'>
          School Types
        </div>

        <div className='grid grid-cols-12 p-4 border-b text-[#55597D] font-medium'>
          <div className='col-span-3'>Name</div>
          <div className='col-span-3'>Classes</div>
          <div className='col-span-6'>Term/Semester</div>
        </div>
        {data.map((item, idx) => (
          <div className='grid grid-cols-12 p-4 border-b' key={idx}>
            <div className='col-span-3'> {item.names} </div>
            <div className='col-span-3'> {item.classes} </div>
            <div className='col-span-6'> {item.term} </div>
          </div>
        ))}

        <div className=' min-w-[800px] my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.43018 0.169922L5.83643 1.5764L3.72705 3.68612L5.83643 5.79583L4.43018 7.20231L0.914551 3.68612L4.43018 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border bg-[#008146] p-2 text-white'>
            1
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            2
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            3
          </div>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schooltype;
