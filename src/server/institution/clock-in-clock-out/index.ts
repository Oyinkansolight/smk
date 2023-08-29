import request from '@/server';
import { useQuery } from 'react-query';

export interface ClockInfo {
  id?: string;
  clockInTime?: Date;
  clockOutTime?: null;
  status?: boolean;
  isClockedIn?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
