/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { useQuery } from 'react-query';

export function useGetAdminList() {
  const query = useQuery({
    queryKey: 'get_admin_list',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/government/admin/all');
        return d.data.data.data;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });
  return query;
}
