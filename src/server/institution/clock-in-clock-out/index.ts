import request from '@/server';
import { useMutation, useQuery } from 'react-query';

export interface ClockInfo {
  id?: number;
  clockInTime?: Date;
  clockOutTime?: Date;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export function useClockIn() {
  const mutation = useMutation({
    mutationKey: 'clock_in',
    mutationFn: (params: { clockInTime: string }) =>
      request.post('/v1/institutions/clock/clock-in', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useClockOut() {
  const mutation = useMutation({
    mutationKey: 'clock_out',
    mutationFn: (params: { clockOutTime: string }) =>
      request.post('/v1/institutions/clock/clock-out', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useGetClockInfo() {
  const mutation = useQuery({
    queryKey: 'get_clock_info',
    queryFn: async () =>
      (await request.get('/v1/institutions/clock/clock-info')).data.data
        .data as ClockInfo,
  });
  return mutation;
}
