import request from '@/server';
import { Term } from '@/types/classes-and-subjects';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

type schoolType = {
  name: string | number;
  description: string | number;
  semester: string | number;
};
export function useGetSessionTerms(params: { sessionId?: string }) {
  const query = useQuery({
    refetchOnWindowFocus: false,
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
      refetch({ cancelRefetch: true });
    }
  }, [params.sessionId, refetch]);

  return query;
}

export function useGetCurrentSessionTerm(params: { sessionId?: string }) {
  const query = useQuery({
    queryKey: `get_current_session_term_${params.sessionId ?? ''}`,
    queryFn: async () => {
      if (params.sessionId) {
        const d = await request.get(
          '/v1/government/terms/current-session-term',
          {
            params,
          }
        );
        return d.data.data.data as Term;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    if (params.sessionId) {
      refetch({ cancelRefetch: true });
    }
  }, [params.sessionId, refetch]);

  return query;
}

export function useCreateSchoolType() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'update_user',
    mutationFn: async (params: schoolType) =>
      (
        await request.post(
          '/v1/government/institutes/add-institute-type',
          params,
          {
            withCredentials: true,
          }
        )
      ).data.data,
    // onSettled: (data) => {

    //   client.refetchQueries(`get_staff_list_${data?.id ?? ''}`);
    // },
  });
  return mutation;
}

export function useGetSchoolType(params: { sessionId?: string }) {
  const query = useQuery({
    queryKey: `get_current_session_term_${params.sessionId ?? ''}`,
    queryFn: async () => {
      if (params.sessionId) {
        const d = await request.get(
          '/v1/government/terms/current-session-term',
          {
            params,
          }
        );
        return d.data.data.data as Term;
      }
    },
  });
  const { refetch } = query;
  useEffect(() => {
    if (params.sessionId) {
      refetch({ cancelRefetch: true });
    }
  }, [params.sessionId, refetch]);

  return query;
}

// /v1/government/institutes/add-institute-type
