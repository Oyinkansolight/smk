'use client';

import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import EmptyView from '@/components/misc/EmptyView';
import SmallTeacherSubjectListItem from '@/components/views/teacher/SmallTeacherSubjectListItem';
import { useGetProfile } from '@/server/auth';
import { useGetSubjectById } from '@/server/institution';
import { useGetWeekPeriodsBySubject } from '@/server/institution/period';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';


export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: profile } = useGetProfile();
  const { data, refetch: refetchPeriods } = useGetWeekPeriodsBySubject({
    classId: 1,
    sessionId: 1,
    subjectId: params?.get('id')
      ? Number.parseInt(params.get('id') as string)
      : undefined,
    termId: 1,
    weekId: 1,
  });
  const [idx, setIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: subject } = useGetSubjectById(params?.get('id') as string);

  useEffect(() => {
    if (profile?.currentSession?.id) {
      refetchPeriods();
    }
  }, [profile?.currentSession?.id, refetchPeriods]);

  return (
    <div className='px-8 layout'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {`Classes > ${(subject ?? [])[0]?.name}`}
      </div>
      <TextTabBar
        tabs={[
          'All',
          'Primary 1',
          'Primary 2',
          'Primary 3',
          'Primary 4',
          'Primary 5',
          'Primary 6',
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      />
      <div className='flex justify-end'>
        <div className='flex items-center font-bold my-5 gap-3'>
          <IoChevronBack className='text-blue-500 h-5 w-5' /> <div>Week 1</div>{' '}
          <IoChevronForward className='text-blue-500 h-5 w-5' />
        </div>
      </div>
      <div className=''>
        <div className='font-bold py-8 text-4xl'>
          {(subject ?? [])[0]?.name}
        </div>
        <div className='flex flex-col  gap-4'>
          {data ? (
            data.data.length > 0 ? (
              data.data.map((v, i) => (
                <SmallTeacherSubjectListItem
                  onClick={() =>
                    router.push(`/teacher/classes/subject-task?id=${v.id}`)
                  }
                  key={i}
                  cl={v?.class?.arm ?? 'NULL'}
                  time='12:00 PM - 01:00 PM'
                />
              ))
            ) : (
              <EmptyView
                useStandardHeight
                label='No periods for this subject'
              />
            )
          ) : (
            <div />
          )}
        </div>
      </div>
      <PaginatedCounter
        currentPage={currentPage}
        onChange={setCurrentPage}
        pageCount={6}
      />
    </div>
  );
}