import request from '@/server';
import { DashboardOverview } from '@/types';
import { useQuery } from 'react-query';

export function useGetDashboardOverview() {
  const query = useQuery({
    queryKey: 'dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-government-dashboard')
        .then((v) => v.data.data.data as DashboardOverview),
  });
  return query;
}

export function useGetInstitutionDashboardOverview() {
  const query = useQuery({
    queryKey: 'institute_dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-institution-dashboard')
        .then((v) => v.data.data.data as DashboardOverview),
  });
  return query;
}

export function useGetStaffDashboardOverview() {
  const query = useQuery({
    queryKey: 'staff_dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-staff-dashboard')
        .then((v) => v.data.data as DashboardOverview),
  });
  return query;
}

export function useGetStudentDashboardOverview() {
  const query = useQuery({
    queryKey: 'student_dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-student-dashboard')
        .then((v) => v.data.data as DashboardOverview),
  });
  return query;
}
