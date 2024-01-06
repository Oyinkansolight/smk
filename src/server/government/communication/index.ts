import request from '@/server';
import { messages } from '@/types/comms';
import { TrainingDetails } from '@/types/institute';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useSendMessage() {
  const mutation = useMutation({
    mutationKey: 'create-message',
    mutationFn: (params: any) =>
      request.post('/v1/government/message/create_message', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
export function useReadMessage(params) {
  const query = useQuery({
    queryKey: 'read-message',
    queryFn: () =>
      request.post(
        `/v1/government/communication/mark_as_read?messageId=${params.id}`,
        {
          withCredentials: true,
        }
      ),
  });
  return query;
}

export function useGetSenderMessages() {
  const query = useQuery({
    queryKey: `get_sender_messages`,
    queryFn: async () => {
      const d = await request.get('/v1/government/message/get_sender_messages');
      // console.log(d.data.data.data);
      return d.data.data.data.data as messages[];
    },
  });
  return query;
}
export function useGetSurveys() {
  const query = useQuery({
    queryKey: `get_survey`,
    queryFn: async () => {
      const d = await request.get('/v1/survey');
      // console.log(d.data.data.data);
      return d.data.data.data as any;
    },
  });
  return query;
}
export function useGetSingleSurvey(id: string) {
  const query = useQuery({
    queryKey: `get_single_survey`,
    queryFn: async () => {
      if (id) {
        const d = await request.get('/v1/survey/' + id);
        // console.log(d.data.data.data);
        return d.data.data.data as any;
      }
    },
  });
  return query;
}
export function useCreateSurvey() {
  const mutation = useMutation({
    mutationKey: 'create-survey',
    mutationFn: (params: any) =>
      request.post('/v1/survey', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}
export function useGetStaffs() {
  const client = useQueryClient();

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
    onSettled: () => {
      client.refetchQueries(`get_survey`);
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
