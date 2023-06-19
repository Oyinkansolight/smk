/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { PaginationParams } from '@/types';
import { Student, Subject } from '@/types/institute';
import { Staff } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface CreateInstitutionParams {
  instituteName?: string;
  instituteEmail?: string;
  instituteLogo?: string;
  instituteAddress?: string;
  instituteLat?: string;
  instituteLong?: string;
  instituteType?: string;
  town?: number;
  email?: string;
  password?: string;
  role?: number;
  id?: number;
}

export interface CreateSubjectParams {
  name?: string;
  classId?: number[];
  description?: string;
}

export function useCreateInstitution() {
  const mutation = useMutation({
    mutationKey: 'create_institution',
    mutationFn: (params: CreateInstitutionParams) =>
      request.post('/v1/government/institutes/add-institute', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useInviteInstitution() {
  const mutation = useMutation({
    mutationKey: 'invite_institution',
    mutationFn: (params: CreateInstitutionParams) =>
      request.post('/v1/government/institutes/invite-institute', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useCompleteInstitutionOnboarding() {
  const mutation = useMutation({
    mutationKey: 'complete_institution_onboarding',
    mutationFn: (params: CreateInstitutionParams) =>
      request.post(
        '/v1/government/institutes/complete-institute-onboarding',
        params
      ),
  });
  return mutation;
}

export function useOnboardVerification() {
  const mutation = useMutation({
    mutationKey: 'onboard_verification',
    mutationFn: async (token: string) =>
      (await request.get(
        `/v1/government/institutes/verify-institute-token?token=${token}`
      )) as any,
  });

  return mutation;
}

export function useCreateSubject() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'create_subject',
    mutationFn: async (params: CreateSubjectParams) => {
      return (
        await request.post(
          '/v1/government/classes-subjects/add-subject',
          params
        )
      ).data.data as Subject;
    },
    onSettled: (data) => {
      client.refetchQueries('get_subject_list');
      client.refetchQueries(['get_subject_list_by_id', data?.id]);
    },
  });
  return mutation;
}

export function useGetSubjectList() {
  const query = useQuery({
    queryKey: 'get_subject_list',
    queryFn: async () => {
      try {
        const d = await request.get(
          '/v1/government/institutes/get-subject-list?limit=100'
        );
        return d.data.data.data.data as Subject[];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}

export function useGetStudentsList() {
  const query = useQuery({
    queryKey: 'get_student_list',
    queryFn: async () => {
      try {
        const d = await request.get(
          '/v1/government/students/get-students?limit=100'
        );
        return d.data.data.data.data as Student[];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}

export function useGetTeachersList(params?: PaginationParams) {
  const query = useQuery({
    queryKey: 'get_teachers_list',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/government/teachers/get-staffs', {
          params,
        });
        return d.data.data.data as PaginatedData<Staff>;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}
export function useGetClassesList() {
  const query = useQuery({
    queryKey: 'get_teachers_list',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/institutions/institutes/get-classes');
        return d.data.data.data as any;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}
export function useGetSchools(type?: string) {
  const instituteType = type ?? '';
  const query = useQuery({
    queryKey: 'get_school_list',
    queryFn: async () => {
      try {
        const d = await request.get(
          '/v1/government/institutes/get-institutes?limit=100'
        );
        const result = d.data.data.data.data.filter(
          (item: any) =>
            item.instituteType.includes(instituteType) &&
            item.isOnboardingCompleted
        );
        return result as any;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}
export function useGetStaffTypes() {
  const query = useQuery({
    queryKey: 'get_staff_type_list',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/utilities/get-staff-type');
        return d.data.data.data as any;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}

export function useGetSubjectById(id?: string) {
  const query = useQuery({
    queryKey: ['get_subject_list_by_id', id],
    queryFn: async () => {
      try {
        if (id) {
          const d = await request.get(
            '/v1/government/institutes/get-subject-list',
            { params: { id } }
          );
          return d.data.data.data.data as Subject[];
        }
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}
export function useCreateStaff() {
  const mutation = useMutation({
    mutationKey: 'create-staff',
    mutationFn: (params: any) =>
      request.post('/v1/government/teachers/add-teaching-staff', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
export function useCreateStudent() {
  const mutation = useMutation({
    mutationKey: 'create-student',
    mutationFn: (params: any) =>
      request.post('/v1/government/students/add-student', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useGetAcademicSessionsTermsWeek(id: number) {
  const query = useQuery({
    queryKey: 'academic_sessions_terms',
    queryFn: () =>
      request
        .get(`/v1/institutions/institutes/get-term-weeks?termId=${id}`)
        .then((v) => v.data.data.data as any),
  });
  return query;
}

export function useGetIncidentReports(id?: string) {
  const query = useQuery({
    queryKey: ['get_incident_report_list', id],
    queryFn: async () => {
      try {
        const d = await request.get(
          `/v1/government/report/get-institution-report?institutionId=${id}`
        );
        return d.data.data.data.data as [];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}
