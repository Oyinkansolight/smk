'use client';

import EmptyView from '@/components/misc/EmptyView';
import GradeSubjectCard from '@/components/views/teacher/GradeSubjectCard';
import { useGetProfile } from '@/server/auth';
import { useGetSubjectsAssignedToTeacher } from '@/server/government/classes_and_subjects';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
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
  const [isGradeManually, setIsGradeManually] = useState(false);

  const { data: profile } = useGetProfile();

  const { data, refetch } = useGetSubjectsAssignedToTeacher(
    profile?.userInfo?.staff?.id,
    profile?.currentSession?.[0]?.id
  );

  const { data: allStudents } = useGetClassArmStudents({
    classArmId: profile?.userInfo?.staff?.managedClassArm?.id,
  });

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

      {/* <TextIconTabBar
        idx={idx}
        setIdx={setIdx}
        trailing={
          <div className='flex space-x-4 items-center w-[350px]'>
            <Button
              variant='secondary'
              className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
              onClickHandler={() => {
                setIsGradeManually(!isGradeManually);
              }}
            >
              Grade manually
            </Button>
            <Button
              variant='secondary'
              className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
            >
              View Grade List
            </Button>
          </div>
        }
        items={[
          {
            icon: <BiBookContent className='h-[18px] w-[18px]' />,
            label: 'Manage Subjects',
          },
          {
            icon: <FaUsers className='h-[18px] w-[18px]' />,
            label: 'Manage Class',
          },
        ]}
      /> */}

      <div className='bg-white h-screen px-10'>
        <div className='font-bold py-8 text-xl'>
          <div>Choose a Subject</div>
        </div>
        <div className='flex flex-wrap gap-4 justify-items-center'>
          {data && data.length > 0 ? (
            data.map((v, i) => (
              <GradeSubjectCard
                onClick={() => {
                  router.push(
                    `/teacher/manual-gradebook/subject?id=${v.subject.id}&subjectName=${v.subject.name}&classArmId=${v.class.id}`
                  );
                }}
                key={i}
                subject={v.subject.name ?? 'N/A'}
                className={colors[0]}
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
