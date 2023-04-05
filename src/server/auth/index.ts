import { useMutation } from 'react-query';

import { request } from '@/server';

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

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
    mutationFn: (params: Omit<SignUpParams, 'fullName'>) =>
      request.post('/signin', params),
  });
  return mutation;
}
