'use client';

import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import { useGetProfile } from '@/server/auth';
import { useGetTeachersSubjectList } from '@/server/teacher';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Page() {
  const colors = [
    'bg-[#EFF7F6]',
    'bg-[#F3EFF7]',
    'bg-[#F7EFEF]',
    'bg-[#F7F7EF]',
  ];
  const subjects = ['Mathematics', 'Science', 'English', 'History'];
  const router = useRouter();
  // const { data } = useGetGovernmentSubjectList();

  //* Actual Api to be called, response currently empty
  // const { data: data2 } = useGetTeachersSubjectList();
  const { data: profile, isSuccess } = useGetProfile();
  const { data, refetch, isError } = useGetTeachersSubjectList(
    profile?.staff?.id
  );

  useEffect(() => {
    if (isSuccess && profile?.staff?.id) {
      // Make the second query only when the first query data is available
      refetch();
    }
  }, [isSuccess, isError, refetch, profile?.staff?.id]);

  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] text-xl my-4'>Grade Book</div>
      <div className='bg-white h-screen p-10'>
        <div className='text-xl font-bold leading-6 mb-10'>
          Choose a Subject
        </div>
        <div className='flex flex-wrap gap-4 justify-items-center'>
          {(!profile || !data) && (
            <div className='flex flex-col h-full w-full items-center justify-center p-10'>
              <RotatingLines
                width='100'
                visible={true}
                strokeWidth='5'
                strokeColor='#4fa94d'
                animationDuration='0.75'
              />
            </div>
          )}

          {data ? (
            data.map((v, i) => (
              <GradeSubjectCard
                onClick={() => {
                  router.push(
                    `/teacher/test-and-examination/subject?id=${v.id}`
                  );
                }}
                key={i}
                subject={v.name ?? '[NULL]'}
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
