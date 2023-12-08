'use client';

import TextTabBar from '@/components/layout/TextTabBar';
import StudentGradeModal from '@/components/modals/student-grade-modal';
import Image from 'next/image';
import { useState } from 'react';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';
import { BsArrowUp } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  return (
    <div className='h-full layout mt-6 pl-0 lg:pl-20'>
      <div
        onClick={() => router.push("/teacher/grades")}
        className='flex items-center space-x-4 pt-4 cursor-pointer w-10'>
        <Image
          src='/svg/back.svg'
          width={10}
          height={10}
          alt='back'
          className='h-4 w-4'
        />
        <h3 className='text-[10px] font-medium'>Back</h3>
      </div>

      <div className='font-bold text-2xl mt-6'>Grade List</div>
      <TextTabBar
        tabs={[
          'All',
          'Assignment',
          'Classwork',
          'Pop Quiz',
          'Class projects',
          'Group Projects',
        ]}
        selectedIdx={idx}
        onChange={setIdx}
      />
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
      </div>
      <div className='grid grid-cols-10 py-8 text-[#746D69] md:text-base text-xs'>
        <div className='col-span-3 px-4'>Title</div>
        <div>CA 1</div>
        <div>CA 2</div>
        <div>Exam</div>
        <div>Total</div>
        <div>Grade</div>
        <div>Remark</div>
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
    <StudentGradeModal>
      <div className='grid text-black grid-cols-10 items-center md:text-base text-xs rounded-lg border p-4 py-6 bg-white'>
        <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
          <div className='rounded-full h-10 w-10 bg-gray-300 md:block hidden' />
          <div>Ighosa Ahmed</div>
        </div>
        <div className='text-black'>0</div>
        <div className='text-black'>0</div>
        <div className='text-black'>0</div>
        <div className='text-black'>0</div>
        <div>0</div>
        <div className='text-black'>16/19</div>
        <div className='text-black flex items-center'>
          <div>
            {id} {id === 1 ? 'st' : id === 2 ? 'nd' : id === 3 ? 'rd' : 'th'}
          </div>
          <BsArrowUp className='h-5 w-5 text-green-500' />
        </div>
      </div>
    </StudentGradeModal>
  );
}
