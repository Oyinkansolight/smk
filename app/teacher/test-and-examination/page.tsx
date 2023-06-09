'use client';

import SmallTeacherSubjectCard from '@/components/views/teacher/SmallTeacherSubjectCard';
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
              <SmallTeacherSubjectCard
                onClick={() => {
                  router.push(`/teacher/test-and-examination/subject?id=${v}`);
                }}
                key={i}
                isNext={false}
                showTasks={false}
                subject={v ?? '[NULL]'}
                assignmentDue={2}
                tasks={4}
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
