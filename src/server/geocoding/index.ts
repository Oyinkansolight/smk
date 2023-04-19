import { geocodingInstance } from '@/server';
import { useMutation } from 'react-query';

export interface GeocodingParams {
  params: {
    address: string;
  };
}

export function useGeocoding() {
  const mutation = useMutation({
    mutationKey: 'geocoding',
    mutationFn: (params: GeocodingParams) =>
      geocodingInstance.get('', { params }),
  });

  return mutation;
}
