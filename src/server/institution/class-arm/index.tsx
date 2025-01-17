import request from '@/server';
import { ClassArm } from '@/types/classes-and-subjects';
import {
  ClassArmStudents,
  StudentAttendanceInterface,
} from '@/types/institute';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

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
    refetch({ cancelRefetch: true });
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
    refetch({ cancelRefetch: true });
  }, [params.teacherId, params.sessionId, refetch]);
  return query;
}

export function useGetClassArmAttendance(params: { classArmId?: string }) {
  const query = useQuery({
    queryKey: `get_class_arm_attendance`,
    queryFn: async () => {
      //* Will remove check when BE implementation changes
      if (params.classArmId) {
        const d = await request.get(
          '/v1/institutions/institutes/get-class-arm-attendance',
          {
            params,
            withCredentials: true,
          }
        );
        return d.data.data as StudentAttendanceInterface[];
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params.classArmId, refetch]);
  return query;
}

interface TakeClassArmAttendanceParams {
  studentId?: string | number | null;
  classArmAttendanceId?: string | number | null;
  classArmId?: string | null;
  status?: 'PRESENT' | 'ABSENT' | 'LATE';
}

export function useTakeClassArmAttendance() {
  const mutation = useMutation({
    mutationKey: 'take_class_arm_attendance',
    mutationFn: async (params: TakeClassArmAttendanceParams) =>
      (
        await request.post(
          `/v1/institutions/institutes/take-class-arm-attendance?${
            params.studentId ? `studentId=${params.studentId}` : ''
          }&${params.status ? `status=${params.status}` : ''}&${
            params.classArmId ? `classArmId=${params.classArmId}` : ''
          }`,
          {
            withCredentials: true,
          }
        )
      ).data.data.data,
  });
  return mutation;
}

export function useUpdateClassArmAttendance() {
  const mutation = useMutation({
    mutationKey: 'update_class_arm_attendance',
    mutationFn: async (params: TakeClassArmAttendanceParams) =>
      (
        await request.patch(
          `/v1/institutions/institutes/update-class-arm-attendance?${
            params.classArmAttendanceId
              ? `classArmAttendanceId=${params.classArmAttendanceId}`
              : ''
          }&${params.status ? `status=${params.status}` : ''}`,
          {
            withCredentials: true,
          }
        )
      ).data.data.data,
  });
  return mutation;
}

export function useGetClassArmStudents(params: {
  classArmId?: string | null | undefined;
  termId?: string;
}) {
  const query = useQuery({
    queryKey: `get_students_in_class`,
    queryFn: async () => {
      //* Will remove check when BE implementation changes
      if (params.classArmId) {
        const d = await request.get(
          '/v1/institutions/institutes/all-students-in-class?limit=1000',
          {
            params,
            withCredentials: true,
          }
        );
        return d.data.data.data.data as ClassArmStudents[];
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params.classArmId, refetch]);
  return query;
}
