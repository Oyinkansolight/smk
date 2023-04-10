import { useQuery } from 'react-query';

import { request } from '@/server';

import { DashboardOverview } from '@/types';

export function useGetDashboardOverview() {
  const query = useQuery({
    queryKey: 'dashboard_overview',
    queryFn: () =>
      request
        .get('/dashboard/overview')
        .then((v) => v.data as DashboardOverview),
  });
  return query;
}
