/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { StudentResult } from '@/types/classes-and-subjects';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

interface timetableArg {
  classId?: number | string;
  weekid?: number | string;
  day?: string;
}

interface studentParam {
  studentId?: string;
  termId?: string;
  sessionId?: string;
  classArmId?: string;
  behavior?: string;
  rating?: number;
  type?: string;
  remark?: string;
  teacherId?: string;
}

export function useGetTodaysPeriod({ classId, weekid, day }: timetableArg) {
  const query = useQuery({
    refetchOnWindowFocus: false,
    queryKey: 'get_today_period',
    queryFn: () =>
      request
        .get(
          `/v1/institutions/institutes/get-today-periods?classId=${classId}&weekId=${weekid}&day=${day}&limit=1000`
        )
        .then((res) => res.data.data.data),
  });
  return query;
}

export function useGetStudentReportCard(params?: studentParam) {
  // government/students/report-card
  const query = useQuery({
    queryKey: `get_student_subject_position_${params?.studentId}`,
    queryFn: async () => {
      if (
        params?.classArmId &&
        params?.studentId &&
        params?.sessionId &&
        params?.termId
      ) {
        try {
          const d = await request.get('/v1/government/students/report-card', {
            params,
          });
          return d.data.data.data as StudentResult;
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [
    params?.studentId,
    params?.classArmId,
    params?.termId,
    params?.sessionId,
    refetch,
  ]);

  return query;
}
export function useUpdateStudentDomain() {
  const mutation = useMutation({
    mutationKey: 'update-student-domain',
    mutationFn: (params: studentParam) =>
      request.post('/v1/government/students/create-behavior-domain', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
export function useSubmitActivity() {
  const mutation = useMutation({
    mutationKey: 'submit-activity',
    mutationFn: (params: any) =>
      request.post('/v1/institutions/lessons/submit-class-activity', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
export function useVerifyStudent() {
  const mutation = useMutation({
    mutationKey: 'verify-student',
    mutationFn: (params: any) =>
      request.post('/v1/government/students/verify-student', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
// /v1/institutions/lessons/submit-class-activity
