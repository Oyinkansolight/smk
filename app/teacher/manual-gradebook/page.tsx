'use client';

import EmptyView from '@/components/misc/EmptyView';
import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import { useGetProfile } from '@/server/auth';
import { useGetSubjectsAssignedToTeacher } from '@/server/government/classes_and_subjects';
import { useGetClassArmInfo } from '@/server/institution/class';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const colors = [
    'bg-[#EFF7F6]',
    'bg-[#F3EFF7]',
    'bg-[#F7EFEF]',
    'bg-[#F7F7EF]',
  ];

  const router = useRouter();

  const [idx, setIdx] = useState(0);

  const { data: profile } = useGetProfile();

  const { data, refetch } = useGetSubjectsAssignedToTeacher(
    profile?.userInfo?.staff?.id,
    profile?.currentSession?.[0]?.id
  );
  const classArmId = profile?.userInfo?.staff?.managedClassArm?.id;

  const { data: classArmInfo } = useGetClassArmInfo(classArmId);

  useEffect(() => {
    if (profile?.userInfo?.staff?.id) {
      // Make the second query only when the first query data is available
      refetch();
    }
  }, [refetch, profile]);

  return (
    <div className='h-full layout'>
      <div className='text-[#D4D5D7] py-8 text-xl'>Grade Book</div>
      <div className='pb-10 font-bold text-[32px]'>Gradebook</div>

      <div className='bg-white h-screen px-10 overflow-y-scroll overflow-x-hidden'>
        <div className='font-bold py-8 text-xl'>
          <div>Choose a Subject</div>
        </div>
        <div className='flex flex-wrap gap-4 justify-items-center'>
          {classArmInfo?.subjects && classArmInfo?.subjects.length > 0 ? (
            classArmInfo?.subjects.map((v) => (
              <GradeSubjectCard
                key={v.id}
                className={colors[0]}
                subject={v.name ?? 'N/A'}
                onClick={() => {
                  router.push(
                    `/teacher/manual-gradebook/subject?id=${v.id}&subjectName=${v.name}&classArmId=${classArmInfo.id}`
                  );
                }}
              />
            ))
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <EmptyView label='No subjects assigned to you' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
