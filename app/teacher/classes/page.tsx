'use client';

import SmallTeacherSubjectCard from '@/components/views/teacher/SmallTeacherSubjectCard';
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
  return (
    <div className=''>
      <div className='text-[#D4D5D7] py-8 text-2xl mx-16'>Classes</div>
      <div className='bg-white'>
        <div className='font-bold mx-8 py-8 text-4xl'>My Subjects</div>
        <div className='grid grid-cols-4 gap-4 justify-items-center'>
          {Array(8)
            .fill(0)
            .map((v, i) => (
              <SmallTeacherSubjectCard
                onClick={() => {
                  router.push('/teacher/classes/subject');
                }}
                key={i}
                isNext={i == 0}
                subject={subjects[i % subjects.length]}
                assignmentDue={2}
                tasks={4}
                className={colors[i % colors.length]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
