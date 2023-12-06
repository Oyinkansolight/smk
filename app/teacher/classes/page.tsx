'use client';

import EmptyView from '@/components/misc/EmptyView';
import SmallTeacherSubjectCard from '@/components/views/teacher/SmallTeacherSubjectCard';
import { useGetProfile } from '@/server/auth';
import { useGetSubjectsAssignedToTeacher } from '@/server/government/classes_and_subjects';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Page() {
  const colors = [
    'bg-[#EFF7F6]',
    'bg-[#F3EFF7]',
    'bg-[#F7EFEF]',
    'bg-[#F7F7EF]',
  ];

  const router = useRouter();

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

  const Loader = () => {
    return (
      <div className='flex justify-center items-center h-[40vh]'>
        <RotatingLines
          width='100'
          visible={true}
          strokeWidth='5'
          strokeColor='#4fa94d'
          animationDuration='0.75'
        />
      </div>
    );
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className='h-full layout pl-0 lg:pl-20'>
        <div className='text-[#D4D5D7] py-8 text-2xl'>Classes</div>
        <div className='bg-white h-screen px-10'>
          <div className='font-bold py-8 h3'>
            <div>My Subjects</div>
          </div>
          <div className='flex flex-wrap gap-4 justify-items-center'>
            {data && data?.length === 0 ? (
              <div className='w-full h-full flex items-center justify-center'>
                <EmptyView label='No subjects assigned to you' />
              </div>
            ) : (
              data?.map((v, i) => (
                <SmallTeacherSubjectCard
                  onClick={() => {
                    router.push(`/teacher/classes/subject?id=${v.subject.id}&classArmId=${v.class.id}&classId=${v.class.class.id}&armName=${`${v?.class?.class?.name} ${v.class.arm}`}`);
                  }}
                  key={v.subject.id}
                  isNext={i == 0}
                  subject={v?.subject
                    ? `${v?.subject?.name} - ${v?.class?.class?.name}  ${v?.class?.arm}  `
                    : 'Subject Name'}
                  assignmentDue={2}
                  tasks={4}
                  className={colors[i % colors.length]}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
