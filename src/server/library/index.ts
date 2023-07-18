/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@/lib/logger';
import request from '@/server';
import { UserFile, UserFolder } from '@/types/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface UploadFileParams {
  filename?: string;
  fileUrl?: string;
  userTypes?: string[];
  subjects?: string[];
  createdBy?: string | number;
}

export interface UpdateFileSubjectParams {
  fileId?: number;
  classes?: string;
  subjectId: number[];
  schoolType?: string;
}

export interface NewFolderParams {
  folderName: string;
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

export function useGetAllFiles(type?: string) {
  const sectionType = type ?? '';

  const query = useQuery({
    queryKey: 'get_all_files',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/government/library/get-all-files');
        if (sectionType) {
          const result = d.data.data.data.data.filter((item: any) =>
            item.userTypes.includes(sectionType)
          );
          return result as UserFile[];
        } else {
          return d.data.data.data.data as UserFile[];
        }
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  return query;
}

export function useGetFileById(id?: number) {
  const query = useQuery({
    queryKey: `get_file_${id}`,
    queryFn: async () => {
      try {
        if (id) {
          const d = await request.get('/v1/government/library/get-file', {
            params: { id },
          });
          return d.data.data as UserFile;
        }
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  return query;
}

export function useGetAllFolders() {
  const query = useQuery({
    queryKey: 'get_all_folders',
    queryFn: async () => {
      try {
        const d = await request.get('/v1/government/library/get-folders');
        return d.data.data.data as UserFolder[];
      } catch (error) {
        logger(error);
        throw error;
      }
    },
  });

  return query;
}

export function useAssignSubjectsToFile() {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'update-subjects',
    mutationFn: async (params: UpdateFileSubjectParams) => {
      return await request.post(
        '/v1/government/library/assign-to-subject',
        params
      );
    },
    onSettled: () => {
      client.refetchQueries('get_all_files');
    },
  });
  return mutation;
}

export function useCreateFolder(name: string) {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: 'create-folder',
    mutationFn: async () => {
      return await request.post('/v1/government/library/create-folder', {
        folderName: name,
      });
    },
    onSettled: () => {
      client.refetchQueries('get_all_files');
    },
  });
  return mutation;
}