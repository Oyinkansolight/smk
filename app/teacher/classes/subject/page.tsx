/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import WeekSelector from '@/components/input/WeekSelector';
import GenericLoader from '@/components/layout/Loader';
import PaginatedCounter from '@/components/layout/PaginatedCounter';
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
import { ClassArm, Week } from '@/types/classes-and-subjects';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: profile } = useGetProfile();
  const { data: terms, isLoading: isLoadingSessions } = useGetSessionTerms({
    sessionId: profile?.currentSession?.[0]?.id,
  });
  const [idx, setIdx] = useState(0);
  const term = terms?.data[0]?.id;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: weeks, isLoading: isLoadingTermWeeks } = useGetAcademicSessionsTermsWeek(term);
  const [currentWeek, setCurrentWeek] = useState(0);
  const isGenericApp = Cookies.get('isGenericApp') === 'Y';

  const { data: arms, isLoading: isLoadingArms } = useGetTeacherClassArms({
    teacherId: profile?.userInfo?.staff?.id,
    sessionId: profile?.currentSession?.[0]?.id,
  });

  const sortedWeeks: Week[] = [];

  if (weeks) {
    for (let index = 0; index < weeks?.data.length; index++) {
      sortedWeeks.push(weeks.data[index]);
    }
  }

  const foundClasses: any = [];
  const parsedArms: (ClassArm | any)[] | undefined = arms?.map((arm) => {
    console.log(arm.class?.id);

    console.log(!foundClasses.includes(arm.class?.id));
    if (!foundClasses.includes(arm.class?.id)) {
      foundClasses.push(arm.class?.id);
      return arm;
    }
  });

  const {
    data,
    isLoading: isLoadingPeriodSubjects,
    isFetching: isFetchingPeriodSubjects
  }
    = useGetWeekPeriodsBySubject({
      termId: term,
      page: currentPage,
      staffId: profile?.userInfo?.staff?.id,
      sessionId: profile?.currentSession?.[0]?.id,
      weekId: sortedWeeks[currentWeek]?.id,
      subjectId: params?.get('id') ? params.get('id') : undefined,
      classId: params?.get('classId') ? params.get('classId') : undefined,
      // classId: parsedArms ? parsedArms[idx - 1]?.class?.id : '',
    });


  const { data: subject, isLoading: subjectLoading } = useGetSubjectById(params?.get('id') as string);

  const isLoadingData = isLoadingSessions || isLoadingTermWeeks || isLoadingArms || isLoadingPeriodSubjects;

  if (!data || isLoadingData) {
    return (
      <GenericLoader />
    )
  }


  return (
    <div className='px-8 layout'>
      <div className='text-[#D4D5D7] py-8 text-2xl'>
        {`Classes > ${(subject ?? [])[0]?.name}`}
      </div>

      {/*! Removed this filter component to account for class arms and not classes as we used to  */}

      {/* {parsedArms && parsedArms.length > 0 && (
        <TextTabBar
          tabs={[
            'All',
            ...(parsedArms ?? []).map((arm) =>
              arm?.arm ? `${arm.class?.name}` : '[NULL]'
            ),
          ]}
          onChange={setIdx}
          selectedIdx={idx}
          callback={() => {
            setCurrentPage(1);
            setCurrentWeek(0);
          }}
        />
      )} */}

      <div className='flex justify-end'>
        <WeekSelector
          max={weeks?.data.length ? weeks?.data.length - 1 : 0}
          index={currentWeek}
          onChange={setCurrentWeek}
        />
      </div>
      <div className=''>
        <div className='font-bold py-8 text-4xl'>
          {(subject ?? [])[0]?.name}{": "}{params?.get('armName')}
        </div>
        <div className='flex flex-col gap-4'>
          {(data && !isFetchingPeriodSubjects) && data.data ? (
            data.data.length > 0 ? (
              data.data.map((period, i) => (
                <SmallTeacherSubjectListItem
                  sessionId={
                    profile?.currentSession?.[0]?.id as unknown as string
                  }
                  termId={term as unknown as string}
                  periodId={period.id as unknown as string}
                  classId={params?.get('classArmId') ?? ""}
                  onClick={() =>
                    router.push(
                      isGenericApp
                        ? i % 2 === 0
                          ? '/teacher/classes/subject-task-doc'
                          : '/teacher/classes/subject-task-video'
                        : `/teacher/classes/subject-task?id=${period.id}&classArmId=${params?.get('classArmId')}`
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
            <GenericLoader />
          )}
        </div>
      </div>
      {data
        && data.data
        && data.data.length > 0
        && (data?.paging?.totalPage > 0)
        && !isFetchingPeriodSubjects
        && (
          <PaginatedCounter
            currentPage={currentPage}
            onChange={setCurrentPage}
            pageCount={data?.paging?.totalPage ?? 1}
          />
        )}
    </div>
  );
}
