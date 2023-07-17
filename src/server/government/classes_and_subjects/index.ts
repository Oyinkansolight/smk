import request from '@/server';
import { GradeListItem } from '@/types/classes-and-subjects';
import { Subject } from '@/types/institute';
import { useQuery } from 'react-query';

export function useGetGovernmentSubjectList() {
  const query = useQuery({
    queryKey: 'get_subject_list_gov',
    queryFn: async () => {
      const d = await request.get(
        '/v1/government/classes-subjects/get-subjects?limit=10000000'
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
          { params: { id } }
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
  classId?: string;
  subjectId?: string;
}

export function useGetSubjectGradeBook(params: GetSubjectGradeBookParams) {
  const query = useQuery({
    queryKey: 'get_subject_grade_book',
    queryFn: async () => {
      const d = await request.get(
        '/v1/institutions/grade-book/get-subject-grade-books',
        { params }
      );
      return d.data.data.data.data as GradeListItem[];
    },
  });
  return query;
}

export function useGetSubjectsAssignedToTeacher(id?: number) {
  const query = useQuery({
    queryKey: 'get_subjects_assigned_to_teacher',
    queryFn: async () => {
      const d = await request.get(
        '/v1/government/classes-subjects/teacher-subjects',
        { params: { id } }
      );
      return d.data.data.data as Subject[];
    },
  });
  return query;
}
