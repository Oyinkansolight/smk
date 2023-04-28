/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { Label } from '@/types';
import { useQuery } from 'react-query';

export function useGetLocalGovernments() {
  const query = useQuery({
    queryKey: 'get_local_governments',
    queryFn: async () =>
      (await request.get(`/v1/government/admin/get-local-government-area`)).data
        .data.localGovernmentArea as [],
  });

  query.data?.forEach((item: any) => {
    item.value = item.id;
    item.label = item.name;

    item.towns.forEach((town: any) => {
      town.value = town.id;
      town.label = town.name;
    });
  });

  return query;
}

export function useGetTowns(id: number) {
  const query = useQuery({
    queryKey: 'get_local_towns',
    queryFn: async () =>
      (await request.get(`/v1/government/admin/get-local-government-area`)).data
        .data.localGovernmentArea[id] as any,
  });

  query?.data.forEach((town: any) => {
    town.value = town.id;
    town.label = town.name;
  });

  return query;
}

export function useGetPermissions() {
  const query = useQuery({
    queryKey: 'get_all_permissions',
    queryFn: async () => [
      { id: 'blue', value: 'Create Admin' } as Label,
      { id: 'blue', value: 'View Admin' } as Label,
      { id: 'blue', value: 'Manage Institution' } as Label,
    ],
  });
  return query;
}
