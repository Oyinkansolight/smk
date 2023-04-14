import { request } from '@/server';
import { useMutation } from 'react-query';

export interface CreateInstitutionParams {
  firstName?: string;
  lastName?: string;
  profileURL?: string;
  email?: string;
  townId?: number;
  localGovernmentId?: number;
  roleId?: number;
  permissions?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  typeId?: number;
  lat?: string;
  long?: string;
}

export function useCreateInstitution() {
  const mutation = useMutation({
    mutationKey: 'create_institution',
    mutationFn: (params: CreateInstitutionParams) =>
      request.post('/institution/register-institution', params),
  });
  return mutation;
}
