import request from '@/server';
import { ClassActivity } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
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
  weekId?: number;
  classId?: number;
  subjectId?: number;
}

export function useGetWeekPeriodsBySubject(
  params: GetWeekPeriodsBySubjectParams
) {
  const query = useQuery({
    queryKey: 'get_week_periods_by_subject',
    queryFn: () =>
      // true || (params.sessionId && params.subjectId)
      // ?
      request
        .get(`/v1/institutions/institutes/get-week-periods`, {
          params,
        })
        .then((v) => v.data.data.data as PaginatedData<ClassActivity>),
    // : undefined,
  });
  return query;
}