import request from '@/server';
import { GradeListItem } from '@/types/classes-and-subjects';
import { AssignedSubject, Subject, User } from '@/types/institute';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface CreateGradeSettingsParams {
  gradeType?: string;
  gradeList?: GradeList[];
  classId?: string;
  subjectId?: string;
  sessionId?: string;
  termId?: string;
  institutionId?: string;
  classArmId?: string;
  ca1_score?: number;
  ca2_score?: number;
  exams_score?: number;
  limit?: number;
}
export function useGetGovernmentSubjectList() {
  const query = useQuery({
    queryKey: 'get_subject_list_gov',
    queryFn: async () => {
      const d = await request.get(
        '/v1/government/classes-subjects/get-subjects?limit=10000000',
        {
          withCredentials: true,
        }
      );
      return d.data.data.data.data as Subject[];
    },
  });
  return query;
}

export function useGetGovernmentSubjectById(id?: string) {
  const query = useQuery({
    queryKey: ['get_subject_list_by_id', id],
    queryFn: async () => {
      if (id) {
        const d = await request.get(
          '/v1/government/classes-subjects/get-subjects',
          { params: { id }, withCredentials: true }
        );
        return d.data.data.data.data as Subject[];
      }
    },
  });
  return query;
}

export interface GetSubjectGradeBookParams {
  sessionId?: string;
  termId?: string;
  institutionId?: string;
  classArmId?: string;
  subjectId?: string;
}

export function useGetSubjectGradeBook(params: GetSubjectGradeBookParams) {
  const allParamsPresent = Object.values(params).every((v) => v);

  const query = useQuery({
    queryKey: 'get_subject_grade_book',
    queryFn: async () => {
      if (allParamsPresent) {
        const d = await request.get(
          '/v1/institutions/grade-book/get-subject-grade-books',
          { params, withCredentials: true }
        );
        return d.data.data.data.data as GradeListItem[];
      }
    },

    enabled: allParamsPresent ? true : false,
  });

  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [
    params.sessionId,
    params.termId,
    params.institutionId,
    params.classArmId,
    params.subjectId,
    refetch,
  ]);
  return query;
}
export function useCreateSubjectGradeBook() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-gradebook',
    mutationFn: (params: CreateGradeSettingsParams) =>
      request.post('/v1/institutions/manual_grade', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries(`get-gradebook-scoresheet`);
    },
  });
  return mutation;
}
export function useResetSubjectGradeBook() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'reset-gradebook',
    mutationFn: (params: CreateGradeSettingsParams) =>
      request.post('/v1/institutions/manual_grade/reset', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries(`get-gradebook-scoresheet`);
    },
  });
  return mutation;
}
export function useCreateResultFromGradeBook() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-gradebook',
    mutationFn: (params: CreateGradeSettingsParams) =>
      request.post('/v1/institutions/manual_grade/subject/position', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries(`get-gradebook-scoresheet`);
    },
  });
  return mutation;
}
export function useGetSubjectScoreSheet(params: CreateGradeSettingsParams) {
  const query = useQuery({
    queryKey: 'get-gradebook-scoresheet',
    queryFn: async () => {
      if (params.sessionId && params.termId) {
        const d = await request.get(
          `/v1/institutions/manual_grade/class/subject/`,
          { params }
        );
        return d.data.data.data;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [
    params.sessionId,
    params.termId,
    params.institutionId,
    params.classArmId,
    params.subjectId,
    refetch,
  ]);
  return query;
}
export function useEditSubjectGradeBook() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-gradebook',
    mutationFn: (params: any) => {
      const gradeBookId = params.id;
      delete params.id;
      return request.patch(
        `/v1/institutions/manual_grade/${gradeBookId}`,
        params
      );
    },
    onSettled: () => {
      client.refetchQueries(`get-gradebook-scoresheet`);
    },
  });
  return mutation;
}
export function useDeleteSubjectGradeBook() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-gradebook',
    mutationFn: (params: any) => {
      const gradeBookId = params.id;
      delete params.id;
      return request.delete(
        `/v1/institutions/manual_grade/${gradeBookId}`,
        params
      );
    },
    onSettled: () => {
      client.refetchQueries(`get-gradebook-scoresheet`);
    },
  });
  return mutation;
}
export function useGetSubjectGradeList(params: GetSubjectGradeBookParams) {
  const query = useQuery({
    queryKey: 'get_subject_grade_List',
    queryFn: async () => {
      if (params?.subjectId) {
        const d = await request.get(
          `/v1/institutions/manual_grade/subject/${params.subjectId}`
        );
        return d.data.data.data as any[];
      }
    },
  });

  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params.subjectId, refetch]);
  return query;
}

