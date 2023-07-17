import request from '@/server';
import { TeacherNextClass } from '@/types/classes-and-subjects';
import { IncidentReportType, Subject } from '@/types/institute';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface ClockInParams {
  sessionId: number;
  termId: number;
}

interface ClockOutParams {
  clockOutTime: string;
}

interface AttendanceParams {
  institutionId: number;
  classId: number;
  studentId: number;
  sessionId: number;
  termId: number;
  status: string;
  periodId: number;
}

export function useCreateReport() {
  const mutation = useMutation({
    mutationKey: 'create_report',
    mutationFn: (params: IncidentReportType) =>
      request.post('/v1/government/report/create-report', params, {
        withCredentials: true,
      }),
  });
  return mutation;
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

export interface GetTeacherNextClassParams {
  teacherId?: number;
  sessionId?: number;
  termId?: number;
  weekId?: number;
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
    queryKey: 'get_teacher_next_class',
    queryFn: async () => {
      const d = await request.get(
        `/v1/government/teachers/teacher-next-class`,
        { params }
      );
      return d.data.data.data as TeacherNextClass;
    },
  });
  return query;
}
