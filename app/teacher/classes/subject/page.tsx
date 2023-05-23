'use client';

import SmallTeacherSubjectListItem from '@/components/views/teacher/SmallTeacherSubjectListItem';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function Page() {
  const router = useRouter();
  return (
    <div className='px-8'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {'Classes > Mathematics'}
      </div>
      <div className='flex bg-white rounded-md justify-around py-4 text-xl'>
        <div className='font-bold'>All</div>{' '}
        {Array(6)
          .fill(0)
          .map((v, i) => (
            <div key={i} className='text-[#D4D5D7]'>
              Primary {i + 1}
            </div>
          ))}
      </div>
      <div className='flex justify-end'>
        <div className='flex items-center font-bold my-5 gap-3'>
          <IoChevronBack className='text-blue-500 h-5 w-5' /> <div>Week 3</div>{' '}
          <IoChevronForward className='text-blue-500 h-5 w-5' />
        </div>
      </div>
      <div className=''>
        <div className='font-bold py-8 text-4xl'>Mathematics</div>
        <div className='flex flex-col  gap-4'>
          {Array(8)
            .fill(0)
            .map((v, i) => (
              <SmallTeacherSubjectListItem
                onClick={() => router.push('/teacher/classes/subject-task')}
                key={i}
                cl='Primary 1A'
                time='12:00 PM - 01:00 PM'
              />
            ))}
        </div>
      </div>
      <div className='flex justify-center gap-4 my-4'>
        <div className='rounded-full bg-white h-10 w-10 flex items-center justify-center'>
          <IoChevronBack />
        </div>
        {Array(6)
          .fill(0)
          .map((v, i) => (
            <div
              key={i}
              className='rounded-full bg-white h-10 w-10 flex items-center justify-center'
            >
              <div>{i + 1}</div>
            </div>
          ))}
        <div className='rounded-full bg-white h-10 w-10 flex items-center justify-center'>
          <IoChevronForward />
        </div>
      </div>
    </div>
  );
}
