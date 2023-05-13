/* eslint-disable @typescript-eslint/no-explicit-any */
import request from '@/server';
import { useMutation, useQuery } from 'react-query';

export interface UploadFileParams {
  filename?: string;
  fileUrl?: string;
  userTypes?: string[];
  subjects?: string[];
  createdBy?: string;
}

export function useUploadFile() {
  const mutation = useMutation({
    mutationKey: 'upload-file',
    mutationFn: async (params: UploadFileParams) => {
      return await request.post('/v1/government/library/upload-file', params);
    },
  });
  return mutation;
}

export function useGetAllFiles() {
  const query = useQuery({
    queryKey: 'get_all_files',
    queryFn: () =>
      request
        .get('/v1/government/library/get-all-files')
        .then((v) => v.data.data as any),
  });
  return query;
}
