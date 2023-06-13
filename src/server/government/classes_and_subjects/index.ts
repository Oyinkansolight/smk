import request from '@/server';
import { Subject } from '@/types/institute';
import { useQuery } from 'react-query';

export function useGetGovernmentSubjectList() {
  const query = useQuery({
    queryKey: 'get_subject_list_gov',
    queryFn: async () => {
      const d = await request.get(
        '/v1/government/classes-subjects/get-subjects?limit=100'
      );
      return d.data.data.data.data as Subject[];
    },
  });
  return query;
}

export function useGetGovernmentSubjectById(id?: string) {
  const query = useQuery({
    queryKey: ['get_subject_list_by_id', id],
    queryFn: async () => {
      if (id) {
        const d = await request.get(
          '/v1/government/classes-subjects/get-subjects',
          { params: { id } }
        );
        return d.data.data.data.data as Subject[];
      }
    },
  });
  return query;
}
