/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { UserProfile } from '@/types/auth';
import { useMutation, useQuery } from 'react-query';

export interface SignUpParams {
  email: string;
  phoneNumber?: string;
  password: string;
  username?: string;
  fullName: string;
}
export interface ResetParams {
  password: string;
  token: string | null;
}

export type SignInParams = Omit<SignUpParams, 'fullName'>;

export function useSignUp() {
  const mutation = useMutation({
    mutationKey: 'sign_up',
    mutationFn: (params: SignUpParams) => request.post('/signup', params),
  });
  return mutation;
}

export function useSignIn() {
  const mutation = useMutation({
    mutationKey: 'sign_in',

    mutationFn: (params: SignInParams) =>
      request.post('/v1/authentication/login', params),
    onSuccess: (response) => {
      sessionStorage.setItem('TOKEN_KEY', response.data.data.data.token);
    },
  });
  return mutation;
}
export function useForgotPassword() {
  const mutation = useMutation({
    mutationKey: 'forgot_password',

    mutationFn: (params: SignInParams) =>
      request.post('/v1/authentication/forgot-password', params),
  });
  return mutation;
}
export function useResetPassword() {
  const mutation = useMutation({
    mutationKey: 'reset_password',

    mutationFn: (params: ResetParams) =>
      request.post('/v1/authentication/reset-password', params),
  });
  return mutation;
}

// export function useResetPassword() {
//   const mutation = useMutation({
//     mutationKey: 'reset_password',
//     mutationFn: (params: SignInParams) =>
//       request.post('/auth/reset-password', params),
//   });
//   return mutation;
// }

export function useGetProfile() {
  const query = useQuery({
    queryKey: 'get_profile',
    queryFn: async () => {
      const response = (await request.get('/v1/authentication/profile')).data
        .data.data as UserProfile;
      localStorage.setItem(
        'institutionId',
        `${response.userInfo?.esiAdmin?.id}`
      );
      localStorage.setItem(
        'currentSessionId',
        `${response.currentSession?.id}`
      );
      return response;
    },
    refetchOnMount: false,
  });
  return query;
}
export function useGetCurrentSession() {
  const query = useQuery({
    queryKey: 'get_current_session',
    queryFn: async () => {
      const response = (await request.get('/v1/authentication/profile')).data
        .data.data.currentSession as any;
      return response;
    },
  });
  return query;
}