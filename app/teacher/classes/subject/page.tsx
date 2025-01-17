/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import WeekSelector from '@/components/input/WeekSelector';
import GenericLoader from '@/components/layout/Loader';
import PaginatedCounter from '@/components/layout/PaginatedCounter';
import EmptyView from '@/components/misc/EmptyView';
import SmallTeacherSubjectListItem from '@/components/views/teacher/SmallTeacherSubjectListItem';
import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';
import { useGetProfile } from '@/server/auth';
import { useGetGovernmentSubjectById } from '@/server/government/classes_and_subjects';
import { useGetAcademicSessionsTermsWeek } from '@/server/institution';
import { useGetWeekPeriodsBySubject } from '@/server/institution/period';
import { Week } from '@/types/classes-and-subjects';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId: string = getFromLocalStorage('currentSessionId') ?? '';
  const term: any = getFromSessionStorage('currentTerm');

  const [weekIndex, setWeekIndex] = useState(0);
  const currentWeekFromSession = getFromSessionStorage('currentWeek');
  const { data: profile } = useGetProfile();
  // const { data: terms, isLoading: isLoadingSessions } = useGetSessionTerms({
  //   sessionId,
  // });

  // const term = terms?.data[1]?.id;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: weeks, isLoading: isLoadingTermWeeks } =
    useGetAcademicSessionsTermsWeek(JSON.parse(term)?.id);
  const [currentWeek, setCurrentWeek] = useState(0);
  const isGenericApp = Cookies.get('isGenericApp') === 'Y';

  useMemo(() => {
    //* Handle the current week index
    const getCurrentWeekIndex = () => {
      if (weeks) {
        const parsedCurrentWeek = JSON.parse(currentWeekFromSession ?? '');
        if (parsedCurrentWeek) {
          weeks?.data.forEach((week, index) => {
            if (week?.id === parsedCurrentWeek?.id) {
              setCurrentWeek(index);
              setWeekIndex(index);
            }
          });
        }
      }
    };

    getCurrentWeekIndex();
  }, [currentWeekFromSession, weeks]);

  const sortedWeeks: Week[] = [];

  if (weeks) {
    for (let index = 0; index < weeks?.data.length; index++) {
      sortedWeeks.push(weeks.data[index]);
    }
  }

  // const foundClasses: any = [];
  // const parsedArms: (ClassArm | any)[] | undefined = arms?.map((arm) => {
  //   if (!foundClasses.includes(arm.class?.id)) {
  //     foundClasses.push(arm.class?.id);
  //     return arm;
  //   }
  // });

  const {
    data,
    isLoading: isLoadingPeriodSubjects,
    isFetching: isFetchingPeriodSubjects,
  } = useGetWeekPeriodsBySubject({
    termId: JSON.parse(term)?.id,
    page: currentPage,
    staffId: profile?.userInfo?.staff?.id,
    sessionId,
    weekId: sortedWeeks[currentWeek]?.id,
    subjectId: params?.get('id') ? params.get('id') : undefined,
    classId: params?.get('classId') ? params.get('classId') : undefined,
    // classId: parsedArms ? parsedArms[idx - 1]?.class?.id : '',
  });

  const { data: subject, isLoading: subjectLoading } =
    useGetGovernmentSubjectById(params?.get('id') as string);

  const isLoadingData =
    isLoadingTermWeeks || subjectLoading || isLoadingPeriodSubjects;

  if (!data || isLoadingData) {
    return <GenericLoader />;
  }

  return (
    <div className='px-8 layout pl-0 lg:pl-20'>
      <div
        onClick={() => router.push('/teacher/classes')}
        className='flex items-center space-x-4 pt-4 cursor-pointer w-10'
      >
        <Image
          src='/svg/back.svg'
          width={10}
          height={10}
          alt='back'
          className='h-4 w-4'
        />
        <h3 className='text-[10px] font-medium'>Back</h3>
      </div>

      <div className='text-gray-600 py-8 text-2xl'>
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
        <div className='flex flex-col gap-1'>
          <div className='font-semibold text-xl -ml-12'>
            Current Week: {sortedWeeks[weekIndex]?.name}
          </div>

          <WeekSelector
            max={weeks?.data.length ? weeks?.data.length - 1 : 0}
            index={currentWeek}
            onChange={setCurrentWeek}
          />
        </div>
      </div>
      <div className=''>
        <div className='font-bold py-8 text-4xl'>
          {(subject ?? [])[0]?.name}
          {': '}
          {params?.get('armName')}
        </div>
        <div className='flex flex-col gap-4'>
          {data && !isFetchingPeriodSubjects && data.data ? (
            data.data.length > 0 ? (
              data.data.map((period, i) => (
                <SmallTeacherSubjectListItem
                  sessionId={
                    profile?.currentSession?.[0]?.id as unknown as string
                  }
                  termId={JSON.parse(term)?.id as unknown as string}
                  periodId={period.id as unknown as string}
                  classId={params?.get('classArmId') ?? ''}
                  onClick={() =>
                    router.push(
                      isGenericApp
                        ? i % 2 === 0
                          ? '/teacher/classes/subject-task-doc'
                          : '/teacher/classes/subject-task-video'
                        : `/teacher/classes/subject-task?id=${
                            period.id
                          }&classArmId=${params?.get(
                            'classArmId'
                          )}&armName=${params?.get('armName')}`
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
      {data &&
        data.data &&
        data.data.length > 0 &&
        data?.paging?.totalPage > 0 &&
        !isFetchingPeriodSubjects && (
          <PaginatedCounter
            currentPage={currentPage}
            onChange={setCurrentPage}
            pageCount={data?.paging?.totalPage ?? 1}
          />
        )}
    </div>
  );
}
