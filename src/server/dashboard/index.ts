/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { DashboardOverview } from '@/types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
export function useGetAcademicSessions() {
  const query = useQuery({
    queryKey: 'academic_sessions',
    queryFn: () =>
      request
        .get('/v1/government/session/all')
        .then((v) => v.data.data.data as any),
  });
  return query;
}

export function useCreateAcademicCalendar() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-academic-calendar',
    mutationFn: (params: any) =>
      request.post('/v1/government/session/create', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries('academic_sessions');
    },
  });
  return mutation;
}
