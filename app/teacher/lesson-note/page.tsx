'use client';

import SmallTeacherSubjectCard from '@/components/views/teacher/SmallTeacherSubjectCard';
import Link from 'next/link';

const items = ['Home Work', 'Class Work', 'Lesson Note', 'Pop Quizzes'];
const links = [
  '/teacher/lesson-note/assignment',
  '/teacher/lesson-note/class-work',
  '/teacher/lesson-note/lesson-notes',
  '#',
];
const colors = ['bg-[#EFF7F6]', 'bg-[#F3EFF7]', 'bg-[#F7EFEF]', 'bg-[#F7F7EF]'];

export default function Page() {
  return (
    <div className='w-full layout'>
      <div className='font-extrabold text-3xl'>Lesson Task</div>
      <div className='bg-white rounded-lg p-8'>
        <div className='font-extrabold text-lg my-4'>Choose a lesson task</div>
        <div className='grid grid-cols-4'>
          {items?.map((v, i) => (
            <Link href={links[i]} key={i}>
              <SmallTeacherSubjectCard
                isNext={false}
                subject={v ?? '[NULL]'}
                showTasks={false}
                className={colors[i % colors.length]}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}