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
import { useGetTeacherClassArms } from '@/server/institution/class-arm';
import { useGetWeekPeriodsBySubject } from '@/server/institution/period';
import { Week } from '@/types/classes-and-subjects';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: profile } = useGetProfile();
  const { data: terms } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const [idx, setIdx] = useState(0);
  const term = terms?.data[0]?.id;
  const { data: weeks } = useGetAcademicSessionsTermsWeek(term);
  const [currentWeek, setCurrentWeek] = useState(0);
  const isGenericApp = Cookies.get('isGenericApp') === 'Y';

  const { data: arms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.[0]?.id,
  });

  const sortedWeeks: Week[] = [];

  if (weeks) {
    for (let index = 0; index < weeks?.data.length; index++) {
      sortedWeeks.push(weeks.data[index]);
    }
  }

  const { data } = useGetWeekPeriodsBySubject({
    termId: term,
    sessionId: profile?.currentSession?.[0]?.id,
    weekId: sortedWeeks[currentWeek]?.id,
    subjectId: params?.get('id') ? params.get('id') : undefined,
    // classArmId: arms ? arms[idx]?.class?.id : '',
  });

  const [currentPage, setCurrentPage] = useState(0);

  const { data: subject } = useGetSubjectById(params?.get('id') as string);

  if (data?.data && data.data.length > 0) {
    return (
      <div className='px-8 layout'>
        <div className='text-[#D4D5D7] py-8 text-2xl'>
          {`Classes > ${(subject ?? [])[0]?.name}`}
        </div>
        {arms && arms.length > 0 && (
          <TextTabBar
            tabs={[
              ...(arms ?? []).map((arm) =>
                arm.arm ? `${arm.class?.name}` : '[NULL]'
              ),
            ]}
            onChange={setIdx}
            selectedIdx={idx}
          />
        )}
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
                    sessionId={
                      profile?.currentSession?.[0]?.id as unknown as string
                    }
                    termId={term as unknown as string}
                    periodId={period.id as unknown as string}
                    classId={
                      arms && arms.length > 0
                        ? arms[0].id
                        : ('' as unknown as string)
                    }
                    onClick={() =>
                      router.push(
                        isGenericApp ? (
                          i % 2 === 0 ? '/teacher/classes/subject-task-doc' : '/teacher/classes/subject-task-video'
                        ) :
                          `/teacher/classes/subject-task?id=${period.id}`
                      )
                    }
                    key={period?.id ?? i}
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
  } else {
    return (
      <div className='py-8 layout'>
        <EmptyView label='No classes' useStandardHeight />
      </div>
    );
  }
}
