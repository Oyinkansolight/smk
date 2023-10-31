/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { useQuery } from 'react-query';

export function useGetSessionCalendar(id: string) {
  const query = useQuery({
    queryKey: 'academic_sessions_calendar',
    queryFn: () =>
      request
        .get(`/v1/government/events/session-calender?sessionId=${id}`)
        .then((v) => v.data.data.data.data as any),
  });
  return query;
}
