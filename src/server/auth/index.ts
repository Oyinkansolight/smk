/* eslint-disable @typescript-eslint/no-explicit-any */
import { isLocal } from '@/constant/env';
import { requestForToken } from '@/firebase/messaging';
import { setStorageValueWithExpiry } from '@/lib/helper';
import request from '@/server';
import { UserProfile } from '@/types/auth';
import { useMutation, useQuery } from 'react-query';

export interface SignUpParams {
  email: string;
  phoneNumber?: string;
  password: string;
  username?: string;
  fullName: string;
  loginHash?: string;
  rememberMe?: boolean;
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
  let rememberMe;
  const mutation = useMutation({
    mutationKey: 'sign_in',

    mutationFn: (params: SignInParams) => {
      rememberMe = params.rememberMe;
      if (isLocal) {
        params.loginHash =
          'd34715a258ed084b1c8a42c6ccf34a9d5f5bafd1aeed2e8c875dbb2b04eeefab';
      }

      const body = {
        email: params.email,
        password: params.password,
      };

      if (params.loginHash) {
        body['loginHash'] = params.loginHash;
      }

      return request.post('/v1/authentication/login', body);
    },
    onSuccess: (response) => {
      sessionStorage.setItem('TOKEN_KEY', response.data.data.data.token);
      //* Expires in 7 days
      if (rememberMe) {
        setStorageValueWithExpiry(
          'local',
          'TOKEN_KEY',
          response.data.data.data.token,
          1000 * 60 * 60 * 24 * 7
        );
      }
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
      const response = (
        await request.get('/v1/authentication/profile', {
          withCredentials: true,
        })
      ).data.data.data as UserProfile;
      localStorage.setItem(
        'institutionId',
        `${response.userInfo?.esiAdmin?.id}`
      );

      localStorage.setItem(
        'currentSessionId',
        `${response.currentSession?.[0]?.id}`
      );
      localStorage.setItem(
        'currentSession',
        `${JSON.stringify(response.currentSession)}`
      );
      sessionStorage.setItem(
        'currentTerm',
        `${JSON.stringify(response.currentTerm)}`
      );
      sessionStorage.setItem(
        'currentWeek',
        `${JSON.stringify(response.currentWeek)}`
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
      const response = (
        await request.get('/v1/authentication/profile', {
          withCredentials: true,
        })
      ).data.data.data.currentSession[0] as any;
      return response;
    },
  });
  return query;
}
export function useUpdateDeviceToken() {
  const mutation = useMutation({
    mutationKey: 'update_device_token',
    mutationFn: async () => {
      const token = await requestForToken()
      if (token) {
        request.put('/v1/utilities/update-device-token', { deviceType: 'WEB', token });
      }
    }
  });
  return mutation;
}

export function useGetValidIMEI() {
  const query = useQuery({
    queryKey: 'get_current_device_imei',
    queryFn: async () => {
      const response = (
        await request.get('/v1/government/admin/is-valid-institution-imei', {
          withCredentials: true,
        })
      ).data as any;
      return response;
    },
  });
  return query;
}
