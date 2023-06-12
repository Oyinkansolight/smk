'use client';

import Button from '@/components/buttons/Button';
import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import { useGetGovernmentSubjectList } from '@/server/government/classes_and_subjects';
import { useRouter } from 'next/navigation';
import { BiBookContent } from 'react-icons/bi';
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

  //* Actual Api to be called, response currently empty
  // const { data: data2 } = useGetTeachersSubjectList();

  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] py-8 text-xl'>Grade Book</div>
      <div className='pb-10 font-bold text-[32px]'>Gradebook</div>


      <div className='flex flex-row bg-white py-4 px-6 rounded-lg justify-between h-[78px] mb-6'>
        <div className='flex flex-row gap-7'>
          <div className='flex flex-row gap-2 items-center cursor-pointer'>
            <BiBookContent className='h-[18px] w-[18px] text-[#1a8fe3]' />
            <div className='text-lg font-[900] text-[#1a8fe3] leading-[18px]'>Manage Subjects</div>
          </div>

          <div className='flex flex-row gap-2 items-center cursor-pointer'>
            <FaUsers className='h-[18px] w-[18px] text-[#D4D5D7]' />
            <div className='text-lg font-bold text-[#D4D5D7] leading-[18px]'>Manage Class</div>
          </div>
        </div>

        <Button
          variant='secondary'
          className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
        >
          View Grade List
        </Button>
      </div>

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
    </div>
  );
}
