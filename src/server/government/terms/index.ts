import request from '@/server';
import { Term } from '@/types/classes-and-subjects';
import { PaginatedData } from '@/types/pagination';
import { useQuery } from 'react-query';

export function useGetSessionTerms(params: { sessionId?: number }) {
  const query = useQuery({
    queryKey: `get_session_terms_${params.sessionId ?? ''}`,
    queryFn: async () => {
      const d = await request.get('/v1/government/terms/session-terms', {
        params,
      });

      return d.data.data.data as PaginatedData<Term>;
    },
  });
  return query;
}
