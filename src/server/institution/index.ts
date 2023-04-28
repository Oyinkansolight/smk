/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { useMutation } from 'react-query';

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
