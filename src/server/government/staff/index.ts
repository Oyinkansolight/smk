import request from '@/server';
import { PaginationParams } from '@/types';
import { Staff, TrainingDetails } from '@/types/institute';
import { StaffPaginatedData } from '@/types/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetStaffList(params: PaginationParams) {
  const query = useQuery({
    queryKey: `get_staff_list_${params.id ?? ''}`,
    queryFn: async () => {
      const d = await request.get('/v1/government/teachers/get-staffs', {
        params,
        withCredentials: true,
      });
      // console.log(d.data.data.data);
      return d.data.data.data as StaffPaginatedData<Staff>;
    },
  });
  return query;
}
export function useGetStaffs() {
  const query = useQuery({
    queryKey: `get_staffs`,
    queryFn: async () => {
      const d = await request.get('/v1/government/teachers/get-staffs', {
        withCredentials: true,
      });
      // console.log(d.data.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return d.data.data.data.data as any;
    },
  });
  return query;
}

export interface UpdateStaffParams {
  id?: string;
  dob?: string;
  lga?: string;
  email?: string;
  weight?: string;
  gender?: string;
  address?: string;
  lastName?: string;
  nextOfKin?: string;
  firstName?: string;
  profileImg?: string;
  phoneNumber?: string;
  employerName?: string;
  employerAddress?: string;
  phoneOfNextOfKin?: string;
  addressOfNextOfKin?: string;
  employerPhoneNumber?: string;
  relationshipToNextOfKin?: string;
  employmentDetails?: {
    jobTitle?: string;
    datePosted?: string;
    schoolName?: string;
    retirementDate?: string;
    salaryGradeLevel?: string;
    highestQualification?: string;
    DateOfFirstAppointment?: string;
  };
  trainingDetails?: TrainingDetails[];
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
