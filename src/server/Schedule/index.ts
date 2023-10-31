/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface timetableArg {
  sessionId: any;
  classId: string | undefined;
  termId: number;
  type?: string;
  teacherId?: string;
}
export function useGetAcademicEvent() {
  const query = useQuery({
    queryKey: 'academic_events',
    queryFn: () =>
      request.get('/v1/government/events').then((v) => v.data.data.data as any),
  });
  return query;
}

export function useCreateAcademicEvent() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-academic-event',
    mutationFn: (params: any) =>
      request.post('/v1/government/events/create', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries('academic_events');
    },
  });
  return mutation;
}
export function useEditAcademicEvent() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'edit-academic-event',
    mutationFn: (params: any) =>
      request.put('/v1/government/events/update', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries('academic_events');
    },
  });
  return mutation;
}

export function useGetAcademicTimetable({
  sessionId,
  classId,
  termId,
  type = 'DEFAULT',

}: timetableArg) {
  const query = useQuery({
    queryKey: 'academic_timetable',
    queryFn: () =>
      request
        .get(
          `/v1/government/time-table/time-table-by-type?sessionId=${sessionId}&classId=${classId}&term=${termId}&type=${type}&limit=10000`
        )
        .then((res) => res.data.data.data),
  });
  return query;
}
export function useGetTeacherTimetable({
  classId,
  type = 'DEFAULT',
  teacherId = '',
}) {
  const query = useQuery({
    queryKey: 'teacher_timetable',
    queryFn: () => {
      if (classId && teacherId) {
        try {
          return request
            .get(
              `/v1/government/time-table/teacher-time-table?classId=${classId}&type=${type}&teacherId=${teacherId}&limit=10000`
            )
            .then((res) => res.data.data.data);
        } catch (error) {
          logger(error);
        }
      }
    },
  });
  return query;
}

export function useCreateAcademicTimeTable() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-academic-timetable',
    mutationFn: (params: any) =>
      request.post('/v1/government/time-table/create', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries('academic_timetable');
    },
  });
  return mutation;
}
export function useEditAcademicTimeTable() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'edit-academic-timetable',
    mutationFn: (params: any) =>
      request.post('/v1/government/time-table/update-time-table', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries('academic_timetable');
    },
  });
  return mutation;
}
export function useDeleteAcademicTimeTable() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'delete-academic-timetable',
    mutationFn: (params: any) =>
      request.delete(`/v1/government/events/delete-event?eventId=${params.id}`),
    onSettled: () => {
      client.refetchQueries('academic_timetable');
    },
  });
  return mutation;
}
export function useDeleteAcademicEvent() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'delete-academic-event',
    mutationFn: (params: any) =>
      request.delete(
        `/v1/government/events/delete-event?eventId=${params.eventId}`
      ),
    onSettled: () => {
      client.refetchQueries('academic_events');
    },
  });
  return mutation;
}
export function useCreateTestTimeTable() {
  const mutation = useMutation({
    mutationKey: 'create-test-timetable',
    mutationFn: (params: any) =>
      request.post(
        '/v1/government/time-table/create-exam-test-time-table',
        params,
        {
          withCredentials: true,
        }
      ),
  });
  return mutation;
}
export function useCreateCurriculum() {
  const mutation = useMutation({
    mutationKey: 'create-curruclum',
    mutationFn: (params: any) =>
      request.post('/v1/government/curriculum/create', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
