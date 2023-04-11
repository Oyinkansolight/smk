import { useQuery } from 'react-query';

import { Label } from '@/types';

export function useGetLocalGovernments() {
  const query = useQuery({
    queryKey: 'get_local_governments',
    queryFn: async () => [
      { value: 1, label: 'Etsako West' },
      { value: 2, label: 'Etsako West' },
    ],
  });
  return query;
}

export function useGetTowns() {
  const query = useQuery({
    queryKey: 'get_local_towns',
    queryFn: async () => [
      { value: 1, label: 'Etsako West' },
      { value: 2, label: 'Etsako West' },
    ],
  });
  return query;
}

export function useGetPermissions() {
  const query = useQuery({
    queryKey: 'get_all_permissions',
    queryFn: async () => [
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
      { id: 'blue', value: 'Can do stuff' } as Label,
    ],
  });
  return query;
}