export function useGetSubjectsAssignedToTeacher(
  teacherId?: string,
  sessionId?: string
) {
  const query = useQuery({
    queryKey: 'get_subjects_assigned_to_teacher',
    queryFn: async () => {
      if (teacherId && sessionId) {
        const d = await request.get(
          '/v1/government/classes-subjects/teacher-subjects',
          { params: { teacherId, sessionId }, withCredentials: true }
        );
        return d.data.data.data as AssignedSubject[];
      }
    },
  });
  return query;
}

export interface GradeList {
  gradeListType?: string;
  percentage?: string;
}

export function useCreateGradeSettings() {
  const mutation = useMutation({
    mutationKey: 'create_grade_book',
    mutationFn: async (params: CreateGradeSettingsParams) =>
      (
        await request.post('/v1/institutions/manual_grade', params, {
          withCredentials: true,
        })
      ).data.data.data,
  });
  return mutation;
}

export function useGetStudentsInTeacherClass(params: {
  classArmId?: string | number;
  institutionId?: string | number;
}) {
  const query = useQuery({
    queryKey: `get_students_in_teacher_class`,
    queryFn: async () => {
      if (params.classArmId && params.institutionId) {
        const d = await request.get(
          '/v1/institutions/institutes/total-students-in-class-institution',
          {
            params,
            withCredentials: true,
          }
        );
        return d.data.data.data.studentsInClass as User[];
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params.classArmId, params.institutionId, refetch]);
  return query;
}

export function useGetLessonAttendance(params: {
  periodId?: string | number | null;
}) {
  const query = useQuery({
    queryKey: `get_lesson_attendance`,
    queryFn: async () => {
      if (params.periodId) {
        const d = await request.get(
          '/v1/institutions/institutes/get-lesson-attendance',
          {
            params,
            withCredentials: true,
          }
        );
        return d.data.data.data.data as {
          id?: string;
          status: 'PRESENT' | 'ABSENT';
          student: { id: string };
        }[];
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params.periodId, refetch]);
  return query;
}

export function useDeleteSubject() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'delete_subject',
    mutationFn: async (id?: string) =>
      (
        await request.delete('/v1/government/classes-subjects/delete-subject', {
          params: {
            withCredentials: true,
          },
          data: { id },
        })
      ).data,
    onSettled: () => {
      client.refetchQueries(`get_subject_list`);
    },
  });
  return mutation;
}
export function useDeleteStaff() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'delete_staff',
    mutationFn: async (id?: string) =>
      (await request.delete(`/v1/government/teachers/delete-by-id?id=${id}`))
        .data,
    onSettled: () => {
      client.refetchQueries(`get_teachers_list_in_institution`);
    },
  });
  return mutation;
}
export function useDeleteStudent() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'delete_student',
    mutationFn: async (id?: string) =>
      (await request.delete(`/v1/government/students/delete-by-id?id=${id}`))
        .data,
    onSettled: () => {
      client.refetchQueries(`get_student_list`);
      client.refetchQueries(`get_student_list_By_institution`);
    },
  });
  return mutation;
}
export function useDeleteClass() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'delete_Class',
    mutationFn: async (id?: string) =>
      (
        await request.delete(
          `/v1/institutions/class-arm/delete?classArmId=${id}`
        )
      ).data,
    onSettled: () => {
      client.refetchQueries(`get_institute_class_arm`);
    },
  });
  return mutation;
}
