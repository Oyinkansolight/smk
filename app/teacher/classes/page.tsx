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
  return (
    <div className=''>
      <div className='text-[#D4D5D7] py-8 text-2xl mx-16'>Classes</div>
      <div className='bg-white '>
        <div className='font-bold mx-8 py-8 text-4xl layout'>
          <div>My Subjects</div>
        </div>
        <div className='grid grid-cols-4 gap-4 justify-items-center layout'>
          {data ? (
            data.map((v, i) => (
              <SmallTeacherSubjectCard
                onClick={() => {
                  router.push(`/teacher/classes/subject?id=${v.id}`);
                }}
                key={i}
                isNext={i == 0}
                subject={v.name ?? '[NULL]'}
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