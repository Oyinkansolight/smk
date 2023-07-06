import request from '@/server';
import { useMutation } from 'react-query';

interface CreateRubricParams {
  institutionType: string;
  rubrics: {
    label: string;
    remark: string;
    minRange: string;
    maxRange: string;
  }[];
  sessionId: string;
  termId: string;
}

export function useCreateRubric() {
  const mutation = useMutation({
    mutationKey: 'create_rubric',
    mutationFn: (params: CreateRubricParams) =>
      request.post('/v1/institutions/grade/create-rubric', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
