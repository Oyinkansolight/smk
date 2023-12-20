/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { BatteryLevel, ChartParams, DashboardOverview } from '@/types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetDashboardOverview() {
  const query = useQuery({
    queryKey: 'dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-government-dashboard', {
          withCredentials: true,
        })
        .then((v) => v.data.data.data as DashboardOverview),
  });
  return query;
}

export function useGetInstitutionDashboardOverview() {
  const query = useQuery({
    queryKey: 'institute_dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-institution-dashboard', {
          withCredentials: true,
        })
        .then((v) => v.data.data.data as DashboardOverview),
  });
  return query;
}
export function useGetEnrollmentAnalysisCSV() {
  const query = useQuery({
    queryKey: 'get_enrollment_analysis',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/generate-csv-data', {
          withCredentials: true,
        })
        .then((v) => v.data.data.data as any),
  });
  return query;
}

export function useGetStaffDashboardOverview() {
  const query = useQuery({
    queryKey: 'staff_dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-staff-dashboard', {
          withCredentials: true,
        })
        .then((v) => v.data.data.data as DashboardOverview),
  });
  return query;
}

export function useGetStudentDashboardOverview() {
  const query = useQuery({
    queryKey: 'student_dashboard_overview',
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-student-dashboard', {
          withCredentials: true,
        })
        .then((v) => v.data.data as DashboardOverview),
  });
  return query;
}

export function useGetAcademicSessions() {
  const query = useQuery({
    queryKey: 'academic_sessions',
    queryFn: () =>
      request
        .get('/v1/government/session/all?limit=20', {
          withCredentials: true,
        })
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

export function useGetAdminCharts(params: Partial<ChartParams>) {
  const query = useQuery({
    queryKey: 'admin_charts',
    refetchOnWindowFocus: false,
    queryFn: () =>
      request
        .get('/v1/government/dashboards/get-admin-stat-dashboard', {
          params,
          withCredentials: true,
        })
        .then((v) => v.data.data as any),
  });
  return query;
}

export function useCreateLowBatteryEntry() {
  const mutation = useMutation({
    mutationKey: 'update-battery-level',
    mutationFn: (params: Partial<BatteryLevel>) =>
      request.put(
        '/v1/utilities/update-batery-level',
        { params },
        {
          withCredentials: true,
        }
      ),
  });
  return mutation;
}
