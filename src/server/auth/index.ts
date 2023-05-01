import request from '@/server';
import { useMutation } from 'react-query';


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
      request.post('/v1/government/authentication/login', params),
    onSuccess: (response) => {
      localStorage.setItem('TOKEN_KEY', response.data.data.token);
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