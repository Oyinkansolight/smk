'use client';

import EmptyView from '@/components/misc/EmptyView';
import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import { useGetProfile } from '@/server/auth';
import { useGetSubjectsAssignedToTeacher } from '@/server/government/classes_and_subjects';
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

  //* Actual Api to be called, response currently empty
  // const { data: data2 } = useGetTeachersSubjectList();
  const { data: profile } = useGetProfile();
  const { data, refetch } = useGetSubjectsAssignedToTeacher(
    profile?.userInfo?.staff?.id,
    profile?.currentSession?.[0]?.id
  );

  useEffect(() => {
    if (profile?.userInfo?.staff?.id) {
      // Make the second query only when the first query data is available
      refetch();
    }
  }, [refetch, profile]);

  // const { data: profile } = useGetProfile();





  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] text-xl my-4'>Test & Exams</div>
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

          {data && data?.length > 0 ? (
            data.map((v, i) => (
              <GradeSubjectCard
                onClick={() => {
                  router.push(
                    `/teacher/test-and-examination/subject?id=${v.id}`
                  );
                }}
                key={v.id ?? i}
                subject={v.subject.name ?? '[NULL]'}
                className={colors[i % colors.length]}
              />
            ))
          ) : data && data?.length === 0 && (
            <EmptyView
              label='No test or exam has been created'
              useStandardHeight
            />
          )}
        </div>
      </div>
    </div>
  );
}
