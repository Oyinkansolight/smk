import request from '@/server';
import { useMutation, useQuery } from 'react-query';

export interface SignUpParams {
  email: string;
  phoneNumber?: string;
  password: string;
  username?: string;
  fullName: string;
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
    // mutationFn: (params: SignInParams) =>
    //   request.post('/v1/government/authentication/login', {
    //     email: 'John.Mathew@xyz.com',
    //     password: 'John@Mathew',
    //   }),
    mutationFn: (params: SignInParams) =>
      request.post('/v1/authentication/login', params),
    onSuccess: (response) => {
      sessionStorage.setItem('TOKEN_KEY', response.data.data.data.token);
    },
  });
  return mutation;
}

export function useResetPassword() {
  const mutation = useMutation({
    mutationKey: 'reset_password',
    mutationFn: (params: SignInParams) =>
      request.post('/auth/reset-password', params),
  });
  return mutation;
}

export interface UserProfile {
  id?: number;
  firstName?: null;
  lastName?: null;
  deviceToken?: null;
  phoneNumber?: null;
  email?: string;
  address?: null;
  type?: string;
  suspended?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  staff?: {
    id: number;
    gender: string;
    dob: string;
    height: string;
    weight: string;
    isTeaching: string;
    staffType: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function useGetProfile() {
  const mutation = useQuery({
    queryKey: 'reset_password',
    queryFn: async () =>
      (await request.get('/v1/authentication/profile')).data.data.data
        .userInfo as UserProfile,
  });
  return mutation;
}
