import request from '@/server';
import { PaginationParams } from '@/types';
import { Staff } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetStaffList(params: PaginationParams) {
  const query = useQuery({
    queryKey: `get_staff_list_${params.id ?? ''}`,
    queryFn: async () => {
      const d = await request.get('/v1/government/teachers/get-staffs', {
        params,
      });
      // console.log(d.data.data.data);
      return d.data.data.data as PaginatedData<Staff>;
    },
  });
  return query;
}
export function useGetStaffs() {
  const query = useQuery({
    queryKey: `get_staffs`,
    queryFn: async () => {
      const d = await request.get('/v1/government/teachers/get-staffs');
      // console.log(d.data.data.data);
      return d.data.data.data.data as unknown;
    },
  });
  return query;
}

export interface UpdateStaffParams {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  employerName?: string;
  employerPhoneNumber?: string;
  employerAddress?: string;
  weight?: string;
}

export function useUpdateStaff() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'update_staff',
    mutationFn: async (params: UpdateStaffParams) =>
      (
        await request.post('/v1/government/teachers/update-staff', params, {
          withCredentials: true,
        })
      ).data.data.data,
    onSettled: (data) => {
      // console.log('Staff Id: ', data?.id);
      client.refetchQueries(`get_staff_list_${data?.id ?? ''}`);
    },
  });
  return mutation;
}
