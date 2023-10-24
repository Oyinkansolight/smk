/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { Student } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetStudentList(params: any) {
  const query = useQuery({
    queryKey: `get_student_list_${params.query ?? ''}`,
    queryFn: async () => {
      const d = await request.get(`/v1/government/students/get-student-by-id`, {
        params,
        withCredentials: true,
      });

      return d.data.data.data as Student;
    },
  });
  return query;
}

interface UpdateStudentParams {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  readingProficiency?: string;
}

export function useUpdateStudent() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'update_student',
    mutationFn: async (params: UpdateStudentParams) =>
      (
        await request.post('/v1/government/students/update-student', params, {
          withCredentials: true,
        })
      ).data.data.data,
    onSettled: (data) => {
      // console.log('Student Id: ', data.student.id);
      client.refetchQueries(`get_student_list_${data.student.id ?? ''}`);
    },
  });
  return mutation;
}

export function useGetStudentNextPeriod({ studentId }) {
  const query = useQuery({
    queryKey: 'get_student_next_period',
    queryFn: () =>
      request
        .get(
          `/v1/institutions/institutes/get-student-next-period?studentId=${studentId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data.data.data),
  });
  return query;
}

export function useGetStudentOngoingPeriod({ studentId, weekId }) {
  const query = useQuery({
    queryKey: 'get_student_ongoing_period',
    queryFn: () =>
      request
        .get(
          `/v1/institutions/institutes/get-student-ongoing-period?studentId=${studentId}&weekId=${weekId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data.data.data),
  });
  return query;
}

interface TakeAttendanceParams {
  periodId?: string | number | null;
  institutionId?: string | number | null;
  sessionId?: string | number | null;
  termId?: string | number | null;
  classId?: string | number | null;
  studentId?: string | number | null;
  classArmId?: string | number | null;
  status?: 'PRESENT' | 'ABSENT' | 'LATE';
}

export function useTakeAttendance() {
  const mutation = useMutation({
    mutationKey: 'take_attendance',
    mutationFn: async (params: TakeAttendanceParams) =>
      (
        await request.post(
          '/v1/institutions/institutes/take-attendance',
          params,
          {
            withCredentials: true,
          }
        )
      ).data.data.data,
  });
  return mutation;
}
