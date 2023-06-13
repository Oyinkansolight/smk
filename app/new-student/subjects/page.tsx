'use client';

import SearchInput from '@/components/input/SearchInput';
import SmallStudentSubjectCard from '@/components/views/student.tsx/SmallStudentSubjectCard';
import { useGetGovernmentSubjectList } from '@/server/government/classes_and_subjects';
import { useRouter } from 'next/navigation';

export default function Page() {
  const colors = [
    'bg-[#EFF7F6]',
    'bg-[#F3EFF7]',
    'bg-[#F7EFEF]',
    'bg-[#F7F7EF]',
  ];
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Government', 'F.Maths'];
  const router = useRouter();
  const { data } = useGetGovernmentSubjectList();
  return (
    <div className='layout h-full'>
      <div className='flex flex-col bg-white h-screen'>
        <div className='flex flex-row items-center justify-between'>
          <div className='font-bold py-8 text-4xl'>
            Subjects
          </div>

          <SearchInput placeholder='Search' className='max-w-[343px] w-full' />
        </div>

        <div className='h-px bg-black mt-[22px] mb-10' />

        <div className='flex flex-wrap gap-x-[52px] gap-y-10 justify-items-center'>
          {subjects ? (
            subjects.map((v, i) => (
              <SmallStudentSubjectCard
                onClick={() => {
                  router.push(`/new-student/subjects/subject?id=${v}`);
                }}
                key={i}
                subject={v.name ?? v ?? '[NULL]'}
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