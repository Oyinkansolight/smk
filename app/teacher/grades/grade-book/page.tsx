'use client';

import { useState } from 'react';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';
import { BsArrowUp } from 'react-icons/bs';

export default function Page() {
  const [idx, setIdx] = useState(0);
  return (
    <div className='h-full layout'>
      <div className='text-black font-bold py-8 text-2xl'>Grade Book</div>
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
      </div>
      <div className='grid grid-cols-8 py-8 text-[#746D69] text-base'>
        <div />
        <div className='col-span-3 px-4'>Student</div>
        <div>Group</div>
        <div>Homework</div>
        <div>Attendance</div>
        <div>Standing</div>
      </div>
      <div className='flex flex-col gap-4'>
        {Array(10)
          .fill(0)
          .map((v, i) => (
            <StudentGradeListItem key={i} id={i + 1} />
          ))}
      </div>
    </div>
  );
}

function StudentGradeListItem({ id }: { id: number }) {
  return (
    <div className='grid text-black grid-cols-8 items-center text-base rounded-lg border p-4 py-6 bg-white'>
      <div>{id}.</div>
      <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
        <div className='rounded-full h-10 w-10 bg-gray-300' />
        <div>Ighosa Ahmed</div>
      </div>
      <div className='text-black'>Group Name</div>
      <div>24/24</div>
      <div className='text-black'>16/19</div>
      <div className='text-black flex items-center'>
        <div>{id}th</div>
        <BsArrowUp className='h-5 w-5 text-green-500' />
      </div>
    </div>
  );
}
