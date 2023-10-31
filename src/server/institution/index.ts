/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { PaginationParams } from '@/types';
import { Week } from '@/types/classes-and-subjects';
import {
  Institution,
  Student,
  StudentsListByInstitution,
  Subject,
} from '@/types/institute';
import { Staff } from '@/types/institute';
import { PaginatedData, StaffPaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface CreateInstitutionParams {
  instituteName?: string;
  instituteEmail?: string;
  instituteLogo?: string;
  instituteAddress?: string;
  instituteLat?: string;
  instituteLong?: string;
  instituteType?: string;
  town?: string;
  email?: string;
  password?: string;
  role: string;
  id?: string;
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
      request.post(
        '/v1/government/institutes/add-institute',
        { ...params },
        {
          withCredentials: true,
        }
      ),
  });

  return mutation;
}

export function useInviteInstitution() {
  const mutation = useMutation({
    mutationKey: 'invite_institution',
    mutationFn: (params: Partial<CreateInstitutionParams>) =>
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
          '/v1/government/institutes/get-subject-list?limit=10000000',
          {
            withCredentials: true,
          }
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

export function useGetStudentSubjectList(id: any) {
  const query = useQuery({
    queryKey: 'get_student_subject_list',
    queryFn: async () => {
      try {
        const d = await request.get(
          `/v1/government/classes-subjects/student-subjects?id=${id}`
        );
        return d.data.data.data as any;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}

export function useGetStudentsList(params?: Partial<PaginationParams>) {
  const query = useQuery({
    queryKey: 'get_student_list',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/government/students/get-students', {
          params,
        });
        return d.data.data.data as PaginatedData<Student>;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params?.limit, params?.page, params?.id, params?.query, refetch]);
  return query;
}

export function useGetStudentsListByInstitution(
  params: StudentsListByInstitution
) {
  const { instituteId } = params;

  const query = useQuery({
    queryKey: 'get_student_list_By_institution',
    queryFn: async () => {
      if (instituteId) {
        try {
          const d = await request.get(
            `/v1/government/students/get-students-by-institution?institutionId=${instituteId}${
              params.limit ? `&limit=${params.limit}` : ''
            }${params.page ? `&page=${params.page}` : ''}${
              params.query ? `&query=${params.query}` : ''
            }`
          );
          return d.data.data.data as PaginatedData<Student> | any;
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params?.limit, params?.page, params?.query, refetch]);
  return query;
}

export function useGetStudentById(params?: PaginationParams) {
  const query = useQuery({
    queryKey: `get_student_${params?.id}`,
    queryFn: async () => {
      if (params?.id) {
        try {
          const d = await request.get(
            '/v1/government/students/get-student-by-id',
            {
              params,
            }
          );
          return d.data.data.data as Student;
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params?.id, refetch]);

  return query;
}

export function useGetStudentSubjectPosition(params?: {
  studentId?: string;
  termId?: string;
  sessionId?: string;
  classArmId?: string;
}) {
  const query = useQuery({
    queryKey: `get_student_subject_position_${params?.studentId}`,
    queryFn: async () => {
      if (
        params?.classArmId &&
        params?.studentId &&
        params?.sessionId &&
        params?.termId
      ) {
        try {
          const d = await request.get(
            '/v1/government/test_exam_score/get-student-subject-position',
            {
              params,
            }
          );
          return d.data.data.data;
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [
    params?.studentId,
    params?.classArmId,
    params?.termId,
    params?.sessionId,
    refetch,
  ]);

  return query;
}

export function useGetStudentTotalScoreAndTotalAttendance(params?: {
  termId?: string;
  sessionId?: string;
  classArmId?: string;
}) {
  const query = useQuery({
    queryKey: `get_student_total_score_and_attendance`,
    queryFn: async () => {
      if (params?.classArmId && params?.sessionId && params?.termId) {
        try {
          const d = await request.get(
            '/v1/government/test_exam_score/get-student-total-score-and-total-attendance',
            {
              params,
            }
          );
          return d.data;
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params?.classArmId, params?.termId, params?.sessionId, refetch]);

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
        return d.data.data.data as StaffPaginatedData<Staff>;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params?.limit, params?.page, params?.id, params?.query, refetch]);

  return query;
}

interface Props {
  instituteId?: string | null;
  limit?: number;
  query?: string;
  page?: number;
  enabled?: boolean;
}

export function useGetTeachersListByInstitution(props: Props) {
  const { instituteId, limit, page, query: q } = props;
  let { enabled } = props;

  if (enabled !== false) enabled = true;

  const query = useQuery({
    enabled,
    queryKey: 'get_teachers_list_in_institution',
    queryFn: async () => {
      if (instituteId) {
        try {
          const d = await request.get(
            `/v1/government/teachers/institution-staffs?institutionId=${instituteId}${
              limit ? `&limit=${limit}` : ''
            }${page ? `&page=${page}` : ''}`
          );
          return d.data.data.data as PaginatedData<Staff>;
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });

  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [limit, page, instituteId, refetch]);
  return query;
}

export function useGetTeacherById(params?: PaginationParams) {
  const query = useQuery({
    queryKey: `get_teacher_${params?.id}`,
    queryFn: async () => {
      try {
        const d = await request.get('/v1/government/teachers/get-staff-by-id', {
          params,
        });

        return d.data.data.data as any;
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
    queryKey: 'get_classes_list',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/institutions/institutes/get-classes', {
          params: {
            limit: 10000000,
          },
        });
        return d.data.data.data as any;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}

export function useGetSchools(params: Partial<PaginationParams>) {
  const query = useQuery({
    queryKey: 'get_school_list',
    queryFn: async () => {
      try {
        const d = await request.get(
          '/v1/government/institutes/get-institutes',
          { params }
        );
        return d.data.data.data as PaginatedData<Institution>;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params.limit, params.id, params.page, params.query, refetch]);

  return query;
}

export function useGetSchoolById(params: PaginationParams) {
  const query = useQuery({
    queryKey: `get_school_list_${params.query}`,
    queryFn: async () => {
      try {
        const d = await request.get(
          '/v1/government/institutes/get-institutes',
          { params }
        );
        const result = d.data.data.data.data[0] as Institution;
        return result;
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
            { params: { id }, withCredentials: true }
          );
          return d.data.data.data.data as Subject[];
        }
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [refetch, id]);
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

export function useUpdateStaffSubject() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'update-staff-subject',
    mutationFn: (params: any) =>
      request.post(
        '/v1/government/classes-subjects/assign-subject-to-teacher',
        params,
        {
          withCredentials: true,
        }
      ),
    onSettled: () => {
      client.refetchQueries('get_teacher_subject_list');
    },
  });
  return mutation;
}

export function useRemoveStaffSubject() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'delete-staff-subject',
    mutationFn: (params: any) =>
      request.delete(
        '/v1/government/classes-subjects/un-assign-subject-to-teacher',
        {
          params,
          withCredentials: true,
        }
      ),
    onSettled() {
      client.refetchQueries('get_teacher_subject_list');
    },
  });
  return mutation;
}

export function useCreateClassArm() {
  const mutation = useMutation({
    mutationKey: 'create-class-arm',
    mutationFn: (params: any) =>
      request.post('/v1/institutions/class-arm/create/', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useUpdateClassArm() {
  const mutation = useMutation({
    mutationKey: 'update-class-arm',
    mutationFn: (params: any) =>
      request.put('/v1/institutions/class-arm/update', params, {
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

export function useCreateBulkStudent() {
  const mutation = useMutation({
    mutationKey: 'create-student',
    mutationFn: (params: any) =>
      request.post('/v1/government/students/upload-students', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useCreateBulkStaff() {
  const mutation = useMutation({
    mutationKey: 'create-student',
    mutationFn: (params: any) =>
      request.post('/v1/government/teachers/upload-staff', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useGetAcademicSessionsTermsWeek(termId?: number | string) {
  const query = useQuery({
    queryKey: 'academic_sessions_terms',
    queryFn: async () =>
      termId
        ? ((
            await request.get(`/v1/institutions/institutes/get-term-weeks`, {
              params: { termId },
            })
          ).data.data as PaginatedData<Week>)
        : undefined,
  });
  const { refetch } = query;

  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [refetch, termId]);

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

export function useGetSubjectAssignedToTeacher(
  id?: string | null | undefined,
  sessionId?: string | null | undefined
) {
  const query = useQuery({
    queryKey: ['get_teacher_subject_list', id],
    queryFn: async () => {
      try {
        const d = await request.get(
          `/v1/government/classes-subjects/teacher-subjects?teacherId=${id}&&sessionId=${sessionId}`
        );

        return d.data.data.data as [];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}

export function useGetTeacherAttendanceLog() {
  const query = useQuery({
    queryKey: 'get_teacher_subject_list',
    queryFn: async () => {
      try {
        const d = await request.get(`/v1/institutions/clock/list-clock-in`);

        return d.data.data.data.data as [];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}
