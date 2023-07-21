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
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';




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
    () => classes?.filter((v) => v.name?.toLowerCase().includes('secondary')),
    [classes]
  );
  const [currentWeek, setCurrentWeek] = useState(0);
  const { data } = useGetWeekPeriodsBySubject({
    classId: (filteredClasses ?? [])[idx]?.id,
    sessionId: profile?.currentSession?.id,
    subjectId: params?.get('id') ? params.get('id') : undefined,
    termId: term,
    weekId: weeks?.data[currentWeek]?.id,
  });
  const [currentPage, setCurrentPage] = useState(0);

  const { data: subject } = useGetSubjectById(params?.get('id') as string);

  return (
    <div className='px-8 layout'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {`Classes > ${(subject ?? [])[0]?.name}`}
      </div>
      <TextTabBar
        tabs={[
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
        <div className='flex flex-col  gap-4'>
          {data ? (
            data.data.length > 0 ? (
              data.data.map((v, i) => (
                <SmallTeacherSubjectListItem
                  sessionId = {profile?.currentSession?.id as unknown as string}
                  termId={term as unknown as string}
                  periodId={v.id as unknown as string}
                  classId={(filteredClasses ?? [])[idx]?.id as unknown as string}
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