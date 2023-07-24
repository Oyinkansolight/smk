import request from '@/server';
import { Term } from '@/types/classes-and-subjects';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export function useGetSessionTerms(params: { sessionId?: number }) {
  const query = useQuery({
    queryKey: `get_session_terms_${params.sessionId ?? ''}`,
    queryFn: async () => {
      if (params.sessionId) {
        const d = await request.get('/v1/government/terms/session-terms', {
          params,
        });
        return d.data.data.data as PaginatedData<Term>;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    if (params.sessionId) {
      refetch();
    }
  }, [params.sessionId, refetch]);

  return query;
}
