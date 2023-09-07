'use client';

import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import Link from 'next/link';

const items = ['Assignment', 'Class Work', 'Lesson Note', 'Pop Quizzes'];
const links = [
  '/teacher/lesson-note/assignment',
  '/teacher/lesson-note/class-work',
  '/teacher/lesson-note/lesson-notes',
  '/teacher/lesson-note/pop-quiz',
];
const colors = ['bg-[#EFF7F6]', 'bg-[#F3EFF7]', 'bg-[#F7EFEF]', 'bg-[#F7F7EF]'];

export default function Page() {
  return (
    <div className='w-full layout mt-10'>
      <div className='font-extrabold text-3xl mb-2 p-6'>Lesson Task</div>
      <div className='bg-white rounded-lg p-8'>
        <div className='font-extrabold text-lg my-4'>Choose a lesson task</div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4'>
          {items?.map((v, i) => (
            <Link href={links[i]} key={v}>
              <GradeSubjectCard
                subject={v ?? '[NULL]'}
                className={colors[i % colors.length]}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
