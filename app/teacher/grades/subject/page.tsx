'use client';

import Button from '@/components/buttons/Button';
import TextTabBar from '@/components/layout/TextTabBar';
import GradeSettingsModal from '@/components/modals/grade-settings-modal';
import StudentGradeModal from '@/components/modals/student-grade-modal';
import Link from 'next/link';
import { useState } from 'react';
import { BiChevronDown, BiSortUp } from 'react-icons/bi';

export default function Page() {
  const [idx, setIdx] = useState(0);
  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] py-8 text-xl'>
        Grade Book {'>'} Mathematics
      </div>
      <div className='font-bold text-2xl'>Mathematics</div>
      <TextTabBar
        tabs={Array(6)
          .fill(0)
          .map((v, i) => `Primary ${i + 1}`)}
        selectedIdx={idx}
        onChange={setIdx}
      />
      <div className='flex justify-end gap-4 mb-4'>
        <GradeSettingsModal>
          <Button
            variant='secondary'
            className='flex justify-center h-[46px] bg-[#1A8FE3] min-w-[186px] w-full font-semibold !text-xs rounded-lg'
          >
            Grade Settings
          </Button>
        </GradeSettingsModal>
        <Link href='/teacher/grades/grade-book'>
          <Button
            variant='secondary'
            className='flex justify-center h-[46px] bg-[#1A8FE3] min-w-[186px] w-full font-semibold !text-xs rounded-lg'
          >
            Grade List
          </Button>
        </Link>
      </div>
      <div className='flex gap-4 items-center text-[#746D69] bg-white p-4 rounded-md'>
        <input className='rounded-full border p-3' placeholder='search' />
        <div className='flex-1' />
        <div className='flex items-center'>
          Filter By
          <BiChevronDown className='w-6 h-6' />
        </div>
        <BiSortUp className='h-6 w-6' />
      </div>
      <div className='grid grid-cols-11 py-8 text-[#746D69] text-base'>
        <div />
        <div className='col-span-3 px-4'>Student</div>
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
      <div className='grid text-black grid-cols-11 items-center text-base rounded-lg border p-4 py-6 bg-white'>
        <div>{id}.</div>
        <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
          <div className='rounded-full h-10 w-10 bg-gray-300' />
          <div>Ighosa Ahmed</div>
        </div>
        <div className='text-black'>0</div>
        <div className='text-black'>0</div>
        <div className='text-black'>0</div>
        <div className='text-black'>0</div>
        <div>0</div>
        <div className='text-black'>Fail</div>
        <div className='text-black flex items-center'>
          <div>{id} th</div>
        </div>
      </div>
    </StudentGradeModal>
  );
}