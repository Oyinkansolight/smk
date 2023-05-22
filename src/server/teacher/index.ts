import request from '@/server';
import { IncidentReportType } from '@/types/institute';
import { useMutation } from 'react-query';

interface ClockInParams {
  clockInTime: string;
  teacherId: number;
}

interface ClockOutParams {
  clockOutTime: string;
  teacherId: number;
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
