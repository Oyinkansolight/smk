import request from '@/server';
import { PaginationParams } from '@/types';
import { messages } from '@/types/comms';
import { TrainingDetails } from '@/types/institute';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useSendMessage() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'create-message',
    mutationFn: (params: any) =>
      request.post('/v1/government/message/create_message', params, {
        withCredentials: true,
      }),
    onSettled: () => {
      client.refetchQueries(`get_sender_messages`);
      client.refetchQueries(`get_receiver_messages`);
    },
  });

  return mutation;
}
export function useReadMessage() {
  const mutation = useMutation({
    mutationKey: 'read-message',
    mutationFn: (params: { id: string }) =>
      request.put(
        `/v1/government/message/mark_as_read?messageId=${params.id}`,
        {
          withCredentials: true,
        }
      ),
  });
  return mutation;
}

export function useGetSenderMessages(params?: Partial<PaginationParams>) {
  const query = useQuery({
    queryKey: `get_sender_messages`,
    queryFn: async () => {
      const d = await request.get(
        '/v1/government/message/get_sender_messages',
        { params }
      );
      // console.log(d.data.data.data);
      return d.data.data.data as any;
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [params?.limit, params?.page, params?.type, refetch]);
  return query;
}
export function useGetReceiverMessages(params?: Partial<PaginationParams>) {
  const query = useQuery({
    queryKey: `get_receiver_messages`,
    queryFn: async () => {
      const d = await request.get(
        '/v1/government/message/get_receiver_messages',
        { params }
      );
      // console.log(d.data.data.data);
      return d.data.data.data as any;
    },
  });
  const { refetch } = query;
  useEffect(() => {
    refetch();
  }, [params?.limit, params?.page, params?.type, refetch]);
  return query;
}
export function useGetSenderUnreadMessages() {
  const query = useQuery({
    queryKey: `get_unread_messages`,
    queryFn: async () => {
      const d = await request.get('/v1/government/message/get_unread_messages');
      // console.log(d.data.data.data);
      return d.data.data.data.data as messages[];
    },
  });
  return query;
}
export function useGetReports() {
  const query = useQuery({
    queryKey: `get_report`,
    queryFn: async () => {
      const d = await request.get(
        '/v1/government/report/get-institution-report'
      );
      // console.log(d.data.data.data);
      return d.data?.data as any;
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
      return d.data?.data?.data as any;
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
        return d.data as any;
      }
    },
  });
  return query;
}
export function useGetSingleSurveyQuestion(id: string) {
  const query = useQuery({
    queryKey: `get_single_survey_question`,
    queryFn: async () => {
      if (id) {
        const d = await request.get(
          '/v1/survey_question?limit=1000&surveyId=' + id
        );
        return d.data?.data?.data as any;
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
export function useCreateSurveySubmission() {
  const mutation = useMutation({
    mutationKey: 'create-survey_submission',
    mutationFn: (params: any) =>
      request.post('/v1/survey_submission', params, {
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
