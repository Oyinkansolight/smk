import request from '@/server';
import { PaginationParams } from '@/types';
import { InstituteClass } from '@/types/institute';
import { useQuery } from 'react-query';

export function useGetInstituteClass(
  // subjectId: string,
  params: PaginationParams | undefined = { limit: 1, page: 1 }
) {
  const query = useQuery({
    queryKey: 'get_subject_list_gov',
    queryFn: async () => {
      const d = await request.get('/v1/institutions/institutes/get-classes', {
        params,
      });
      return d.data.data.data.data as InstituteClass[];
    },
  });
  return query;
}
