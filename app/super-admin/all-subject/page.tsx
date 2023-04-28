'use client';

import AddSubjectModal from '@/components/modals/add-subject-modal';
import { BasicSearch } from '@/components/search';
import Image from 'next/image';
import { useState } from 'react';

const AllSubjects = () => {
  const mockData = [
    {
      name: 'Mathematics',
      desc: 'It is the study of maths',
      class: 5,
    },
    {
      name: 'English',
      desc: 'It is the study of english',
      class: 10,
    },
    {
      name: 'Sciences',
      desc: 'It is the study of science',
      class: 12,
    },
    {
      name: 'Igbo',
      desc: 'It is the study of Igbo',
      class: 18,
    },
    {
      name: 'History',
      desc: 'It is the study of history',
      class: 16,
    },
    {
      name: 'Yoruba',
      desc: 'It is the study of Yoruba',
      class: 5,
    },
  ];
  const [subjects, setsubjects] = useState(mockData);

  const handleSearch = (value: string) => {
    const result = mockData.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
    );
    setsubjects(result);
  };
  return (
    <section className='px-[60px] py-6'>
      <div className='flex items-center space-x-4'>
        <Image
          src='/svg/back.svg'
          width={10}
          height={10}
          alt='back'
          className='h-4 w-4'
        />
        <h3 className='text-[10px] font-medium'>Dashboard</h3>
      </div>

      <h1 className='mt-5 mb-6 text-2xl font-bold'>All Students</h1>

      <div className='mb-6 flex justify-between items-end'>
        <div className='bg-[#FFF6EC] p-3 rounded-2xl w-[200px]'>
          <p className='text-[#615F5F]'>Total Students</p>
          <h1 className='font-semibold text-2xl'>64,450</h1>
        </div>
        <AddSubjectModal>
          <div className='cursor-pointer w-max rounded border border-[#007AFF] px-6 py-3 text-center text-xs text-[#007AFF] '>
            Add Subject
          </div>
        </AddSubjectModal>
      </div>
      <div className='flex justify-end'>
        <div className='flex w-[300px] space-x-2'>
          <select name='' className='border-none bg-transparent outline-none'>
            <option value=''>Filter</option>
          </select>
          <BasicSearch handleSearch={handleSearch} />
        </div>
      </div>

      <div className='table-add-student mt-5 pb-4 pt-1'>
        <div className='table-header grid grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-400 bg-gray-100 py-4 px-1 text-[#8898AA] font-semibold'>
          <div className='col-span-3'>Subject Name</div>
          <div className='col-span-5'>Description</div>
          <div className='col-span-4'>Classes</div>
        </div>
        {subjects.map((item, idx) => (
          <div
            className='grid grid-cols-12 gap-4 border-b items-center  text-[#8898AA] p-3 px-1'
            key={idx}
          >
            <div className='col-span-3'>{item.name} </div>
            <div className='col-span-5'>{item.desc} </div>
            <div className='col-span-4'> {item.class} </div>
          </div>
        ))}

        <div className='my-4 flex items-center justify-end space-x-3 pr-10'>
          <div className='grid h-7 w-7 place-content-center rounded-full border p-2 text-gray-300'>
            <svg
              width='6'
              height='8'
              viewBox='0 0 6 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
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
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M2.32031 0.169922L0.914062 1.5764L3.02344 3.68612L0.914062 5.79583L2.32031 7.20231L5.83594 3.68612L2.32031 0.169922Z'
                fill='#8898AA'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllSubjects;