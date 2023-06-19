'use client';

import SmallTeacherSubjectCard from '@/components/views/teacher/SmallTeacherSubjectCard';
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
      <div className='text-[#D4D5D7] py-8 text-2xl'>Classes</div>
      <div className='bg-white h-screen px-10'>
        <div className='font-bold py-8 h3'>
          <div>My Subjects</div>
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
