import { useMutation } from 'react-query';

import { request } from '@/server';

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
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
    mutationFn: (params: SignInParams) => request.post('/signin', params),
  });
  return mutation;
}
