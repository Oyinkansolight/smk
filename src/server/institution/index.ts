/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { Subject } from '@/types/institute';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface CreateInstitutionParams {
  instituteName?: string;
  instituteEmail?: string;
  instituteLogo?: string;
  instituteAddress?: string;
  instituteLat?: string;
  instituteLong?: string;
  instituteType?: number;
  town?: number;
  email?: string;
  password?: string;
  role?: number;
  id?: number;
}

export interface CreateSubjectParams {
  name?: string;
  classId?: number[];
}

export function useCreateInstitution() {
  const mutation = useMutation({
    mutationKey: 'create_institution',
    mutationFn: (params: CreateInstitutionParams) =>
      request.post('/v1/government/institutes/add-institute', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export function useInviteInstitution() {
  const mutation = useMutation({
    mutationKey: 'invite_institution',
    mutationFn: (params: CreateInstitutionParams) =>
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
        await request.post('/v1/government/institutes/add-subject', params)
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
          '/v1/government/institutes/get-subject-list'
        );
        return d.data.data.data as Subject[];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}

export function useGetSubjectById(id: string) {
  const query = useQuery({
    queryKey: ['get_subject_list_by_id', id],
    queryFn: async () => {
      try {
        const d = await request.get(
          '/v1/government/institutes/get-subject-list',
          { params: { id } }
        );
        return d.data.data.data as Subject[];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}