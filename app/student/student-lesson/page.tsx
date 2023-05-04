'use client';

import Button from '@/components/buttons/Button';
import TeacherClassCard from '@/components/cards/TeacherClassCard';
import TabBar from '@/components/layout/TabBar';
import StudentAssignmentView from '@/components/views/student.tsx/StudentAssignmentView';
import StudentLessonNote from '@/components/views/student.tsx/StudentLessonNote';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiListCheck } from 'react-icons/bi';
import { MdArrowBackIos } from 'react-icons/md';
import { RiCalendar2Fill, RiDashboardFill } from 'react-icons/ri';

const Page = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => router.back()}
        className='flex items-center gap-3 cursor-pointer'
      >
        <MdArrowBackIos className='text-blue-500' />
        <div>Back</div>
      </div>
      <div className='mt-4 flex gap-6'>
        <div className='flex max-h-[85vh] flex-1 flex-col gap-[31px] overflow-y-scroll rounded-xl border px-4'>
          <>
            <div className='flex w-full items-center'>
              <TabBar
                selected={tabIdx}
                onSelect={(i) => setTabIdx(i)}
                items={[
                  {
                    icon: <RiDashboardFill className='h-5 w-5' />,
                    label: 'Lesson Note',
                  },
                  {
                    icon: <BiListCheck className='h-5 w-5' />,
                    label: 'Assignment',
                  },
                  {
                    icon: <RiCalendar2Fill className='h-5 w-5' />,
                    label: 'Next Class',
                  },
                ]}
                buttonActiveClassName='border-fun-green-500 text-fun-green-500'
              />
              <div className='h-full flex-1 border-b-2' />
            </div>
            <div className='text-center py-3 rounded-full text-[#9013FE] bg-[#E9D8FF]'>
              Science Class
            </div>
            {tabIdx === 0 ? (
              <StudentLessonNote />
            ) : tabIdx === 1 ? (
              <StudentAssignmentView />
            ) : tabIdx === 2 ? (
              <div />
            ) : (
              <div />
            )}
          </>
        </div>
        <TeacherClassCard
          call={<Button className='w-full justify-center'>Finish Class</Button>}
        />
      </div>
    </div>
  );
};

export default Page;
