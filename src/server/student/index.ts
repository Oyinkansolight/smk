/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { useMutation, useQuery } from 'react-query';

interface timetableArg {
  classId?: number | string;
  weekid?: number | string;
  day?: string;
}

export function useGetTodaysPeriod({
  classId,

  weekid,
  day,
}: timetableArg) {
  const query = useQuery({
    refetchOnWindowFocus: false,
    queryKey: 'get_today_period',
    queryFn: () =>
      request
        .get(
          `/v1/institutions/institutes/get-today-periods?classId=${classId}&weekId=${weekid}&day=${day}&limit=20`
        )
        .then((res) => res.data.data.data),
  });
  return query;
}

export function useSubmitActivity() {
  const mutation = useMutation({
    mutationKey: 'submit-activity',
    mutationFn: (params: any) =>
      request.post('/v1/institutions/lessons/submit-class-activity', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
// /v1/institutions/lessons/submit-class-activity
