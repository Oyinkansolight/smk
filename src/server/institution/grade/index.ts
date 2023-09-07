import logger from '@/lib/logger';
import request from '@/server';
import { GradeCategory, GradeRubricInterface } from '@/types/institute';
import { PaginatedData } from '@/types/pagination';
import { useEffect } from 'react';
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

export interface GetGradeRubricByInstitutionTypeParams {
  institutionType?: string;
  sessionId?: string;
  termId?: string;
}

export function useGetGradeRubricByInstitutionType(
  params?: GetGradeRubricByInstitutionTypeParams
) {
  const query = useQuery({
    queryKey: `get_grade_rubric_by_institution_type_${params?.institutionType}`,
    queryFn: async () => {
      if (params?.institutionType) {
        try {
          const d = await request.get(
            '/v1/institutions/grade/get-rubric-by-institution-type',
            {
              params,
            }
          );

          const data = d.data.data.data.data as GradeRubricInterface[];
          const reversedData: GradeRubricInterface[] = [];

          for (let index = data?.length - 1; index >= 0; index--) {
            reversedData.push(data[index]);
          }

          return reversedData as GradeRubricInterface[];
        } catch (error) {
          logger(error);
          throw error;
        }
      }
    },
  });
  return query;
}

export interface GetCategoryByInstitutionTypeParams {
  institutionType?: string;
  sessionId?: string;
  termId?: string;
  institutionId?: string;
}

export function useGetCategoryByInstitutionType(
  params?: GetCategoryByInstitutionTypeParams
) {
  const query = useQuery({
    queryKey: `get_category_by_institution_type_${params?.institutionType}`,
    queryFn: async () => {
      if (params?.institutionType && params?.termId) {
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

  const { refetch } = query;
  useEffect(() => {
    if (params?.termId) {
      refetch();
    }
  }, [params?.termId, refetch]);

  return query;
}

export interface CreateCategory {
  institutionType?: string;
  gradeCategory?: GradeCategory[];
  sessionId?: string;
  termId?: string;
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
