/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SearchInput from '@/components/input/SearchInput';
import SmallStudentSubjectCard from '@/components/views/student.tsx/SmallStudentSubjectCard';
import { getFromSessionStorage } from '@/lib/helper';
import { useGetStudentSubjectList } from '@/server/institution';
import { useRouter } from 'next/navigation';

export default function Page() {
  const colors = [
    'bg-[#EFF7F6]',
    'bg-[#F3EFF7]',
    'bg-[#F7EFEF]',
    'bg-[#F7F7EF]',
  ];

  const router = useRouter();
  const userData = getFromSessionStorage('user');
  let user;
  if (userData) {
    user = JSON.parse(userData);
  }

  const { data: studentSubjectsList } = useGetStudentSubjectList(
    user?.currentStudentInfo?.id
  );
  return (
    <div className='layout h-full'>
      <div className='flex flex-col bg-white h-screen'>
        <div className='flex flex-row items-center justify-between'>
          <div className='font-bold py-8 text-4xl'>
            Subjects
            <div>
              <SearchInput
                placeholder='Search'
                className='max-w-[343px] w-full'
              />
            </div>
            <div className='h-px bg-black mt-[22px] mb-10' />
            <div className='flex flex-wrap gap-x-[52px] gap-y-10 justify-items-center'>
              {studentSubjectsList ? (
                studentSubjectsList.map((v: any, i: number) => (
                  <SmallStudentSubjectCard
                    onClick={() => {
                      router.push(`/student/subjects/subject?id=${v.id}`);
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
      </div>
    </div>
  );
}
