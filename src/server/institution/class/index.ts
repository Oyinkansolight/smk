/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { PaginationParams } from '@/types';
import { Class } from '@/types/classes-and-subjects';
import { InstituteClass } from '@/types/institute';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export function useGetInstituteClass(
  // subjectId: string,
  params: PaginationParams | undefined = { limit: 10000000, page: 1 }
) {
  const query = useQuery({
    queryKey: 'get_subject_list_gov',
    queryFn: async () => {
      const d = await request.get('/v1/institutions/institutes/get-classes', {
        params,
      });
      return d.data.data.data.data as InstituteClass[];
    },
  });
  return query;
}
export function useGetInstituteClassArms(
  instituteId?: string,
  currentSessionId?: string,
  enabled?: boolean
) {
  if (enabled !== false) enabled = true;

  const query = useQuery({
    enabled,
    queryKey: 'get_institute_class_arm',
    queryFn: async () => {
      if (instituteId || currentSessionId) {
        const d = await request.get(
          `/v1/institutions/class-arm/get-institution-class-arm?institutionId=${instituteId}&sessionId=${currentSessionId}`
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d.data.data.data as any;
      }
    },
  });

  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [instituteId, currentSessionId, refetch]);
  return query;
}

export function useGetClassArmInfo(classArmId: string | null | undefined) {
  const query = useQuery({
    queryKey: 'get_class_arm_in_a_institution',
    queryFn: async () => {
      if (!classArmId) return;
      try {
        const d = await request.get(
          `/v1/institutions/class-arm/class-arm-by-id?classArmId=${classArmId}`
        );
        return d.data.data.data as any;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [classArmId, refetch]);
  return query;
}

export function useGetInstituteSessionClassArms(
  currentSessionId: number | undefined
) {
  // subjectId: string,

  const query = useQuery({
    queryKey: 'get_institute_class_arm',
    queryFn: async () => {
      const d = await request.get(
        `/v1/institutions/class-arm/get-session-class-arm?sessionId=${currentSessionId}`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return d.data.data.data as any;
    },
  });
  return query;
}
export function useGetAllClasses() {
  const query = useQuery({
    queryKey: 'all_classes',
    queryFn: async () => {
      const d = await request.get(`/v1/utilities/all_classes`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return d.data.data.data as Class[];
    },
  });
  return query;
}
