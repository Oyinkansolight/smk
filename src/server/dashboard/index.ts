import request from '@/server';
import { DashboardOverview } from '@/types';
import { useQuery } from 'react-query';

export function useGetDashboardOverview() {
  const query = useQuery({
    queryKey: 'dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-government-dashboard')
        .then((v) => v.data.data as DashboardOverview),
  });
  return query;
}

export function useGetInstitutionDashboardOverview() {
  const query = useQuery({
    queryKey: 'dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-institution-dashboard')
        .then((v) => v.data.data as DashboardOverview),
  });
  return query;
}
