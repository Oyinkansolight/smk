import request from '@/server';
import { ClassActivity } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export interface GetTeacherClassPeriodParams {
  sessionId?: number;
  teacherId?: number;
  weekId?: number;
  classId?: number;
  termId?: number;
}

export function useGetTeacherClassPeriod(params: GetTeacherClassPeriodParams) {
  const query = useQuery({
    queryKey: 'get_teacher_class_period',
    queryFn: () =>
      request
        .get(`/v1/institutions/institutes/get-teacher-class-periods`, {
          params,
        })
        .then((v) => v.data.data.data as PaginatedData<ClassActivity>),
  });
  return query;
}

export interface GetWeekPeriodsBySubjectParams {
  sessionId?: number;
  termId?: number;
  weekId?: number | string | null;
  classId?: number | string | null;
  subjectId?: number | string | null;
}

export function useGetWeekPeriodsBySubject(
  params: GetWeekPeriodsBySubjectParams
) {
  const query = useQuery({
    queryKey: 'get_week_periods_by_subject',
    queryFn: async () => {
      return params.sessionId && params.termId && params.weekId
        ? ((
            await request.get(
              `/v1/institutions/institutes/get-week-periods-by-subject`,
              {
                params,
              }
            )
          ).data.data.data as PaginatedData<ClassActivity>)
        : undefined;
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [
    refetch,
    params.sessionId,
    params.subjectId,
    params.termId,
    params.weekId,
  ]);

  return query;
}

export function useGetPeriodById(id?: number) {
  const query = useQuery({
    queryKey: 'get_week_periods_by_subject',
    queryFn: async () => {
      return id
        ? ((
            await request.get(`/v1/institutions/institutes/get-periods`, {
              params: { id },
            })
          ).data.data.data.data as ClassActivity)
        : undefined;
    },
  });
  return query;
}