import logger from '@/lib/logger';
import request from '@/server';
import { GradeCategory } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface CreateRubricParams {
  institutionType: string;
  rubrics: {
    label: string;
    remark: string;
    minRange: number;
    maxRange: number;
  }[];
  sessionId?: string;
  termId?: string;
}

export function useCreateRubric() {
  const mutation = useMutation({
    mutationKey: 'create_rubric',
    mutationFn: (params: CreateRubricParams) =>
      request.post('/v1/institutions/grade/create-rubric', params, {
        withCredentials: true,
      }),
  });
  return mutation;
}

export interface GetCategoryByInstitutionTypeParams {
  institutionType?: string;
  sessionId?: string;
  termId?: string;
}

export function useGetCategoryByInstitutionType(
  params?: GetCategoryByInstitutionTypeParams
) {
  const query = useQuery({
    queryKey: `get_category_by_institution_type_${params?.institutionType}`,
    queryFn: async () => {
      if (params?.institutionType) {
        try {
          const d = await request.get(
            '/v1/institutions/grade/get-category-by-institution-type',
            {
              params,
            }
          );
          return d.data.data.data as PaginatedData<GradeCategory>;
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });
  return query;
}

export interface CreateCategory {
  institutionType?: string;
  gradeCategory?: GradeCategory[];
  sessionId?: number;
  termId?: number;
}

export function useCreateCategory() {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: 'create_category',
    mutationFn: async (params: CreateCategory) => {
      await request.post('/v1/institutions/grade/create-category', params, {
        withCredentials: true,
      });
      return params.institutionType;
    },

    onSettled: async (institutionType) => {
      client.refetchQueries(
        `get_category_by_institution_type_${institutionType}`
      );
    },
  });
  return mutation;
}
