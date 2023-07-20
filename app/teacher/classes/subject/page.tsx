'use client';

import WeekSelector from '@/components/input/WeekSelector';
import PaginatedCounter from '@/components/layout/PaginatedCounter';
import TextTabBar from '@/components/layout/TextTabBar';
import EmptyView from '@/components/misc/EmptyView';
import SmallTeacherSubjectListItem from '@/components/views/teacher/SmallTeacherSubjectListItem';
import { useGetProfile } from '@/server/auth';
import { useGetSessionTerms } from '@/server/government/terms';
import {
  useGetAcademicSessionsTermsWeek,
  useGetSubjectById,
} from '@/server/institution';
import { useGetAllClasses } from '@/server/institution/class';
import { useGetWeekPeriodsBySubject } from '@/server/institution/period';
import { Week } from '@/types/classes-and-subjects';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';




export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.id,
  });
  const [idx, setIdx] = useState(0);
  const term = terms?.data[0]?.id;
  const { data: weeks } = useGetAcademicSessionsTermsWeek(term);
  const { data: classes } = useGetAllClasses();
  const filteredClasses = useMemo(
    () => classes?.filter((v) => v.institutionType?.toLowerCase().includes('secondary')),
    [classes]
  );
  const [currentWeek, setCurrentWeek] = useState(0);

  const sortedWeeks: Week[] = [];

  if (weeks) {
    for (let index = weeks?.data.length - 1; index > 0; index--) {
      sortedWeeks.push(weeks.data[index]);
    }
  }

  const { data, isLoading } = useGetWeekPeriodsBySubject({
    termId: term,
    sessionId: profile?.currentSession?.id,
    weekId: sortedWeeks[currentWeek]?.id,
    subjectId: params?.get('id') ? params.get('id') : undefined,
    classId: idx === 0 ? undefined : (filteredClasses ?? [])[idx - 1]?.id,
  });
  const [currentPage, setCurrentPage] = useState(0);

  const { data: subject } = useGetSubjectById(params?.get('id') as string);

  if (!data && isLoading) {
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
    )
  }

  return (
    <div className='px-8 layout'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {`Classes > ${(subject ?? [])[0]?.name}`}
      </div>
      <TextTabBar
        tabs={[
          "All",
          ...(filteredClasses ?? []).map((v) => v.name ?? '[NULL]'),
        ]}
        onChange={setIdx}
        selectedIdx={idx}
      />
      <div className='flex justify-end'>
        <WeekSelector
          max={weeks?.data.length ? weeks?.data.length - 1 : 0}
          index={currentWeek}
          onChange={setCurrentWeek}
        />
      </div>
      <div className=''>
        <div className='font-bold py-8 text-4xl'>
          {(subject ?? [])[0]?.name}
        </div>
        <div className='flex flex-col gap-4'>
          {data && data.data ? (
            data.data.length > 0 ? (
              data.data.map((period, i) => (
                <SmallTeacherSubjectListItem
                  onClick={() =>
                    router.push(`/teacher/classes/subject-task?id=${period.id}`)
                  }
                  key={i}
                  day={period?.day}
                  cl={period?.class?.name ?? 'NULL'}
                  time={`${period?.startTime} - ${period?.endTime}`}
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
      {data && data.data && data.data.length > 0 && (
        <PaginatedCounter
          currentPage={currentPage}
          onChange={setCurrentPage}
          pageCount={6}
        />
      )}
    </div>
  );
}