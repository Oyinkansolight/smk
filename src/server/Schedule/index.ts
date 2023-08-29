/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface timetableArg {
  sessionId: any;
  classId: string;
  termId: number;
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

export function useGetAcademicTimetable({
  sessionId,
  classId,
  termId,
}: timetableArg) {
  const query = useQuery({
    queryKey: 'academic_timetable',
    queryFn: () =>
      request
        .get(
          `/v1/government/time-table/time-table-by-type?sessionId=${sessionId}&classId=${classId}&term=${termId}&type=DEFAULT&limit=10000`
        )
        .then((res) => res.data.data.data),
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
