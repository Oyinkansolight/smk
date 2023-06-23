import request from '@/server';
import { PaginationParams } from '@/types';
import { IncidentReportType, Subject } from '@/types/institute';
import { useMutation, useQuery } from 'react-query';

interface ClockInParams {
  clockInTime: string;
  teacherId: number;
}

interface ClockOutParams {
  clockOutTime: string;
  teacherId: number;
}

interface AttendanceParams {
  lessonId: number;
  institutionId: number;
  classId: number;
  studentId: number;
  sessionId: number;
  term: number;
  status: string;
}

export function useCreateReport() {
  const mutation = useMutation({
    mutationKey: 'create-report',
    mutationFn: (params: IncidentReportType) =>
      request.post('/v1/government/report/create-report', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useClockIn() {
  const mutation = useMutation({
    mutationKey: 'create-report',
    mutationFn: (params: ClockInParams) =>
      request.post('/v1/institutions/clock/teacher-clock-in', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useClockOut() {
  const mutation = useMutation({
    mutationKey: 'create-report',
    mutationFn: (params: ClockOutParams) =>
      request.post('/v1/institutions/clock/teacher-clock-out', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useGetTeachersSubjectList(params: PaginationParams) {
  const query = useQuery({
    queryKey: 'get_subject_list_teacher',
    queryFn: async () => {
      const d = await request.get(
        `/v1/government/classes-subjects/teacher-subjects`,
        { params }
      );
      return d.data.data.data as Subject[];
    },
  });
  return query;
}

export function useTakeAttendance() {
  const mutation = useMutation({
    mutationKey: 'take_attendance',
    mutationFn: (params: AttendanceParams) =>
      request.post('/v1/institutions/institutes/take-attendance', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}