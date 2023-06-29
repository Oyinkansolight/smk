'use client';

import Button from '@/components/buttons/Button';
import TextIconTabBar from '@/components/layout/TextIconTabBar';
import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import { useGetGovernmentSubjectList } from '@/server/government/classes_and_subjects';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiBookContent } from 'react-icons/bi';
import { BsArrowUp } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';

export default function Page() {
  const colors = [
    'bg-[#EFF7F6]',
    'bg-[#F3EFF7]',
    'bg-[#F7EFEF]',
    'bg-[#F7F7EF]',
  ];
  const subjects = ['Mathematics', 'Science', 'English', 'History'];
  const router = useRouter();
  const { data } = useGetGovernmentSubjectList();

  const [idx, setIdx] = useState(0);

  //* Actual Api to be called, response currently empty
  // const { data: data2 } = useGetTeachersSubjectList();

  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] py-8 text-xl'>Grade Book</div>
      <div className='pb-10 font-bold text-[32px]'>Gradebook</div>

      <TextIconTabBar
        idx={idx}
        setIdx={setIdx}
        trailing={
          <Button
            variant='secondary'
            className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
          >
            View Grade List
          </Button>
        }
        items={[
          {
            icon: <BiBookContent className='h-[18px] w-[18px]' />,
            label: 'Manage Subjects',
          },
          {
            icon: <FaUsers className='h-[18px] w-[18px]' />,
            label: 'Manage Class',
          },
        ]}
      />

      {idx === 0 && (
        <div className='bg-white h-screen px-10'>
          <div className='font-bold py-8 text-xl'>
            <div>Choose a Subject</div>
          </div>
          <div className='flex flex-wrap gap-4 justify-items-center'>
            {data ? (
              data.map((v, i) => (
                <GradeSubjectCard
                  onClick={() => {
                    router.push(`/teacher/grades/subject?id=${v.id}`);
                  }}
                  key={i}
                  subject={v.name ?? '[NULL]'}
                  className={colors[0]}
                />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
      {idx === 1 && (
        <div className='bg-white min-h-screen px-10'>
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
      )}
    </div>
  );
}

function StudentGradeListItem({ id }: { id: number }) {
  return (
    <Link href='/teacher/grades/grade-book-student'>
      <div className='grid text-black grid-cols-8 items-center text-base rounded-lg border p-4 py-6 bg-white'>
        <div>{id}.</div>
        <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
          <div className='rounded-full h-10 w-10 bg-gray-300 md:block hidden' />
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
    </Link>
  );
}
