'use client';

import TextIconTabBar from '@/components/layout/TextIconTabBar';
import { useGetProfile } from '@/server/auth';
import { useGetSubjectsAssignedToTeacher } from '@/server/government/classes_and_subjects';
import { useGetClassArmStudents } from '@/server/institution/class-arm';
import { ClassArmStudents } from '@/types/institute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';

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
  const { data: allStudents } = useGetClassArmStudents({
    classArmId: profile?.userInfo?.staff?.managedClassArm?.id,
  });

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

  return (
    <div className='h-full layout pl-0 lg:pl-20'>
      <div className='pb-10 font-bold text-[32px] mt-4'>My Student</div>

      <TextIconTabBar
        idx={idx}
        setIdx={setIdx}
        trailing={
          <div className='flex space-x-4 items-center w-[350px]'>
            {/* <Button
              variant='secondary'
              onClick={() => router.push('/teacher/grades/grade-list')}
              className='flex justify-center h-[46px] bg-[#1A8FE3] max-w-[186px] w-full font-semibold !text-xs rounded-lg'
            >
              View Grade List
            </Button> */}
          </div>
        }
        items={[
          // {
          //   icon: <BiBookContent className='h-[18px] w-[18px]' />,
          //   label: 'Manage Subjects',
          // },
          {
            icon: <FaUsers className='h-[18px] w-[18px]' />,
            label: 'Manage Class',
          },
        ]}
      />

      {/* {idx === 0 && (
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
                      `/teacher/grades/subject?id=${v.subject.id}&subjectName=${v.subject.name}`
                    );
                  }}
                  key={i}
                  subject={v.subject.name ?? '[NULL]'}
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
      )} */}
      {idx === 0 && (
        <div className='bg-white min-h-screen px-10'>
          <div className='grid grid-cols-8 py-8 text-[#746D69] text-base'>
            <div />
            <div className='col-span-3 px-4'>Student</div>
            {/* <div>CA1</div>
            <div>CA2</div>
            <div>Exam</div> */}
            {/*   <div>Attendance</div>
            <div>Standing</div> */}
          </div>
          <div className='flex flex-col gap-4'>
            {allStudents &&
              allStudents
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .map((student, i) => (
                  <StudentGradeListItem
                    key={student?.id ?? i}
                    id={i + 1}
                    student={student}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StudentGradeListItem({
  id,
  student,
}: {
  id: number;
  student: ClassArmStudents;
}) {
  return (
    <Link href={`/teacher/student/grade-book-student?studentid=${student.id}`}>
      <div className=' space-x-1 grid text-black grid-cols-8 items-center text-base rounded-lg border p-4 py-6 bg-white'>
        <div>{id}.</div>
        <div className='col-span-3 gap-2  flex items-center text-black font-bold'>
          <div className='rounded-full h-10 w-10 bg-gray-300 md:block hidden' />
          <div>{student.lastName + ' ' + student.firstName}</div>
        </div>

        {/*  <div className='text-black flex items-center'>
          <div>{ordinal(id)}</div>
          <BsArrowUp className='h-5 w-5 text-green-500' />
        </div> */}
      </div>
    </Link>
  );
}
