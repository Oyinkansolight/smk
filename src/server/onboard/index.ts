/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { InviteAdminParams, Label, LocalGovernmentArea } from '@/types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetLocalGovernments() {
  const query = useQuery({
    queryKey: 'get_local_governments',
    queryFn: async () =>
      (
        await request.get(
          `/v1/government/admin/get-local-government-area?limit=20`
        )
      ).data.data.data.localGovernmentArea as LocalGovernmentArea[],
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
      (
        await request.get(
          `/v1/government/admin/get-local-government-area?limit=20`
        )
      ).data.data.localGovernmentArea[id] as any,
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

export function useGetAdminRoles() {
  const query = useQuery({
    queryKey: 'get_all_admin_roles',
    queryFn: async () =>
      (await request.get(`/v1/government/roles/find-role`)).data.data.data
        .roles,
  });

  return query;
}

export function useInviteAdmin() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'invite_admin',
    mutationFn: (params: InviteAdminParams) =>
      request.post('/v1/government/admin/invite-admin', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries('get_admin_list');
    },
  });
  return mutation;
}
