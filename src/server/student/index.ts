/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { useQuery } from 'react-query';

interface timetableArg {
  sessionId: any;
  classId: number;
  termId: number;
  weekid: number;
  day: string;
}

export function useGetTodaysPeriod({
  sessionId,
  classId,
  termId,
  weekid,
  day,
}: timetableArg) {
  const query = useQuery({
    queryKey: 'get_today_period',
    queryFn: () =>
      request
        .get(
          `/v1/institutions/institutes/get-today-periods?sessionId=${sessionId}&termId=${termId}&classId=${classId}&weekId=${weekid}&day=${day}`
        )
        .then((res) => res.data.data.data),
  });
  return query;
}
