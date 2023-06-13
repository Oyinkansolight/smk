'use client';

import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import { useGetGovernmentSubjectList } from '@/server/government/classes_and_subjects';
import { useRouter } from 'next/navigation';

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
      <div className='text-[#D4D5D7] text-2xl'>Grade Book</div>
      <div className='font-bold text-3xl py-8 h3'>
        <div>Test And Examination</div>
      </div>
      <div className='bg-white h-screen p-10'>
        <div className='flex flex-wrap gap-4 justify-items-center'>
          {subjects ? (
            subjects.map((v, i) => (
              <GradeSubjectCard
                onClick={() => {
                  router.push(`/teacher/test-and-examination/subject?id=${v}`);
                }}
                key={i}
                subject={v ?? '[NULL]'}
                className={colors[i % colors.length]}
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
