/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { StaffCoordinatesParams } from '@/types';
import { TeacherNextClass } from '@/types/classes-and-subjects';
import { IncidentReportType, Subject } from '@/types/institute';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface ClockInParams {
  sessionId?: number | string | null;
  termId?: number | string | null;
}

interface ClockOutParams {
  clockOutTime: string;
}

interface AttendanceParams {
  institutionId: number;
  classId: string;
  studentId: number;
  sessionId: string;
  termId: number;
  status: string;
  periodId: number;
}

export function useCreateReport() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create_report',
    mutationFn: (params: IncidentReportType) =>
      request.post('/v1/government/report/create-report', params, {
        withCredentials: true,
      }),
    onSettled: async () => {
      await client.refetchQueries('get_my_report');
    },
  });
  return mutation;
}
export function useGetMyReports() {
  const query = useQuery({
    queryKey: 'get_my_report',
    queryFn: async () => {
      const d = await request.get(`/v1/government/report/get-my-reports`);
      return d.data.data as any;
    },
  });
  return query;
}

export function useClockIn() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'clock_in',
    mutationFn: async (params: ClockInParams) => {
      return await request.post('/v1/institutions/clock/clock-in', params, {
        withCredentials: true,
      });
    },
    onSettled: async () => {
      await client.refetchQueries('get_clock_info');
    },
  });
  return mutation;
}

export function useClockOut() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'clock_out',
    mutationFn: (params: ClockOutParams) =>
      request.post('/v1/institutions/clock/clock-out', params, {
        withCredentials: true,
      }),
    onSettled: async () => {
      await client.refetchQueries('get_clock_info');
    },
  });
  return mutation;
}

export function useGetTeachersSubjectList(params: unknown) {
  const query = useQuery({
    queryKey: 'get_subject_list_teacher',
    queryFn: async () => {
      const d = await request.get(`/v1/government/report/get-my-reports`, {
        params,
      });
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

export interface GetTeacherNextClassParams {
  teacherId?: string;
  sessionId?: string;
  termId?: string;
  weekId?: string;
  day?:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
}

export function useGetTeacherNextClass(params: GetTeacherNextClassParams) {
  const query = useQuery({
    refetchOnWindowFocus: false,
    queryKey: 'get_teacher_next_class',
    queryFn: async () => {
      if (
        params.teacherId &&
        params.sessionId &&
        params.termId &&
        params.weekId
      ) {
        const d = await request.get(
          `/v1/government/teachers/teacher-next-class`,
          { params }
        );
        return d.data.data.data as TeacherNextClass[];
      }
    },
  });

  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [
    params.teacherId,
    params.sessionId,
    params.termId,
    params.weekId,
    refetch,
  ]);

  return query;
}

export function useSubmitStaffCoordinates() {
  const mutation = useMutation({
    mutationKey: 'submit_staff_coordinates',
    mutationFn: (params: StaffCoordinatesParams) =>
      request.post('/v1/institutions/staff_cordinates', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
