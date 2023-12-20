/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { AddRoleParams, AllPermissionsParams } from '@/types';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

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

export function useGetPermissionList(params: AllPermissionsParams) {
  const query = useQuery({
    queryKey: 'get_permission_list',
    queryFn: async () => {
      try {
        const d = await request.get(
          `/v1/government/permissions/find-permission?${
            params.page ? `page=${params.page}` : ''
          }${params.id ? `&id=${params.id}` : ''}${
            params.query ? `&query=${params.query}` : ''
          }${params.limit ? `&limit=${params.limit}` : ''}`
        );
        return d.data.data as PaginatedData<any>;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  const { refetch } = query;

  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [params?.page, params?.id, params?.query, params?.limit, refetch]);

  return query;
}

export function useCreateNewRole() {
  const mutation = useMutation({
    mutationKey: 'create_new_role',
    mutationFn: async (body: AddRoleParams) => {
      try {
        const d = await request.post(`/v1/government/roles/create-role`, body);
        return d.data.data;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  return mutation;
}

export function useGetRoles() {
  const query = useQuery({
    queryKey: 'get_roles',
    queryFn: async () => {
      try {
        const d = await request.get(`/v1/government/roles/find-role`);
        return d.data.data.data;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  return query;
}

export function useGetRoleById(id?: string) {
  const query = useQuery({
    queryKey: 'get_role_by_id',
    queryFn: async () => {
      if (!id) return;
      try {
        const d = await request.get(`/v1/government/roles/find-role?id=${id}`);
        return d.data.data.data;
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  const { refetch } = query;

  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [id, refetch]);

  return query;
}
