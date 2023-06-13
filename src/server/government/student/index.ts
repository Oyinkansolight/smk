import request from '@/server';
import { PaginationParams } from '@/types';
import { Student } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetStudentList(params: PaginationParams) {
  const query = useQuery({
    queryKey: `get_student_list_${params.id ?? ''}`,
    queryFn: async () => {
      const d = await request.get('/v1/government/students/get-students', {
        params,
      });

      return d.data.data.data as PaginatedData<Student>;
    },
  });
  return query;
}

interface UpdateStudentParams {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
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
