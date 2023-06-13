'use client';

import TextTabBar from '@/components/layout/TextTabBar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ReactSelect from 'react-select';

const names = [
  'Continuous Assessment test 1',
  'Continuous Assessment test 2',
  'End of term Examination',
];

export default function Page() {
  const [idx, setIdx] = useState(0);
  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] text-2xl'>
        {'Test & Examination > Mathematics'}
      </div>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Mathematics</div>
      </div>
      <TextTabBar
        tabs={Array(6)
          .fill(0)
          .map((v, i) => `Primary ${i + 1}`)}
        onChange={setIdx}
        selectedIdx={idx}
      />
      <div className='flex justify-between'>
        <ReactSelect
          classNames={{
            control: () =>
              'bg-transparent border-none font-bold active:border-none',
          }}
          className='min-w-[15rem]'
          options={[{ label: 'Academic Calendar 2022/2023 ' }]}
        />
        <div className='flex items-center font-bold'>
          <BiChevronLeft className='h-6 w-6 text-blue-500' />
          <div>First Term</div>
          <BiChevronRight className='h-6 w-6 text-blue-500' />
        </div>
      </div>
      <div className='h-4' />
      <div className='flex flex-col gap-2'>
        {names.map((v, i) => (
          <Link href='/teacher/test-and-examination/subject/assessment' key={i}>
            <div className='border rounded bg-white p-4 flex gap-4 items-center'>
              <div className='relative rounded-full border h-16 w-16'>
                <Image
                  alt='book-stack'
                  className='absolute inset-2'
                  src='/images/book_stack.png'
                  fill
                />
              </div>
              <div className='font-bold text-[#746D69] text-base flex gap-5 items-center'>
                <div className='text-xs font-normal'>Assessment: </div>
                <div>{v}</div>
              </div>
              <div className='flex-1' />
              <BiChevronRight className='h-16 w-16 text-[#D4D5D7]' />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
