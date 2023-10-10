import request from '@/server';
import { GradeListItem } from '@/types/classes-and-subjects';
import { AssignedSubject, Subject, User } from '@/types/institute';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

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
  const query = useQuery({
    queryKey: 'get_subject_grade_book',
    queryFn: async () => {
      const d = await request.get(
        '/v1/institutions/grade-book/get-subject-grade-books',
        { params, withCredentials: true }
      );
      return d.data.data.data.data as GradeListItem[];
    },
  });
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

export interface CreateGradeSettingsParams {
  gradeType?: string;
  gradeList?: GradeList[];
  classId?: string;
  subjectId?: string;
  sessionId?: string;
  termId?: string;
  institutionId?: string;
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
        await request.post(
          '/v1/institutions/grade-book/create-grade-book',
          params,
          {
            withCredentials: true,
          }
        )
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
    refetch();
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
          status: 'PRESENT' | 'ABSENT';
          student: { id: string };
        }[];
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [params.periodId, refetch]);
  return query;
}

export function useDeleteSubject() {
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
  });
  return mutation;
}
export function useDeleteStaff() {
  const mutation = useMutation({
    mutationKey: 'delete_staff',
    mutationFn: async (id?: string) =>
      (await request.delete(`/v1/government/teachers/delete-by-id?id=${id}`))
        .data,
  });
  return mutation;
}
export function useDeleteStudent() {
  const mutation = useMutation({
    mutationKey: 'delete_student',
    mutationFn: async (id?: string) =>
      (await request.delete(`/v1/government/students/delete-by-id?id=${id}`))
        .data,
  });
  return mutation;
}
export function useDeleteClass() {
  const mutation = useMutation({
    mutationKey: 'delete_Class',
    mutationFn: async (id?: string) =>
      (await request.delete(`/v1/institutions/class-arm/delete?classArmId=${id}`))
        .data,
  });
  return mutation;
}
