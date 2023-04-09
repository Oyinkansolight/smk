import { useQuery } from 'react-query';

import { request } from '@/server';

export function useGetDashboardOverview() {
  const query = useQuery({
    queryKey: 'dashboard_overview',
    queryFn: () => request.get('/dashboard/overview'),
  });
  return query;
}
