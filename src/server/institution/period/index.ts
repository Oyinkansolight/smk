import request from '@/server';
import { LessonNoteObject } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

export interface GetTeacherClassPeriodParams {
  sessionId?: number;
  teacherId?: number;
  weekId?: number;
  classId?: number;
  termId?: number;
}

export function useGetTeacherClassPeriod(params: GetTeacherClassPeriodParams) {
  const client = useQueryClient();

  const query = useQuery({
    queryKey: 'get_teacher_class_period',
    queryFn: () =>
      request
        .get(`/v1/institutions/institutes/get-teacher-class-periods`, {
          params,
        })
        .then((v) => v.data.data.data as PaginatedData<LessonNoteObject>),
    onSettled: () => {
      client.refetchQueries('get_week_periods_by_subject');
    },
  });
  return query;
}

export interface GetWeekPeriodsBySubjectParams {
  page?: number;
  termId?: string;
  staffId?: string;
  sessionId?: string;
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
          ).data.data.data as PaginatedData<LessonNoteObject>)
        : undefined;
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [
    refetch,
    params.sessionId,
    params.subjectId,
    params.termId,
    params.weekId,
    params.classId,
    params.page,
  ]);

  return query;
}

export function useGetPeriodById(id?: string) {
  const query = useQuery({
    queryKey: 'get_week_periods_by_id',
    queryFn: async () => {
      return id
        ? ((
            await request.get(`/v1/institutions/institutes/get-period-by-id`, {
              params: { periodId: id },
            })
          ).data.data.data as LessonNoteObject)
        : undefined;
    },
  });
  return query;
}

export function useGetPeriodActivity(params?: any) {
  const query = useQuery({
    queryKey: 'get_week_periods_activity',
    queryFn: async () => {
      return params
        ? ((
            await request.get(
              `/v1/institutions/lessons/get-period-class-activities`,
              {
                params,
              }
            )
          ).data.data.data as any)
        : undefined;
    },
  });
  return query;
}
