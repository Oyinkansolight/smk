/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export function useGetAdminList(page: number) {
  const query = useQuery({
    queryKey: 'get_admin_list',
    queryFn: async () => {
      try {
        const d = await request.get(`/v1/government/admin/all?page=${page}`);
        return d.data.data.data as PaginatedData<any>;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  const { refetch } = query;

  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [page, refetch]);

  return query;
}
