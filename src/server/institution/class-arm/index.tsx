import request from '@/server';
import { ClassArm } from '@/types/classes-and-subjects';
import { useEffect } from 'react';
import { useQuery } from 'react-query';


export function useGetAllClassArms(params: {
  classId?: string | number;
  institutionId?: string | number;
  sessionId?: string | number;
}) {
  const query = useQuery({
    queryKey: `get_all_class_arms`,
    queryFn: async () => {
      if (params.classId && params.institutionId && params.sessionId) {
        const d = await request.get('/v1/institutions/class-arm/class-arms', {
          params,
          withCredentials: true,
        });
        return d.data.data.data as ClassArm[];
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [params.classId, params.institutionId, params.sessionId, refetch]);
  return query;
}

export function useGetTeacherClassArms(params: {
  teacherId?: string | number;
  sessionId?: string | number;
}) {
  const query = useQuery({
    queryKey: `get_teacher_class_arms`,
    queryFn: async () => {
      if (params.teacherId && params.sessionId) {
        const d = await request.get(
          '/v1/institutions/institutes/get-teacher-classarms',
          {
            params,
            withCredentials: true,
          }
        );
        return d.data.data.data as ClassArm[];
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [params.teacherId, params.sessionId, refetch]);
  return query;
}