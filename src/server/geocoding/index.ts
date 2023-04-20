import { geocodingInstance } from '@/server';
import { GeoCodeResponse } from '@/types/geocode';
import { useMutation } from 'react-query';

export interface GeocodingParams {
  address: string;
}

export function useGeocoding() {
  const mutation = useMutation({
    mutationKey: 'geocoding',
    mutationFn: async (params: GeocodingParams) =>
      (await geocodingInstance.get('', { params })).data
        .results as GeoCodeResponse[],
  });

  return mutation;
}