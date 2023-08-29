import request from '@/server';
import { PaginatedData } from '@/types/pagination';
import { ClassTestExam } from '@/types/test-and-exam';
import { useQuery } from 'react-query';

export interface GetClassTestExamParams {
  sessionId?: number;
  termId?: number;
  classId?: number;
  type?: string;
}
export function useGetClassTestExam(params: GetClassTestExamParams) {
  const query = useQuery({
    queryKey: 'get_class_test_exam',
    queryFn: async () => {
      const d = await request.get(
        `/v1/government/test_exam/get-class-test-exam`,
        { params }
      );
      return d.data.data.data as PaginatedData<ClassTestExam>;
    },
  });
  return query;
}

export interface GetSubjectTestExamParams {
  sessionId?: string;
  termId?: string;
  classId?: string;
  type?: string;
  subjectId?: string | null;
}

export function useGetSubjectTestExam(params: GetSubjectTestExamParams) {
  const query = useQuery({
    queryKey: 'get_subject_test_exam',
    queryFn: async () => {
      const d = await request.get(
        `/v1/government/test_exam/get-subject-test-exam`,
        { params }
      );
      return d.data.data.data as PaginatedData<ClassTestExam>;
    },
  });
  return query;
}
